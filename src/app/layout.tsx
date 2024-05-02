import type { Metadata } from "next";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import Providers from "@/providers";
import SiteHeader from "@/components/ui/siteHeader";

export const metadata: Metadata = {
    title: "Ca Ching",
    description: "A simple budgeting app",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <TRPCReactProvider>
                    <Providers>
                        <SiteHeader />
                        {children}
                    </Providers>
                </TRPCReactProvider>
            </body>
        </html>
    );
}
