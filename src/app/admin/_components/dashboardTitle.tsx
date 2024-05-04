"use client";

import { usePathname } from "next/navigation";

function getTitle(pathname: string) {
    switch (pathname) {
        case "/admin":
            return "Dashboard";
        case "/admin/tasks":
            return "Tasks";
        case "/admin/clients":
            return "Clients";
        case "/admin/access-token":
            return "Access Token";
        default:
            return false;
    }
}

export default function DashboardTitle() {
    const pathname = usePathname();

    const title = getTitle(pathname);

    if (!title) {
        return <h2></h2>;
    }

    return <h2 className="text-xl">{title}</h2>;
}
