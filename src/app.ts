import express from "express";
import { env } from "./utils/envalid/env";
import { userRouter } from "./routes/user.route";
import { connectDb } from "./utils/db-connect/db.connect";
import { newDataSuggestion } from "./utils/rabbitmq/user.rabbitmq";
import cors from "cors";

const app = express();
connectDb();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173/" }));
app.use("/api/v1/users", userRouter);

// Queue Listener
newDataSuggestion(env.QUEUE_NEW_USER, "User");
newDataSuggestion(env.QUEUE_NEW_THREAD, "Thread");
newDataSuggestion(env.QUEUE_NEW_REPLY, "Reply");

app.listen(env.PORT, () => {
  console.log(`App listening on port ${env.PORT}`);
});
