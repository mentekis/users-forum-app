import { cleanEnv, str, testOnly } from "envalid";

export const env = cleanEnv(process.env, {
  PORT: str({ devDefault: testOnly("3001") }),
  MONGO_URI: str({ devDefault: testOnly("http://mongodb") }),
  MONGO_INITDB_ROOT_USERNAME: str({ devDefault: testOnly("myusername") }),
  MONGO_INITDB_ROOT_PASSWORD: str({ devDefault: testOnly("mypass") }),
  JWT_ACCESS_KEY: str({ devDefault: testOnly("myaccesskey") }),
  JWT_REFRESH_KEY: str({ devDefault: testOnly("myrefreshkey") }),
  RABBITMQ_URI: str({ devDefault: testOnly("http://rabbitmq") }),
  QUEUE_NEW_USER: str({ devDefault: testOnly("newUser") }),
  QUEUE_GET_USER: str({ devDefault: testOnly("getUser") }),
});
