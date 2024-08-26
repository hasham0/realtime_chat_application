import { z } from "zod";

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  confirm_password: z.string().optional(),
});

const LoginSchema = RegisterSchema.pick({
  email: true,
  password: true,
});
type RegisterSchemaTS = z.infer<typeof RegisterSchema>;
type LoginSchemaTS = z.infer<typeof LoginSchema>;

// !exports_
export type { RegisterSchemaTS, LoginSchemaTS };
export { RegisterSchema, LoginSchema };
