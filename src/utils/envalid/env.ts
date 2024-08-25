import { cleanEnv, str } from "envalid";

export const env = cleanEnv(process.env, {
  PORT: str(),
  MONGO_URI: str(),
  MONGO_INITDB_ROOT_USERNAME: str(),
  MONGO_INITDB_ROOT_PASSWORD: str(),
  JWT_ACCESS_KEY: str(),
  JWT_REFRESH_KEY: str(),
  RABBITMQ_URI: str(),
  QUEUE_NEW_USER: str(),
  QUEUE_GET_USER: str(),
});
