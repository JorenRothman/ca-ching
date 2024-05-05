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
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { createTaskSchema } from "@/shared/schemas/task";
import type { MouseEvent } from "react";

type Props = {
    clients: {
        id: string;
        name: string;
    }[];
};

export default function AddTaskForm({ clients }: Props) {
    const router = useRouter();

    const form = useForm<z.infer<typeof createTaskSchema>>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            name: "",
            duration: 30,
        },
    });

    const taskMutation = api.task.create.useMutation({
        onSuccess: () => {
            router.refresh();
            form.reset();

            toast("Success! Task added");
        },
        onError: (error) => {
            toast(error.message);
        },
    });

    async function onSubmit(data: z.infer<typeof createTaskSchema>) {
        await taskMutation.mutate(data);
    }

    function setQuickTimes(event: MouseEvent<HTMLButtonElement>, time: number) {
        event.preventDefault();
        form.setValue("duration", time);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Add Task</CardTitle>
            </CardHeader>
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
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Operation Thunderclap"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Description or name of the completed
                                        task
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
                                    <FormLabel>Time spent in minutes</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="60"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        <span className="flex flex-wrap mt-4 gap-2">
                                            <Button
                                                onClick={(e) =>
                                                    setQuickTimes(e, 15)
                                                }
                                                variant={"outline"}
                                                size={"sm"}
                                            >
                                                15 Min
                                            </Button>
                                            <Button
                                                onClick={(e) =>
                                                    setQuickTimes(e, 30)
                                                }
                                                variant={"outline"}
                                                size={"sm"}
                                            >
                                                30 Min
                                            </Button>
                                            <Button
                                                onClick={(e) =>
                                                    setQuickTimes(e, 60)
                                                }
                                                variant={"outline"}
                                                size={"sm"}
                                            >
                                                1 Hour
                                            </Button>
                                            <Button
                                                onClick={(e) =>
                                                    setQuickTimes(e, 120)
                                                }
                                                variant={"outline"}
                                                size={"sm"}
                                            >
                                                2 Hours
                                            </Button>
                                        </span>
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
                                        Can&apos;t find a client{" "}
                                        <Link
                                            href="/clients"
                                            className="underline"
                                        >
                                            create one!
                                        </Link>
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
