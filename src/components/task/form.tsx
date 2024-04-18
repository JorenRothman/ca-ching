"use client";

import Input from "@/components/ui/input";
import { DEFAULT_ERROR_MESSAGE } from "@/messages";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

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

export default function Form({ clients }: Props) {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();

    const taskMutation = api.task.create.useMutation({
        onSuccess: () => {
            router.refresh();
            reset();

            toast("Success! Task added");
        },
        onError: () => {
            toast(DEFAULT_ERROR_MESSAGE);
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await taskMutation.mutate(data);
    };

    return (
        <div onSubmit={handleSubmit(onSubmit)} className="container mx-auto">
            <form className="flex flex-col gap-4 border border-black p-8 pt-6">
                <h1 className="text-2xl mb-4">Complete Task</h1>
                <label className="flex flex-col gap-2">
                    Name
                    <Input
                        type="text"
                        {...register("name", { required: true })}
                    />
                    {errors.name && <span>This field is required</span>}
                </label>
                <label className="flex flex-col gap-2">
                    Duration (in min)
                    <Input
                        type="number"
                        {...register("duration", { required: true })}
                    />
                    {errors.duration && <span>This field is required</span>}
                </label>
                <label className="flex flex-col gap-2">
                    Client
                    <select
                        className="border border-black"
                        {...register("client", { required: true })}
                    >
                        {clients.map(({ id, name }) => (
                            <option value={id} key={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                    {errors.client && <span>This field is required</span>}
                </label>
                <button className="border border-black py-2" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}
