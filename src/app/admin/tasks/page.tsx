import TaskForm from "@/app/admin/tasks/_components/addTaskForm";
import { validateRequestPage } from "@/server/auth/validate";
import { redirect } from "next/navigation";
import { api } from "@/trpc/server";
import { DataTable } from "@/app/admin/tasks/_components/data-table";
import { columns } from "@/app/admin/tasks/_components/columns";

export default async function Home() {
    const { user } = await validateRequestPage();

    const clients = await api.client.all();

    const tasks = await api.task.all({
        userID: user.id,
    });

    return (
        <div className="space-y-8">
            <TaskForm clients={clients} />
            <DataTable columns={columns} data={tasks} />
        </div>
    );
}
