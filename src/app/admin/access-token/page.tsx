import GenerateForm from "@/app/admin/access-token/_components/GenerateForm";
import { columns } from "@/app/admin/access-token/_components/columns";
import { DataTable } from "@/app/admin/access-token/_components/data-table";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { validateRequestPage } from "@/server/auth/validate";
import { api } from "@/trpc/server";

export default async function Page() {
    const { user } = await validateRequestPage();

    const accessTokens = await api.accessToken.all({ userID: user.id });

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Access Tokens</CardTitle>
                    <CardDescription>
                        Access Tokens can be used to send remote requests
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <DataTable columns={columns} data={accessTokens} />

                    <GenerateForm />
                </CardContent>
            </Card>
        </div>
    );
}
