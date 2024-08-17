import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/user.route";
import { connectDb } from "./db-connect/db.connect";

dotenv.config();

const app = express();
connectDb();

app.use(express.json());
app.use("/api/v1/users", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
