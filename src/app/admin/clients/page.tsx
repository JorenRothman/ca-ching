import { validateRequestPage } from "@/server/auth/validate";
import AddClientForm from "@/app/admin/clients/_components/addClientForm";

export default async function Home() {
    await validateRequestPage();

    return <AddClientForm />;
}
