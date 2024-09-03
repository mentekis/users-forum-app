import { UserAuth } from "../models/auth.schema";

const AuthRepository = {
  createAuth: async (userId: string, refreshToken: string) => {
    try {
      const newAuth = new UserAuth({ userId, refreshToken });
      await newAuth.save();
    } catch (error) {
      console.log(`createAuth Repository Error: ${error}`);
    }
  },
  getAuth: async (refreshToken: string) => {
    try {
      const auth = await UserAuth.findOne({ refreshToken });
      return auth;
    } catch (error) {
      console.log(`getAuth Repository Error: ${error}`);
    }
  },
  deleteAuth: async (refreshToken: string) => {
    try {
      await UserAuth.findOneAndDelete({ refreshToken });
    } catch (error) {
      console.log(`deleteAuth Repository Error: ${error}`);
    }
  },
};

export default AuthRepository;
