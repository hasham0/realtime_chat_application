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
import ApiClient from "@/lib/api-client";
//import { toast } from "sonner";
import { AxiosError } from "axios";
import { LOGIN_ROUTE } from "@/utils/constants";

const LoginForm = () => {
  const form = useForm<LoginSchemaTS>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitLogin = async (values: LoginSchemaTS) => {
    try {
      const response = await ApiClient.post(
        LOGIN_ROUTE,
        {
          email: values.email,
          password: values.password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(response.data);
      // const { message } = response.data;
      // toast(message);
    } catch (error) {
      if (error instanceof AxiosError) {
        const err = error as AxiosError<{ message: string }>;
        console.log(err);

        // const message = err.response?.data.message;
        // toast(message);
      }
    }
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
