import { validateRequestPage } from "@/server/auth/validate";
import { redirect } from "next/navigation";

export default async function Page() {
    const { user } = await validateRequestPage();

    return (
        <div>
            <h1>API Keys</h1>
        </div>
    );
}
