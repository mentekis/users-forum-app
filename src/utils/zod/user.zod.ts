import { z } from "zod";

export const userValidationSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .toUpperCase()
    .min(1, "Name is required, fill it please"),
  city: z
    .string({
      required_error: "City is required",
      invalid_type_error: "City must be a string",
    })
    .toUpperCase()
    .min(1, "City is required, fill it please"),
});
