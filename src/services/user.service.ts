import UserRepository from "../repositories/user.repository";
import { IUserRegister } from "../models/entities/user.entity";

const UserService = {
  getAllUsers: async () => {
    try {
      const users = await UserRepository.getAllUsers();
      return users;
    } catch (error) {
      console.log(`Service [getAllUsers] Error: ${error}`);
    }
  },
  getUserById: async (id: string) => {
    try {
      const user = await UserRepository.getUser(id);
      return user;
    } catch (error) {
      console.log(`Service [getUser] Error: ${error}`);
    }
  },
  getUserByEmail: async (email: string) => {
    try {
      const user = await UserRepository.getUser(email);
      return user;
    } catch (error) {
      console.log(`Service [getUser] Error: ${error}`);
    }
  },
  createUser: async (user: IUserRegister) => {
    try {
      const newUser = await UserRepository.createUser(user);
      return newUser;
    } catch (error) {
      console.log(`Service [createUser] Error: ${error}`);
    }
  },
  updateUser: async (id: string, user: IUserRegister) => {
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
