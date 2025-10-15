import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const protectedRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
    try {
        const { pathname } = request.nextUrl;
        console.log("LOG: ~ middleware ~ pathname:", pathname);
        const token = await auth.api.getSession({
            headers: await headers(),
        });

        // console.log("LOG: ~ middleware ~ token:", token);

        if (protectedRoutes.some((route) => pathname.startsWith(route))) {
            if (!token) {
                const loginUrl = new URL("/login", request.url);
                loginUrl.searchParams.set("callbackUrl", request.url);
                return NextResponse.redirect(loginUrl);
            }
        }

        if (["/auth/login", "/auth/register"].includes(pathname)) {
            if (token) {
                return NextResponse.redirect(new URL("/", request.url));
            }
        }

        return NextResponse.next();
    } catch (err) {
        console.log("LOG: ~ file: middleware.ts:11 ~ middleware ~ err:", err);
    }
}

export const config = {
    runtime: "nodejs",
    matcher: [
        "/dashboard/:path*",
        "/profile/:path*",
        "/settings/:path*",
        "/auth/login",
        "/auth/register",
    ],
};
