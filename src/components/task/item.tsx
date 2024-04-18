"use client";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
    id: string;
    title: string;
    duration: string;
    client: {
        name: string;
    };
    date: Date;
};

export default function Item({ id, title, duration, client, date }: Props) {
    const router = useRouter();

    const remove = api.task.delete.useMutation({
        onSuccess: () => {
            router.refresh();
            toast("Success, task delete!");
        },
    });

    function handleRemove() {
        remove.mutate({ id });
    }

    return (
        <div className="border border-black p-4 flex flex-col">
            <button className="mb-4" onClick={handleRemove}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
            </button>
            {client && <h3 className="italic">{client.name}</h3>}
            <h2 className="text-lg">{title}</h2>
            <p>{duration} minutes</p>
            <p>On: {date.toISOString()}</p>
        </div>
    );
}
