import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginSchema, LoginSchemaTS } from "@/schema/authSchema";
const LoginForm = () => {
  const form = useForm<LoginSchemaTS>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitLogin = (values: LoginSchemaTS) => {
    console.log(values);
  };

  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitLogin)}
          className="grid capitalize"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col p-2">
                <div className="flex items-center justify-between">
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input
                      className="w-2/3"
                      placeholder="enter your email"
                      type="email"
                      {...field}
                      required={true}
                    />
                  </FormControl>
                </div>
                <FormMessage className="self-center" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col p-2">
                <div className="flex items-center justify-between">
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input
                      className="w-2/3"
                      placeholder="enter your password"
                      type="password"
                      {...field}
                      required={true}
                    />
                  </FormControl>
                </div>
                <FormMessage className="self-center" />
              </FormItem>
            )}
          />

          <Button className="m-3 place-self-center capitalize" type="submit">
            login
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default LoginForm;
