"use client";

import { Settings, CircleCheck, GanttChart, User2 } from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/"
                                className={cn(
                                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                                    {
                                        "bg-accent text-accent-foreground":
                                            pathname === "/",
                                    }
                                )}
                            >
                                <CircleCheck className="h-5 w-5" />
                                <span className="sr-only">Task</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Task</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/clients"
                                className={cn(
                                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                                    {
                                        "bg-accent text-accent-foreground":
                                            pathname === "/clients",
                                    }
                                )}
                            >
                                <User2 className="h-5 w-5" />
                                <span className="sr-only">Clients</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Clients</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/overview"
                                className={cn(
                                    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                                    {
                                        "bg-accent text-accent-foreground":
                                            pathname === "/overview",
                                    }
                                )}
                            >
                                <GanttChart className="h-5 w-5" />
                                <span className="sr-only">Overview</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Overview</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Settings className="h-5 w-5" />
                                <span className="sr-only">Settings</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Settings</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
    );
}
