import TaskForm from "@/components/task/form";
import ClientForm from "@/components/client/form";
import { validateRequest } from "@/server/auth/validate";
import { redirect } from "next/navigation";
import { api } from "@/trpc/server";

export default async function Home() {
    const { user } = await validateRequest();

    if (!user) {
        redirect("/login");
    }

    const clients = await api.client.all();

    return <TaskForm clients={clients} />;
}