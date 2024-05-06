import { validateRequestPage } from "@/server/auth/validate";
import AddClientForm from "@/app/admin/clients/_components/addClientForm";
import { DataTable } from "@/app/admin/clients/_components/data-table";
import { columns } from "@/app/admin/clients/_components/columns";
import { api } from "@/trpc/server";

export default async function Home() {
    await validateRequestPage();

    const clients = await api.client.all();

    return (
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-0 sm:py-0 md:gap-8">
            <DataTable columns={columns} data={clients} />
        </div>
    );
}
