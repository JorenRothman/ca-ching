import { logout } from "@/server/auth/logout";
import { validateRequest } from "@/server/auth/validate";
import Link from "next/link";

export default async function SiteHeader() {
    const { user } = await validateRequest();

    return (
        <header className="p-4 flex gap-4">
            <Link href="/">Complete</Link>
            <Link href="/overview">Overview</Link>
            {user && (
                <div className="ml-auto">
                    <form action={logout}>
                        <button>Logout</button>
                    </form>
                </div>
            )}
        </header>
    );
}
