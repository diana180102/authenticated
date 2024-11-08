import { z } from 'zod';

export const loginSchema = z.object({
   email: z.string({
     required_error: "Email is required"
   }).email({message:"Invalid email address"}),
   
   password: z.string({
    required_error: "Password is required",
  }),
});

export type LoginParams = z.infer<typeof loginSchema>;