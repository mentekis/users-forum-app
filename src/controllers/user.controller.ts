import { Request, Response } from "express";
import UserService from "../services/user.service";
import { eventProducer } from "../utils/rabbitmq/user.rabbitmq";
import { env } from "../utils/envalid/env";

const UserController = {
  // Get all users
  handleGetAllUsers: async (_req: Request, res: Response) => {
    const users = await UserService.getAllUsers();
    return res.status(200).json({ message: "List of Users", data: users });
  },

  handleGetUser: async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await UserService.getUserById(id);
    return res.status(200).json({ message: "User found", data: user });
  },

  // Update a user
  handleUpdateUser: async (req: Request, res: Response) => {
    const userId = req.params.id;
    const userHeader = req.headers.authorization;
    const { name, email, password } = req.body;

    // Check authorization
    if (!userHeader) {
      return res.status(401).json({ message: "Unauthorized. Invalid token" });
    }
    await UserService.updateUser(userId, { name, email, password });

    // sendToQueue
    eventProducer(env.QUEUE_UPDATE_USER, userId, name);

    return res
      .status(200)
      .json({ message: "User updated", data: { name, email } });
  },

  // Delete a user
  handleDeleteUser: async (req: Request, res: Response) => {
    const userId = req.params.id;
    await UserService.deleteUser(userId);
    return res.status(200).json({ message: "User deleted" });
  },
};

export default UserController;
