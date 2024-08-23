import { z } from "zod";

const registerValidationSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .toUpperCase()
    .min(1, "Name is required, fill it please"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const loginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export { registerValidationSchema, loginValidationSchema };
