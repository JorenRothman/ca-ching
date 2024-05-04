import "server-only";
import * as jose from "jose";

const secret = new TextEncoder().encode(
    "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2"
);
const alg = "HS256";

export async function createJWT<T extends jose.JWTPayload>(payload: T) {
    return await new jose.SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer("urn:example:issuer")
        .setAudience("urn:example:audience")
        .setExpirationTime("2h")
        .sign(secret);
}

export async function verifyJWT<T>(
    token: string
): Promise<jose.JWTVerifyResult<T>> {
    return await jose.jwtVerify(token, secret);
}
