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

//note: types
type RegisterValidSchemaTS = z.infer<typeof RegisterValidSchema>;
type LoginValidSchemaTS = z.infer<typeof LoginValidSchema>;

// !exports_
export type { RegisterValidSchemaTS, LoginValidSchemaTS };
export { RegisterValidSchema, LoginValidSchema };
