import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage(){

   return(
      <main className="h-full flex flex-col items-center justify-center p-5">
         <h1>Login</h1>
         <LoginForm />
      </main>
   )
};