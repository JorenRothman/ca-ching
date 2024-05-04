"use server";

import { lucia } from "@/server/auth/auth";
import { validateRequest } from "@/server/auth/validate";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
    const { session } = await validateRequest();

    if (!session) {
        return Response.json({
            error: "invalid session",
        });
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );
    return redirect("/login");
}
