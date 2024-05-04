import { cookies } from "next/headers";
import { cache } from "react";

import type { Session, User } from "lucia";
import { lucia } from "@/server/auth/auth";
import { redirect } from "next/navigation";
import { verifyJWT } from "@/lib/jwt";
import type { AccessTokenPayload } from "@/server/api/routers/accessToken";

export const validateRequest = cache(
    async (
        accessToken = ""
    ): Promise<
        { user: User; session: Session } | { user: null; session: null }
    > => {
        if (accessToken) {
            const { payload } = await verifyJWT<AccessTokenPayload>(
                accessToken
            );

            return {
                user: {
                    id: payload.userID,
                    githubId: 102,
                    username: "care",
                },
                session: {
                    expiresAt: new Date(),
                    fresh: true,
                    id: "123",
                    userId: payload.userID,
                },
            };
        }

        const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
        if (!sessionId) {
            return {
                user: null,
                session: null,
            };
        }

        const result = await lucia.validateSession(sessionId);
        // next.js throws when you attempt to set cookie when rendering page
        try {
            if (result.session && result.session.fresh) {
                const sessionCookie = lucia.createSessionCookie(
                    result.session.id
                );
                cookies().set(
                    sessionCookie.name,
                    sessionCookie.value,
                    sessionCookie.attributes
                );
            }
            if (!result.session) {
                const sessionCookie = lucia.createBlankSessionCookie();
                cookies().set(
                    sessionCookie.name,
                    sessionCookie.value,
                    sessionCookie.attributes
                );
            }
        } catch {}

        return result;
    }
);

export const validateRequestPage = async () => {
    const session = await validateRequest();

    if (!session.user) {
        return redirect("/login");
    }

    return session;
};
