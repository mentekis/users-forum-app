import UserRepository from "../repositories/user.repository";
import { IUser } from "../entities/user.entity";

const UserService = {
  getAllUsers: async () => {
    try {
      const users = await UserRepository.getAllUsers();
      return users;
    } catch (error) {
      console.log(`Service [getAllUsers] Error: ${error}`);
    }
  },
  getUser: async (id: string) => {
    try {
      const user = await UserRepository.getUser(id);
      return user;
    } catch (error) {
      console.log(`Service [getUser] Error: ${error}`);
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

      return newUser;
    } catch (error) {
      console.log(`Service [createUser] Error: ${error}`);
    }
  },
  updateUser: async (id: string, user: IUser) => {
    try {
      const updated = await UserRepository.updateUser(id, user);
      return updated;
    } catch (error) {
      console.log(`Service [updateUser] Error: ${error}`);
    }
  },
  deleteUser: async (id: string) => {
    try {
      await UserRepository.deleteUser(id);
    } catch (error) {
      console.log(`Service [deleteUser] Error: ${error}`);
    }
  },
};

export default UserService;
