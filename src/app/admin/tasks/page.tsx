import TaskForm from "@/app/admin/tasks/_components/addTaskForm";
import { validateRequestPage } from "@/server/auth/validate";
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
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-0 sm:py-0 md:gap-8">
            <DataTable columns={columns} data={tasks} clients={clients} />
        </div>
    );
}
