import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
    Home,
    LineChart,
    Package,
    Package2,
    PanelLeft,
    Settings,
    ShoppingCart,
    CircleCheck,
    GanttChart,
    User2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
export const metadata: Metadata = {
    title: "Ca Ching",
    description: "A simple budgeting app",
};
import Sidebar from "@/app/admin/_components/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { validateRequest } from "@/server/auth/validate";
import { logout } from "@/server/auth/logout";
import DashboardTitle from "@/app/admin/_components/dashboardTitle";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user } = await validateRequest();

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Sidebar />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                size="icon"
                                variant="outline"
                                className="sm:hidden"
                            >
                                <PanelLeft className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href="/"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <CircleCheck className="h-5 w-5" />
                                    Task
                                </Link>
                                <Link
                                    href="/overview"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <GanttChart className="h-5 w-5" />
                                    Overview
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>

                    <DashboardTitle />

                    <DropdownMenu>
                        <DropdownMenuTrigger className="ml-auto" asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="overflow-hidden rounded-full"
                            >
                                <Avatar>
                                    <AvatarFallback>Me</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <form action={logout}>
                                    <button
                                        className="px-0 w-full text-left"
                                        type="submit"
                                    >
                                        Logout
                                    </button>
                                </form>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
