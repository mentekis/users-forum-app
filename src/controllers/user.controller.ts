import { Request, Response } from "express";
import UserService from "../services/user.service";
import { newUserCreated, rabbitConnect } from "../utils/rabbitmq/user.rabbitmq";

const UserController = {
  // Get all users
  handleGetAllUsers: async (req: Request, res: Response) => {
    const users = await UserService.getAllUsers();
    return res.status(200).json({ message: "List of Users", data: users });
  },

  handleGetUser: async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await UserService.getUser(id);
    return res.status(200).json({ message: "User found", data: user });
  },

  // Create a user
  handleCreateUser: async (req: Request, res: Response) => {
    const { name, city } = req.body; // Get body content
    const data = await UserService.createUser({ name, city });
    if (typeof data === "string") {
      return res.status(400).json({ message: "Name is required" });
    }

    // sendToQueue
    newUserCreated({ name, city });

    return res
      .status(201)
      .json({ message: "User created", data: { name, city } });
  },

  // Update a user
  handleUpdateUser: async (req: Request, res: Response) => {
    const userId = req.params.id;
    const userHeader = req.headers.authorization;
    const { name, city } = req.body;

    // Check authorization
    if (!userHeader) {
      return res.status(401).json({ message: "Unauthorized. Invalid token" });
    }
    await UserService.updateUser(userId, { name, city });

    return res
      .status(200)
      .json({ message: "User updated", data: { name, city } });
  },

  // Delete a user
  handleDeleteUser: async (req: Request, res: Response) => {
    const userId = req.params.id;
    await UserService.deleteUser(userId);
    return res.status(200).json({ message: "User deleted" });
  },
};

export default UserController;
