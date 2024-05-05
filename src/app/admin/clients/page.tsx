import { validateRequestPage } from "@/server/auth/validate";
import AddClientForm from "@/app/admin/clients/_components/addClientForm";
import { DataTable } from "@/app/admin/clients/_components/data-table";
import { columns } from "@/app/admin/clients/_components/columns";
import { api } from "@/trpc/server";

export default async function Home() {
    await validateRequestPage();

    const clients = await api.client.all();

    return (
        <div className="space-y-8">
            <AddClientForm />
            <DataTable columns={columns} data={clients} />
        </div>
    );
}
