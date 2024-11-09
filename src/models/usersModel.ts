import {z} from 'zod';

export const UsersSchema = z.object({
    name: z.string({
        required_error: "name is required",
        invalid_type_error : "name must be string"
    }).min(1, "Field can't is empty"),
    
    email: z.string().email({message:"Invalid email address"}),

    password: z.string({
        required_error: "password is required",
        invalid_type_error: "password most be string"
    }).min(6, "Password must be at least 6 characters long").default("codeable"),

    age: z.number().int().positive().optional(),
    role: z.enum(['admin', 'user']).default('user'),
});


export type UsersParams = z.infer<typeof UsersSchema>;
export type Users = UsersParams & {id: number};