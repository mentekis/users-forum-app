import { cleanEnv, str } from "envalid";

export const env = cleanEnv(process.env, {
  PORT: str(),
  MONGO_URI: str(),
  RABBITMQ_URI: str(),
  QUEUE_NEW_USER: str(),
  QUEUE_GET_USER: str(),
});
