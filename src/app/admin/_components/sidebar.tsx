"use client";

import { CircleCheck, Handshake, LockOpen } from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DashboardIcon } from "@radix-ui/react-icons";

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/admin"
                                className={cn(
                                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                                    {
                                        "bg-accent text-accent-foreground":
                                            pathname === "/admin",
                                    },
                                )}
                            >
                                <DashboardIcon className="h-5 w-5" />
                                <span className="sr-only">Dashboard</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Dashboard</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/admin/tasks"
                                className={cn(
                                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                                    {
                                        "bg-accent text-accent-foreground":
                                            pathname === "/admin/tasks",
                                    },
                                )}
                            >
                                <CircleCheck className="h-5 w-5" />
                                <span className="sr-only">Tasks</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Tasks</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/admin/clients"
                                className={cn(
                                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                                    {
                                        "bg-accent text-accent-foreground":
                                            pathname === "/admin/clients",
                                    },
                                )}
                            >
                                <Handshake className="h-5 w-5" />
                                <span className="sr-only">Clients</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Clients</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/admin/access-token"
                                className={cn(
                                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                                    {
                                        "bg-accent text-accent-foreground":
                                            pathname === "/admin/access-token",
                                    },
                                )}
                            >
                                <LockOpen className="h-5 w-5" />
                                <span className="sr-only">Access Tokens</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            Access Tokens
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
    );
}
