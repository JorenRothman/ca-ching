import { validateRequest, validateRequestPage } from "@/server/auth/validate";
import { redirect } from "next/navigation";
import AddClientForm from "@/app/admin/clients/_components/addClientForm";

export default async function Home() {
    await validateRequestPage();

    return <AddClientForm />;
}
