import Item from "@/components/task/item";
import { api } from "@/trpc/server";

export default async function Overview() {
    const tasks = await api.task.all();

    return (
        <main className="py-12">
            <div className="container mx-auto">
                <h1 className="text-2xl mb-4">Completed Tasks</h1>
                <div className="grid grid-cols-3 gap-8">
                    {tasks.map(({ id, ...rest }) => {
                        return <Item key={id} id={id} {...rest} />;
                    })}
                </div>
            </div>
        </main>
    );
}
