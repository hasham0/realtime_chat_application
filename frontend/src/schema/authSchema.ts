import { z } from "zod";

const RegisterSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
type RegisterSchemaTS = z.infer<typeof RegisterSchema>;
type LoginSchemaTS = z.infer<typeof LoginSchema>;

// !exports_
export type { RegisterSchemaTS, LoginSchemaTS };
export { RegisterSchema, LoginSchema };
