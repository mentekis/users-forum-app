import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import { newUserCreated } from "../utils/rabbitmq/user.rabbitmq";

const AuthController = {
  handleCheckAuth: async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const data = await AuthService.checkAuth(refreshToken);
    if (!data) {
      return res.status(401);
      //.json({ message: "Unauthorized!, session expired" });
    }
    return res
      .cookie("accessToken", data.newAccessToken, { httpOnly: true })
      .status(200)
      .json({ message: "Authorized", accessToken: data.newAccessToken });
  },
  handleRegister: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const result = await AuthService.userRegister({ name, email, password });
    if (typeof result === "object") {
      return res.status(403).json({ message: result });
    }

    return res
      .status(201)
      .json({ message: "User created", data: { name, email } });
  },
  handleLogin: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await AuthService.userLogin({ email, password });
    if (result?.accessToken === undefined) {
      return res.status(400).json({ message: result });
    }

    return res
      .cookie("accessToken", result.accessToken, {
        httpOnly: true,
      })
      .cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
      })
      .cookie("userId", result.userId, { httpOnly: true })
      .status(200)
      .json({ message: "You're successful Logged in" });
  },
  handleLogout: async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    await AuthService.userLogout(refreshToken);
    res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .clearCookie("userId")
      .status(200)
      .json({ message: "You're successful Logged out" });
  },
};

export default AuthController;
