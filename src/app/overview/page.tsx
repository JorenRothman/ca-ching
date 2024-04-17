import { api } from "@/trpc/server";

export default async function Overview() {
    const tasks = await api.task.all();

    return (
        <main className="py-12">
            <div className="container mx-auto">
                <h1 className="text-2xl mb-4">Completed Tasks</h1>
                <div className="grid grid-cols-3 gap-8">
                    {tasks.map(({ id, title, duration, client, date }) => {
                        return (
                            <div key={id} className="border border-black p-4">
                                {title} - {duration} minutes -{" "}
                                {client && `client ${client.name}`}
                                <p>On: {date.toISOString()}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
