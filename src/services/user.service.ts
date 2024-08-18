import UserRepository from "../repositories/user.repository";
import { IUser } from "../entities/user.entity";
import { newUserCreated, sendUserData } from "../utils/rabbitmq/user.rabbitmq";

const UserService = {
  getAllUsers: async () => {
    try {
      const users = await UserRepository.getAllUsers();
      return users;
    } catch (error) {
      console.log(`Service Error: ${error}`);
    }
  },
  getUser: async (id: string) => {
    try {
      const user = await UserRepository.getUser(id);

      // sendToQueue
      sendUserData(id);

      return user;
    } catch (error) {
      console.log(`Service Error: ${error}`);
    }
  },
  createUser: async (user: IUser) => {
    try {
      // inputValidation
      if (!user.name) {
        console.log("Name is required");
        return "Name is required";
      }
      const newUser = await UserRepository.createUser(user);

      // sendToQueue
      newUserCreated(user);

      return newUser;
    } catch (error) {
      console.log(`Service Error: ${error}`);
    }
  },
  updateUser: async (id: string, user: IUser) => {
    try {
      const updated = await UserRepository.updateUser(id, user);
      return updated;
    } catch (error) {
      console.log(`Service Error: ${error}`);
    }
  },
  deleteUser: async (id: string) => {
    try {
      await UserRepository.deleteUser(id);
    } catch (error) {
      console.log(`Service Error: ${error}`);
    }
  },
};

export default UserService;
