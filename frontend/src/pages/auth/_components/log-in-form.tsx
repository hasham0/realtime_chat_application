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
import ApiClient from "@/lib/api-client";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { LOGIN_ROUTE } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import {
  LoginValidSchema,
  LoginValidSchemaTS,
} from "@/validation/auth.validation.schema";
import { UserProfileTS } from "@/types";
import { useNavigate } from "react-router-dom";
import useStore from "@/zustand/store/store";

type Props = {
  handleTabChange: (tab: string) => void;
};
const LoginForm = ({ handleTabChange }: Props) => {
  const { setUserInfo } = useStore();
  const navigate = useNavigate();
  const form = useForm<LoginValidSchemaTS>({
    resolver: zodResolver(LoginValidSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutateAsync } = useMutation({
    mutationFn: (data: LoginValidSchemaTS) => {
      return ApiClient.post<{
        message: string;
        data: UserProfileTS;
      }>(
        LOGIN_ROUTE,
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        },
      );
    },
    onSuccess: (data) => data,
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data.message;
      toast(message);
    },
  });

  const onSubmitLogin = async (values: LoginValidSchemaTS) => {
    try {
      const response = await mutateAsync(values);
      const {
        message,
        data: userData,
      }: { message: string; data: UserProfileTS } = response.data;
      toast(message);
      if (!userData.profile_setup) {
        setUserInfo(userData);
        return navigate("/profile");
      }
      setUserInfo(userData);
      return navigate("/chat");
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
      <p
        onClick={() => handleTabChange("signup")}
        className="cursor-pointer text-center text-sm text-blue-500 underline underline-offset-2"
      >
        Create New Account{" "}
      </p>
    </section>
  );
};

export default LoginForm;
