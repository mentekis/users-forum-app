import { env } from "../src/utils/envalid/env";

print("Starting...");

db_prod = db.getSiblingDB("users_prod");
db_prod.createUser({
  user: env.MONGO_INITDB_ROOT_USERNAME,
  pwd: env.MONGO_INITDB_ROOT_PASSWORD,
  roles: [{ role: "readWrite", db: "users_prod" }],
});

db_dev = db.getSiblingDB("users_dev");
db_dev.createUser({
  user: env.MONGO_INITDB_ROOT_USERNAME,
  pwd: env.MONGO_INITDB_ROOT_PASSWORD,
  roles: [{ role: "readWrite", db: "users_dev" }],
});

print("Finished...");
