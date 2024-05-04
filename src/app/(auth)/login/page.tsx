import { LoginForm } from "@/app/(auth)/login/_components/loginForm";
import { validateRequest } from "@/server/auth/validate";
import { redirect } from "next/navigation";

export default async function Page() {
    const { user } = await validateRequest();

    if (user) {
        redirect("/");
    }

    return (
        <div className="h-full min-h-screen w-full flex items-center justify-center">
            <LoginForm />
        </div>
    );
}
