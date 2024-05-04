import { logout } from "@/server/auth/logout";

export async function GET() {
    await logout();
}
