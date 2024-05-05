"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Client = {
    id: string;
    name: string;
};

export const columns: ColumnDef<Client>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        id: "actions",
        header: "Delete",
        cell: ({ row }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const router = useRouter();
            const data = row.original;

            const mutation = api.client.delete.useMutation({
                onSuccess: ({ clients }) => {
                    router.refresh();

                    toast.success(
                        `${clients.shift()?.name} successfully deleted!`
                    );
                },
                onError: ({ data, message }) => {
                    if (message.includes("violates foreign key constraint")) {
                        return toast.error(
                            "Unable to delete client. Please remove all attached tasks"
                        );
                    }

                    toast.error(message, {});
                },
            });

            return (
                <Button
                    variant={"ghost"}
                    onClick={() => mutation.mutate({ id: data.id })}
                >
                    <Trash2 className="size-5" />
                </Button>
            );
        },
    },
];
