"use client";

import Input from "@/components/ui/input";
import { DEFAULT_ERROR_MESSAGE } from "@/messages";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

type Inputs = {
    name: string;
};

export default function Form() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();

    const mutation = api.client.create.useMutation({
        onSuccess: () => {
            router.refresh();
            reset();

            toast("Success! Client added");
        },
        onError: (error) => {
            if (error.message === "Client already exists") {
                return toast(
                    "You're being a bit of a silly goose; this client is already in our system."
                );
            }

            toast(DEFAULT_ERROR_MESSAGE);
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await mutation.mutate(data);
    };

    return (
        <div onSubmit={handleSubmit(onSubmit)} className="container mx-auto">
            <form className="flex flex-col gap-4 border border-black p-8 pt-6">
                <h1 className="text-2xl mb-4">Add Client</h1>
                <label className="flex flex-col gap-2">
                    Name
                    <Input
                        type="text"
                        {...register("name", { required: true })}
                    />
                    {errors.name && <span>This field is required</span>}
                </label>
                <button className="border border-black py-2" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}
