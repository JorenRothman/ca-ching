import type { Metadata } from "next";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Ca Ching",
    description: "A simple budgeting app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <TRPCReactProvider>
                <body>
                    <header className="p-4 flex gap-4">
                        <Link href={"/"}>Complete</Link>
                        <Link href="overview">Overview</Link>
                        <Link href="login">Login</Link>
                    </header>
                    {children}
                </body>
            </TRPCReactProvider>
        </html>
    );
}
