print("Starting...");

db_prod = db.getSiblingDB("users_prod");
db_prod.createUser({
  user: "forum_users",
  pwd: "forumAppUsers001",
  roles: [{ role: "readWrite", db: "users_prod" }],
});

db_dev = db.getSiblingDB("users_dev");
db_dev.createUser({
  user: "forum_users",
  pwd: "forumAppUsers001",
  roles: [{ role: "readWrite", db: "users_dev" }],
});

print("Finished...");
