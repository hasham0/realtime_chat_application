import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import { UserProfileTS } from "@/types";
import useAppStore from "@/zustand/store/store";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { FaTrash, FaPlus } from "react-icons/fa";
import {
  ProfileValidSchema,
  ProfileValidSchemaTS,
} from "@/validation/auth.validation.schema";
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
import { useMutation } from "@tanstack/react-query";
import ApiClient from "@/lib/api-client";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { PROFILE_UPDATE_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [hovered, setHovered] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfileTS>({
    first_name: userInfo?.first_name || "",
    last_name: userInfo?.last_name || "",
    image: "",
    color: userInfo?.color || 0,
    email: userInfo?.email || "",
    profile_setup: userInfo?.profile_setup || false,
    _id: userInfo?._id || "",
  });

  // const saveChanges = () => {};

  const form = useForm<ProfileValidSchemaTS>({
    resolver: zodResolver(ProfileValidSchema),
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      color: Number(user?.color),
      email: user?.email,
      profile_setup: user?.profile_setup,
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: (data: ProfileValidSchemaTS) => {
      return ApiClient.patch<{
        message: string;
        data: UserProfileTS;
      }>(
        PROFILE_UPDATE_ROUTE,
        {
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          color: data.color,
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
      console.log("message => ", message);
    },
  });

  const onSubmitProfile = async (values: ProfileValidSchemaTS) => {
    try {
      const response = await mutateAsync(values);
      const {
        message,
        data: userData,
      }: { message: string; data: UserProfileTS } = response.data;
      toast(message);
      localStorage.setItem("userData", JSON.stringify(userData));
      setUserInfo(userData);
      return navigate("/chat");
    } catch (error) {
      if (error instanceof AxiosError) {
        const err = error as AxiosError<{ message: string }>;
        console.log(err);
      }
    }
  };
  const handleChatNavigate = () => {
    if (userInfo?.profile_setup) {
      return navigate("/chat");
    } else {
      toast.error("Please setup profile");
    }
  };

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center gap-10 bg-[#1b1c24]">
      <div className="flex w-[80vw] items-center gap-36 md:w-max">
        <div className="">
          <IoArrowBack
            onClick={() => handleChatNavigate()}
            className="cursor-pointer text-4xl text-white/90 lg:text-6xl"
          />
        </div>
        <div className="flex flex-col items-center gap-5 lg:flex-row lg:gap-16">
          <div
            className="relative flex h-full w-32 items-center justify-center"
            onMouseEnter={() => setHovered((pre) => !pre)}
            onMouseLeave={() => setHovered((pre) => !pre)}
          >
            <Avatar className="h-32 w-32 overflow-hidden rounded-full md:h-48 md:w-48">
              {user && user.image ? (
                <AvatarImage
                  src={user.image}
                  alt="profile pic"
                  className="h-full w-full bg-black object-cover"
                />
              ) : (
                <div
                  className={`${getColor(user.color)} flex h-32 w-32 items-center justify-center rounded-full border-[1px] text-5xl uppercase md:h-48 md:w-48`}
                >
                  {user && user.first_name
                    ? user.first_name.split("").shift()
                    : user && user.last_name.split("").shift()}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div className="absolute flex h-32 w-32 cursor-pointer items-center justify-center rounded-full bg-black/50 ring-fuchsia-50 md:h-48 md:w-48">
                {user && user.image ? (
                  <FaTrash className="cursor-pointer text-3xl text-white" />
                ) : (
                  <FaPlus className="cursor-pointer text-3xl text-white" />
                )}
              </div>
            )}
          </div>
          <div className="min-h-80 w-96 border-2 border-white p-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitProfile)}
                className="flex min-w-full flex-col gap-5 capitalize text-white"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="">
                      <div className="flex items-center justify-between">
                        <FormLabel>email</FormLabel>
                        <FormControl>
                          <Input
                            className="w-60 text-center"
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
                  name="first_name"
                  render={({ field }) => (
                    <FormItem className="">
                      <div className="flex items-center justify-between">
                        <FormLabel>first name</FormLabel>
                        <FormControl>
                          <Input
                            className="w-60 text-center"
                            placeholder="enter your first name"
                            type="text"
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
                  name="last_name"
                  render={({ field }) => (
                    <FormItem className="">
                      <div className="flex items-center justify-between">
                        <FormLabel>last name</FormLabel>
                        <FormControl>
                          <Input
                            className="w-60 text-center"
                            placeholder="enter your last name"
                            type="text"
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
                  name="color"
                  render={() => (
                    <FormItem className="">
                      <div className="flex w-full items-center justify-between">
                        <FormLabel>color</FormLabel>
                        <div className="flex w-2/3 justify-center gap-4">
                          {colors.map((color: string, index: number) => (
                            <div
                              onClick={() => {
                                setUser((prevUser) => ({
                                  ...prevUser,
                                  color: index,
                                }));
                                form.setValue("color", index);
                              }}
                              key={index}
                              className={`${color} h-8 w-8 cursor-pointer rounded-full transition-all duration-300 ${user.color === index && "outline outline-1 outline-white"}`}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
                <Button
                  className="m-3 place-self-center capitalize"
                  type="submit"
                >
                  save changes
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
