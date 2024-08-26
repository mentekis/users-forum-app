import amqplib from "amqplib";
import { env } from "../envalid/env";

// Connection
async function rabbitConnect(queue: string) {
  try {
    const connect = await amqplib.connect(env.RABBITMQ_URI);
    const channel = await connect.createChannel();
    await channel.assertQueue(queue, { durable: true });
    return channel;
  } catch (error) {
    console.log("RabbitMQ [connection] error:", error);
    throw error;
  }
}

// Producer
// 1. in handleCreateUser Controller
async function newUserCreated(name: string, email: string) {
  try {
    const channel = await rabbitConnect(env.QUEUE_NEW_USER);
    channel.sendToQueue(
      env.QUEUE_NEW_USER,
      Buffer.from(JSON.stringify({ name, email })),
    );
    console.log("New user sent to RabbitMQ: ", JSON.stringify({ name, email }));
  } catch (error) {
    console.log("newUserCreated RabbitMQ error:", error);
    // handle error, retry or dead-letter
  }
}

// 2. in handleGetUser Controller
async function sendUserData(id: string) {
  const channel = await rabbitConnect(env.QUEUE_GET_USER);
  channel.sendToQueue(env.QUEUE_GET_USER as string, Buffer.from(id));
}

// Consumer
async function newDataSuggestion(queue: string, title: string) {
  try {
    const channel = await rabbitConnect(queue);
    await channel.consume(
      queue,
      (msg) => {
        if (msg !== null) {
          console.log(`New ${title} received: ${msg.content.toString()}`);
          channel.ack(msg);
        }
      },
      { noAck: false },
    );
  } catch (error) {
    console.log("newSuggestion RabbitMQ error:", error);
  }
}

export { rabbitConnect, newUserCreated, sendUserData, newDataSuggestion };
