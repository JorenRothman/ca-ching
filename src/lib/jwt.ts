import "server-only";
import * as jose from "jose";
import { env } from "@/env";

const secret = new TextEncoder().encode(env.SECRET);
const alg = "HS256";

export async function createJWT<T extends jose.JWTPayload>(payload: T) {
    return await new jose.SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer("urn:ca-ching:issuer")
        .setAudience("urn:ca-ching:audience")
        .setExpirationTime("20 years")
        .sign(secret);
}

export async function verifyJWT<T>(
    token: string,
): Promise<jose.JWTVerifyResult<T>> {
    return await jose.jwtVerify(token, secret);
}
