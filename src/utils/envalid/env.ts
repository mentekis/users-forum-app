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

  // PORT: str({ devDefault: testOnly("3001") }),
  // MONGO_URI: str({
  //   devDefault: testOnly("mongodb://users-db:27017/users_dev"),
  // }),
  // MONGO_INITDB_ROOT_USERNAME: str({ devDefault: testOnly("forum_users") }),
  // MONGO_INITDB_ROOT_PASSWORD: str({ devDefault: testOnly("forumAppUsers001") }),
  // JWT_ACCESS_KEY: str({ devDefault: testOnly("myaccesskey") }),
  // JWT_REFRESH_KEY: str({ devDefault: testOnly("myrefreshkey") }),
  // RABBITMQ_URI: str({ devDefault: testOnly("http://rabbitmq") }),
  // QUEUE_NEW_USER: str({ devDefault: testOnly("newUser") }),
  // QUEUE_GET_USER: str({ devDefault: testOnly("getUser") }),
});
