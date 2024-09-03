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
import {
  RegisterValidSchema,
  RegisterValidSchemaTS,
} from "@/validation/auth.validation.schema";
import ApiClient from "@/lib/api-client";
import { SIGNUP_ROUTE } from "@/utils/constants";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

type Props = {
  handleTabChange: (tab: string) => void;
};
const SignUpForm = ({ handleTabChange }: Props) => {
  const form = useForm<RegisterValidSchemaTS>({
    resolver: zodResolver(RegisterValidSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: (data: RegisterValidSchemaTS) => {
      return ApiClient.post(
        SIGNUP_ROUTE,
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        },
      );
    },
    onSuccess: (data) => {
      console.log(data);
      const { message } = data.data;
      toast(message);
      handleTabChange("login");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const err = error as AxiosError<{ message: string }>;
        const message = err.response?.data.message;
        toast(message);
      }
    },
  });
  const onSubmit = async (values: RegisterValidSchemaTS) => {
    try {
      await mutateAsync(values);
      handleTabChange("login");
    } catch (error) {
      if (error instanceof AxiosError) {
        const err = error as AxiosError<{ message: string }>;
        console.log(err);
      }
    }
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid">
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
                      min={8}
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
            name="confirm_password"
            render={({ field }) => (
              <FormItem className="flex flex-col p-2">
                <div className="flex items-center justify-between">
                  <FormLabel>confirm password</FormLabel>
                  <FormControl>
                    <Input
                      className="w-2/3"
                      placeholder="enter your confirm password"
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
            register
          </Button>
        </form>
      </Form>{" "}
      <p
        onClick={() => handleTabChange("login")}
        className="cursor-pointer text-center text-sm text-blue-500 underline underline-offset-2"
      >
        Already Have an Account
      </p>
    </section>
  );
};

export default SignUpForm;
