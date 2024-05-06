"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function GenerateForm() {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [token, setToken] = useState<string>("test");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const mutation = api.accessToken.create.useMutation({
        onSuccess: ({ token }) => {
            setToken(token);
            setIsOpen(true);
        },
        onError: ({ message }) => {
            toast.error(message);
        },
    });

    function onClick() {
        mutation.mutate();
    }

    async function copyToClipboard() {
        await navigator.clipboard.writeText(token);
        toast.success("Access Token copied");
    }

    function onOpenChange(value: boolean) {
        setIsOpen(value);

        if (!value) {
            router.refresh();
        }
    }

    return (
        <div>
            <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Access Token</AlertDialogTitle>
                        <AlertDialogDescription></AlertDialogDescription>

                        <Input ref={inputRef} value={token} readOnly />
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Close</AlertDialogCancel>

                        <AlertDialogAction asChild>
                            <Button onClick={copyToClipboard}>
                                Copy <Copy className="size-4 ml-2" />
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Button onClick={onClick}>Generate Access Token</Button>
        </div>
    );
}
