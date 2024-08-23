import jwt from "jsonwebtoken";

interface IUserPayload {
  id: string;
  name: string;
  email: string;
}

export default async function generateToken(
  user: IUserPayload,
  key: string,
  expire: number,
) {
  return jwt.sign(user, key, { expiresIn: expire });
}
