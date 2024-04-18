import { cn } from "@/utils/classname";

interface Props extends React.ComponentPropsWithoutRef<"input"> {}

export default function Input({ className, ...rest }: Props) {
    return (
        <input
            className={cn("border border-black px-4 py-2", className)}
            {...rest}
        />
    );
}
