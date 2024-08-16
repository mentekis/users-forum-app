import { User } from "../models/user.schema";
import { IUser } from "../entities/user.entity";

const UserRepository = {
  getAllUsers: async () => {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      console.log(`Repository Error: ${error}`);
    }
  },
  getUser: async (id: string) => {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      console.log(`Repository Error: ${error}`);
    }
  },
  createUser: async (user: IUser) => {
    try {
      const newUser = new User(user);
      await newUser.save();
    } catch (error) {
      console.log(`Repository Error: ${error}`);
    }
  },
  updateUser: async (id: string, user: IUser) => {
    try {
      const updated = await User.findByIdAndUpdate(id, user);
      return updated;
    } catch (error) {
      console.log(`Repository Error: ${error}`);
    }
  },
  deleteUser: async (id: string) => {
    try {
      await User.findByIdAndDelete(id);
    } catch (error) {
      console.log(`Repository Error: ${error}`);
    }
  },
};

export default UserRepository;
