import type { Metadata } from "next";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/react";

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
                <body>{children}</body>
            </TRPCReactProvider>
        </html>
    );
}
