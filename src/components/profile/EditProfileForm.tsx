"use client";
import { editProfileSchema } from "@/lib/validations/editProfileSchema";
import * as z from "zod";
import { CldUploadWidget } from "next-cloudinary";
import { RxAvatar } from "react-icons/rx";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { useEffect, useRef, useState } from "react";
import { editProfileAction } from "@/lib/actions/editProfileAction";
import { UserProfileData } from "@/lib/types/userTypes";
import { Button } from "../ui/button";
import Image from "next/image";

export default function EditProfileForm(userData: UserProfileData) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    successMessage: "",
    errorMessage: "",
  });

  const [avatar, setAvatar] = useState<any>(userData.data.avatar || null);


  const form = useForm<z.output<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: userData.data.username || "",
      name: userData.data.name || "",
      bio: userData.data.bio || "",
    },
  });

  useEffect(() => {
    if (formState.successMessage) {
      formRef.current?.reset();
    }
  }, [formState]);

  const onSubmit = async (data: z.infer<typeof editProfileSchema>) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("name", data.name);
    formData.append("bio", data.bio);
    formData.append("avatar", avatar?.secure_url);

    const res = await editProfileAction(formData);
    setFormState(res);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        ref={formRef}
        className="max-w-xl w-full flex flex-col gap-4"
      >
        <CldUploadWidget
          uploadPreset="social-app-nextjs"
          onSuccess={(result) => setAvatar(result.info)}
        >
          {({ open }) => {
            return (
              <div>
                {avatar ? (
                  <Image
                    src={typeof avatar === "string" ? avatar : avatar.secure_url}
                    alt="User avatar image"
                    width={100}
                    height={100}
                    className="w-[100px] h-[100px] rounded-full object-cover object-center mb-5"
                  />
                ) : (
                  <RxAvatar size={100} className="mb-5" />
                )}
                <Button type="button" onClick={() => open()}>
                  Change
                </Button>
              </div>
            );
          }}
        </CldUploadWidget>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Bio" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit">Update Profile</Button>
        {formState && (
          <p
            aria-live="polite"
            className={`${
              formState.successMessage ? "text-green-600" : "text-red-600"
            }`}
          >
            {formState.successMessage
              ? formState.successMessage
              : formState.errorMessage}
          </p>
        )}
      </form>
    </Form>
  );
}
