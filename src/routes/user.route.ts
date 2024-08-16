import express from "express";
import UserController from "../controllers/user.controller";
import { middlewareCheckOrigin } from "../middleware/middleware.check-origin";

export const userRouter = express.Router();
userRouter.use(middlewareCheckOrigin);

userRouter.get("/", UserController.handleGetAllUsers);
userRouter.post("/", UserController.handleCreateUser);
userRouter.patch("/:id", UserController.handleUpdateUser);
userRouter.delete("/:id", UserController.handleDeleteUser);
