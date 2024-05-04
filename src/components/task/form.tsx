"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DEFAULT_ERROR_MESSAGE } from "@/messages";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

const formSchema = z.object({
    name: z.string().min(2).max(50),
    duration: z.string(),
    client: z.string(),
});

type Inputs = {
    name: string;
    duration: string;
    client: string;
};

type Props = {
    clients: {
        id: string;
        name: string;
    }[];
};

export default function AddTaskForm({ clients }: Props) {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            duration: "",
        },
    });

    const taskMutation = api.task.create.useMutation({
        onSuccess: () => {
            router.refresh();
            form.reset();

            toast("Success! Task added");
        },
        onError: () => {
            toast(DEFAULT_ERROR_MESSAGE);
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        await taskMutation.mutate(data);
    }

    return (
        <Card>
            <CardHeader>Add Task</CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Task name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Took an 💩"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Description or name of the task
                                        completed
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Duration</FormLabel>
                                    <FormControl>
                                        <Input placeholder="60" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Time taken to complete task
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="client"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Client</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an client" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {clients.map(({ id, name }) => (
                                                <SelectItem key={id} value={id}>
                                                    {name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        You can manage email addresses in your{" "}
                                        <Link href="/examples/forms">
                                            email settings
                                        </Link>
                                        .
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
