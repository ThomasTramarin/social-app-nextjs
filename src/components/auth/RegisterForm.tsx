"use client";
import { registerFormSchema } from "@/lib/validations/registerFormSchema";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
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
  const [formState, setFormState] = useState({successMessage: "", errorMessage: ""})
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


  useEffect(()=>{
    if(formState.successMessage){
      formRef.current?.reset();

      router.push("/login")
    }
  }, [formState])

  const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
    const formData = new FormData()
    formData.append("username", data.username)
    formData.append("email", data.email)
    formData.append("password", data.password)
    formData.append("confirmPassword", data.confirmPassword)

    const res = await registerAction(formData)
    setFormState(res)
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
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
        <Button type="submit">Register</Button>
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
