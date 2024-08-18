import amqplib from "amqplib";
import dotenv from "dotenv";
import { IUser } from "../../entities/user.entity";

dotenv.config();

const queue = process.env.QUEUE_NEW_USER as string;

// Connection
async function rabbitConnect() {
  const connect = await amqplib.connect(process.env.RABBITMQ_URL as string);
  const channel = await connect.createChannel();
  channel.assertQueue(queue, { durable: true });
  return channel;
}

// Producer
// 1. in createUser service
async function newUserCreated(data: IUser) {
  const channel = await rabbitConnect();
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
}

// 2. in getUser service
async function sendUserData(id: string) {
  const channel = await rabbitConnect();
  channel.sendToQueue(process.env.QUEUE_GET_USER as string, Buffer.from(id));
}

// Consumer
async function newUserSuggestion() {
  const channel = await rabbitConnect();
  await channel.consume(queue, (msg) => {
    if (msg !== null) {
      console.log("Received: ", msg.content.toString());
      channel.ack(msg);
    }
  });
}

export { newUserCreated, sendUserData, newUserSuggestion };
