import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { validateRequestPage } from "@/server/auth/validate";
import { api } from "@/trpc/server";
import Link from "next/link";

export default async function Page() {
    const { user } = await validateRequestPage();

    const tasks = await api.task.all({
        userID: user.id,
    });

    const minutesTracked = tasks.reduce(
        (prev, current) => prev + Number.parseInt(current.duration),
        0
    );

    return (
        <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="">Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-6">
                        <p className="text-2xl flex gap-3 leading-none flex-col">
                            {tasks.length}{" "}
                            <span className="text-sm text-muted-foreground">
                                Tasks completed
                            </span>
                        </p>

                        <p className="text-2xl flex gap-3 leading-none flex-col">
                            {minutesTracked}{" "}
                            <span className="text-sm text-muted-foreground">
                                Minutes Tracked
                            </span>
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="flex gap-4 flex-wrap">
                        <Button size={"lg"} variant="secondary" asChild>
                            <Link href="/admin/tasks">Complete Task</Link>
                        </Button>
                        <Button size={"lg"} variant="secondary" asChild>
                            <Link href="/admin/tasks">View Tasks</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
