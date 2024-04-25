"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Close from "@/icons/close";
import EditIcon from "@/icons/edit";
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

function Edit() {
    return (
        <Dialog>
            <DialogTrigger>
                <EditIcon />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </DialogDescription>
                    <DialogFooter>
                        <DialogClose>close</DialogClose>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default function Item({ id, title, duration, client, date }: Props) {
    const router = useRouter();

    const remove = api.task.delete.useMutation({
        onSuccess: () => {
            router.refresh();
            toast("Success, task delete!", {});
        },
    });

    function handleRemove() {
        remove.mutate({ id });
    }

    return (
        <div className="border border-black p-4 flex flex-col">
            <div className="flex gap-4 mb-4">
                <button onClick={handleRemove}>
                    <Close />
                </button>
                <Edit />
            </div>
            {client && <h3 className="italic">{client.name}</h3>}
            <h2 className="text-lg">{title}</h2>
            <p>{duration} minutes</p>
            <p>On: {date.toISOString()}</p>
        </div>
    );
}
