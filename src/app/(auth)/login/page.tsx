import { LoginForm } from "@/app/(auth)/login/_components/loginForm";

export default async function Page() {
    return (
        <div className="h-full min-h-screen w-full flex items-center justify-center">
            <LoginForm />
        </div>
    );
}
