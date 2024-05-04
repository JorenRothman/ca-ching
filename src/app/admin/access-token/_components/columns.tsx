"use client";

import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/trpc/react";
import { validateRequest } from "@/server/auth/validate";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AccessToken = {
    id: string;
    token: string;
    createdAt: Date;
};

export const columns: ColumnDef<AccessToken>[] = [
    {
        accessorKey: "token",
        header: "Token",
        cell: ({ row }) => {
            const token: string = row.getValue("token");

            return <Input value={token} readOnly />;
        },
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const date: Date = row.getValue("createdAt");

            return <div>{date.toLocaleDateString("nl-NL")}</div>;
        },
    },
    {
        id: "actions",
        header: "Delete",
        cell: ({ row }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const router = useRouter();
            const accessToken = row.original;

            const mutation = api.accessToken.delete.useMutation({
                onSuccess: () => {
                    router.refresh();
                    toast("Access Token successfully deleted!");
                },
                onError: ({ message }) => {},
            });

            return (
                <Button variant={"ghost"}>
                    <Trash2
                        className="size-5"
                        onClick={() =>
                            mutation.mutate({
                                id: accessToken.id,
                            })
                        }
                    />
                </Button>
            );
        },
    },
];
