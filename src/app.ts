import express from "express";
import { env } from "./utils/envalid/env";
import { userRouter } from "./routes/user.route";
import { connectDb } from "./utils/db-connect/db.connect";
import { eventConsumer } from "./utils/rabbitmq/user.rabbitmq";
import cors from "cors";

const app = express();
connectDb();

app.use(express.json());
app.use(cors());
app.use("/api/v1/users", userRouter);

// Queue Listener
eventConsumer(env.QUEUE_NEW_REPLY);

app.listen(env.PORT, () => {
  console.log(`App listening on port ${env.PORT}`);
});
