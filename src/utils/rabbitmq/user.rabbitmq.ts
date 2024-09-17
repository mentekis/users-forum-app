import amqplib from "amqplib";
import { env } from "../envalid/env";
import UserService from "../../services/user.service";

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

// Producer handle one event only (updateUser)
async function eventProducer(queue: string, id: string, name: string) {
  const channel = await rabbitConnect(queue);
  channel.sendToQueue(queue, Buffer.from(JSON.stringify({ id, name })), {
    persistent: true,
  });
}

// Consumer handle one event only (newUserNotifData)
// handle 2 event if queue is newUserNotifData
async function eventConsumer(queue: string) {
  try {
    const channel = await rabbitConnect(queue);
    await channel.consume(
      queue,
      async (msg) => {
        if (msg !== null) {
          console.log(`New data received: ${msg.content.toString()}`);
          channel.ack(msg);
          if (queue === env.QUEUE_NEW_REPLY) {
            const { threadId, userId } = JSON.parse(msg.content.toString());
            console.log({ threadId, userId });
            const name = await UserService.getUserById(userId);
            channel.sendToQueue(
              env.QUEUE_ENRICH_USER,
              Buffer.from(JSON.stringify({ userId, name })),
            );
          }
        }
      },
      { noAck: false },
    );
  } catch (error) {
    console.log("newSuggestion RabbitMQ error:", error);
  }
}

export { rabbitConnect, eventProducer, eventConsumer };
