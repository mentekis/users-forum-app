import express from "express";
import { env } from "./utils/envalid/env";
import { userRouter } from "./routes/user.route";
import { connectDb } from "./utils/db-connect/db.connect";
import { newUserSuggestion } from "./utils/rabbitmq/user.rabbitmq";

const app = express();
connectDb();

app.use(express.json());
app.use("/api/v1/users", userRouter);
newUserSuggestion();

app.listen(env.PORT, () => {
  console.log(`App listening on port ${env.PORT}`);
});
