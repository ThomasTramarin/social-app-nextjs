"use client";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [formState, setFormState] = useState({
    successMessage: "",
    errorMessage: "",
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      redirect: false,
    });

    if (!res?.ok) {
      setFormState({ ...formState, errorMessage: res?.error as string });
    } else {
      setFormState({ ...formState, successMessage: "Logged in successfully!" });
      router.push("/");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      ref={formRef}
      className="max-w-md w-full flex flex-col gap-4"
    >
      <div className="mb-1">
        <Label>Email</Label>
        <Input type="email" ref={emailRef} placeholder="Email Address" />
      </div>
      <div className="mb-1">
        <Label>Password</Label>
        <Input type="password" ref={passwordRef} placeholder="Password" />
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
      <p className="text-sm">
          Don&apos;t have an account? <Link href="/register" className="text-blue underline underline-offset-2">Register</Link>
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
  );
}
