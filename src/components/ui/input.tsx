import { cn } from "@/utils/classname";
import { forwardRef } from "react";

interface Props extends React.ComponentPropsWithRef<"input"> {}

const Input = forwardRef<HTMLInputElement, Props>(function Input(
    { className, ...rest },
    ref
) {
    return (
        <input
            ref={ref}
            className={cn("border border-black px-4 py-2", className)}
            {...rest}
        />
    );
});

export default Input;
