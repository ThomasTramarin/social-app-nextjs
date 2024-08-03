"use client";
import { registerFormSchema } from "@/lib/validations/registerFormSchema";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { useRef, useEffect, useState } from "react";
import registerAction from "@/lib/actions/registerAction";
import { useFormState } from "react-dom";
import Link from "next/link";

export default function RegisterForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const form = useForm<z.output<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [formState, formAction] = useFormState(registerAction, {
    errorMessage: "",
    successMessage: "",
  });

  const onSubmit = () => {
    formRef.current?.submit();
  }

  return (
    <Form {...form}>
      <form
        action={formAction}
        onSubmit={form.handleSubmit(onSubmit)}
        ref={formRef}
        className="max-w-md w-full flex flex-col gap-4"
      >
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
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email address" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit" className="w-full">
          Register
        </Button>
        <p className="text-sm">
          Already have an account? <Link href="/login" className="text-blue underline underline-offset-2">Login</Link>
        </p>
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
