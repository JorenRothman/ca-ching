import { api } from "@/trpc/server";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { validateRequest } from "@/server/auth/validate";
import { redirect } from "next/navigation";

export default async function Page() {
    const { user } = await validateRequest();

    if (!user) {
        redirect("/login");
    }

    const tasks = await api.task.all({
        userID: user.id,
    });

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={tasks} />
        </div>
    );
}

// import Item from "@/components/task/item";
// import { validateRequest } from "@/server/auth/validate";
// import { api } from "@/trpc/server";
// import { redirect } from "next/navigation";

// export default async function Overview() {
//     const { user } = await validateRequest();

//     if (!user) {
//         redirect("/login");
//     }

//     const tasks = await api.task.all();

//     return (
//         <main className="py-12">
//             <div className="container mx-auto">
//                 <h1 className="text-2xl mb-4">Completed Tasks</h1>
//                 <div className="grid grid-cols-3 gap-8">
//                     {tasks.map(({ id, ...rest }) => {
//                         return <Item key={id} id={id} {...rest} />;
//                     })}
//                 </div>
//             </div>
//         </main>
//     );
// }
