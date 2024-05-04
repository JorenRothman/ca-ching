import Link from "next/link";

export default function Page() {
    return (
        <div className="flex flex-col gap-4 p-8 underline">
            <Link href={"/admin"}>admin</Link>
            <Link href={"/login"}>login</Link>
        </div>
    );
}
