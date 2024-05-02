import { validateRequest } from "@/server/auth/validate";
import Link from "next/link";

export default async function SiteHeader() {
    const { user } = await validateRequest();

    return (
        <header className="p-4 flex gap-4">
            <Link href="/">Complete</Link>
            <Link href="/overview">Overview</Link>
            <div className="ml-auto">
                {user && <Link href="/logout">Logout</Link>}
            </div>
        </header>
    );
}
