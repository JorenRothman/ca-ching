"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Task = {
    id: string;
    title: string;
    duration: number;
    date: Date;
    client: {
        name: string;
    };
};

export const columns: ColumnDef<Task>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "duration",
        header: "Duration",
    },
    {
        accessorKey: "client.name",
        header: "Client",
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => {
            const date: Date = row.getValue("date");

            return <div>{date.toLocaleDateString("nl-NL")}</div>;
        },
    },
];
