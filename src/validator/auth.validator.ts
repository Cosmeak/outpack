import { z } from "zod";

export const loginValidator = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type LoginForm = z.infer<typeof loginValidator>;

export const registerValidator = z
  .object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirm_password: z.string(),
  })
  .refine((self) => self.password == self.confirm_password, {
    message: "Password don't match.",
    path: ["confirm_password"],
  });
export type RegisterForm = z.infer<typeof registerValidator>;
