import { IUserRegister, IUserLogin } from "../models/entities/user.entity";
import {
  registerValidationSchema,
  loginValidationSchema,
} from "../utils/zod/user.zod";
import UserService from "./user.service";
import bcryptjs from "bcryptjs";
import { env } from "../utils/envalid/env";
import jwt from "jsonwebtoken";
import AuthRepository from "../repositories/auth.repository";

const AuthService = {
  createAuth: async (userId: string, refreshToken: string) => {
    try {
      const newAuth = await AuthRepository.createAuth(userId, refreshToken);
      return newAuth;
    } catch (error) {
      console.log(`createAuthService Error: ${error}`);
    }
  },
  userRegister: async (user: IUserRegister) => {
    try {
      // validation
      const validated = registerValidationSchema.safeParse(user);
      if (!validated.success) {
        return validated.error.issues.map((e) => e.message);
      }

      // collision check
      const isUserExist = await UserService.getUser(user.email);
      if (isUserExist) {
        return {
          message:
            "The system will sent reset email link to your associated email, if the email found registered",
        };
      }

      // password hashing
      const hashedPassword = await bcryptjs.hash(user.password, 13);

      // save to db
      const newUser = await UserService.createUser({
        ...user,
        password: hashedPassword,
      });
      return newUser;
    } catch (error) {
      console.log(`userRegisterService Error: ${error}`);
    }
  },
  userLogin: async (user: IUserLogin) => {
    try {
      // validation
      const validated = loginValidationSchema.safeParse(user);
      if (!validated.success) {
        return { message: validated.error.issues.map((e) => e.message) };
      }

      // check record
      const checkUser = await UserService.getUser(user.email);
      if (!checkUser) {
        return {
          message:
            "The system will sent reset email link to your associated email, if the email found registered",
        };
      }

      // password match
      const isPasswordMatch = bcryptjs.compareSync(
        user.password,
        checkUser.password as string,
      );
      if (!isPasswordMatch) {
        return { message: "Invalid credentials" };
      }

      // release both token
      const payload = {
        id: checkUser._id,
        name: checkUser.name,
        email: checkUser.email,
      };
      const accessToken = jwt.sign(payload, env.JWT_ACCESS_KEY, {
        expiresIn: "15m",
      });
      const refreshToken = jwt.sign(payload, env.JWT_REFRESH_KEY, {
        expiresIn: "7d",
      });

      // save to authDb
      const userId = checkUser._id.toString();
      await AuthService.createAuth(userId, refreshToken);
      return { accessToken, refreshToken };
    } catch (error) {
      console.log(`userLoginService Error: ${error}`);
    }
  },
  userLogout: async (refreshToken: string) => {
    try {
      await AuthRepository.deleteAuth(refreshToken);
    } catch (error) {
      console.log(`userLogoutService Error: ${error}`);
    }
  },
};

export default AuthService;
