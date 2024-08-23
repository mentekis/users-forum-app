import express from "express";
import UserController from "../controllers/user.controller";
import AuthController from "../controllers/auth.controller";
import { middlewareCheckOrigin } from "../middleware/middleware.check-origin";

export const userRouter = express.Router();
userRouter.use(middlewareCheckOrigin);

userRouter.get("/", UserController.handleGetAllUsers);
userRouter.post("/", AuthController.handleRegister);
userRouter.post("/login", AuthController.handleLogin);
userRouter.post("/logout", AuthController.handleLogout);
userRouter.patch("/:id", UserController.handleUpdateUser);
userRouter.delete("/:id", UserController.handleDeleteUser);
