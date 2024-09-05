import { z } from "zod";

// register
const RegisterValidSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

// login
const LoginValidSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// profile
const ProfileValidSchema = z.object({
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  color: z.number(),
  profile_setup: z.boolean(),
});

//note: types
type RegisterValidSchemaTS = z.infer<typeof RegisterValidSchema>;
type LoginValidSchemaTS = z.infer<typeof LoginValidSchema>;
type ProfileValidSchemaTS = z.infer<typeof ProfileValidSchema>;

// !exports_
export type { RegisterValidSchemaTS, LoginValidSchemaTS, ProfileValidSchemaTS };
export { RegisterValidSchema, LoginValidSchema, ProfileValidSchema };
