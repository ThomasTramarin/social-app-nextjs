"use client";

import { editProfileSchema } from "@/lib/validations/editProfileSchema";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { useFormState } from "react-dom";
import { useRef, useEffect } from "react";
import { editProfileAction } from "@/lib/actions/editProfileAction";

export default function EditProfileForm(userData: any) {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: userData.data.username || "",
      name: userData.data.name || "",
      bio: userData.data.bio || "",
    },
  });

  const [formState, formAction] = useFormState(editProfileAction, {
    errorMessage: "",
    successMessage: "",
  });

  return (
    <Form {...form}>
      <form
        action={formAction}
        onSubmit={form.handleSubmit(() => formRef.current?.submit())}
        ref={formRef}
        className="max-w-xl w-full flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" type="text" {...field}/>
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
                  <Input placeholder="Name" type="text" {...field}/>
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
                  <Textarea placeholder="Bio" {...field}/>
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
