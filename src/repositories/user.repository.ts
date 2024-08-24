import { User } from "../models/user.schema";
import { IUserRegister } from "../models/entities/user.entity";

const UserRepository = {
  getAllUsers: async () => {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      console.log(`getAllUsersRepository Error: ${error}`);
    }
  },
  getUser: async (email: string) => {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      console.log(`getUserRepository Error: ${error}`);
    }
  },
  createUser: async (user: IUserRegister) => {
    try {
      const newUser = new User(user);
      await newUser.save();
    } catch (error) {
      console.log(`createUserRepository Error: ${error}`);
    }
  },
  updateUser: async (id: string, user: IUserRegister) => {
    try {
      const updated = await User.findByIdAndUpdate(id, user);
      return updated;
    } catch (error) {
      console.log(`updateUserRepository Error: ${error}`);
    }
  },
  deleteUser: async (id: string) => {
    try {
      await User.findByIdAndDelete(id);
    } catch (error) {
      console.log(`deleteUserRepository Error: ${error}`);
    }
  },
};

export default UserRepository;
