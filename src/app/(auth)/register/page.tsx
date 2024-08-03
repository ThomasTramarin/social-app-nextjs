import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="h-full flex flex-col items-center justify-center p-5">
      <h1 className="mb-5">Register Now</h1>
      <RegisterForm />
    </main>
  );
}
