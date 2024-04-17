"use client";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    name: string;
    duration: string;
    client: string;
};

export default function Form() {
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
                    <input
                        className="border border-black"
                        type="text"
                        {...register("name", { required: true })}
                    />
                    {errors.name && <span>This field is required</span>}
                </label>
                <label className="flex flex-col gap-2">
                    Duration (in min)
                    <input
                        className="border border-black"
                        type="number"
                        {...register("duration", { required: true })}
                    />
                    {errors.duration && <span>This field is required</span>}
                </label>
                <label className="flex flex-col gap-2">
                    Client
                    <input
                        className="border border-black"
                        type="text"
                        {...register("client", { required: true })}
                    />
                    {errors.client && <span>This field is required</span>}
                </label>
                <button className="border border-black py-2" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}
