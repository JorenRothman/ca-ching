import type { Metadata } from "next";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import Providers from "@/providers";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Ca Ching",
    description: "A simple budgeting app",
};

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                <TRPCReactProvider>
                    <Providers>{children}</Providers>
                </TRPCReactProvider>
            </body>
        </html>
    );
}
