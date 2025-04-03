import clsx from "clsx";
import { HTMLProps } from "react";

const Circle = () => <span className="h-1 w-1 rounded-full bg-gray-700"></span>;

interface MenuButtonProps extends HTMLProps<HTMLDivElement> {
  onClick?: () => void;
}

export default function MenuButton({ className, ...props }: MenuButtonProps) {
  return (
    <div
      className={clsx(
        "flex h-4 w-4 cursor-pointer flex-col items-center gap-0.5",
        className,
      )}
      role="button"
      {...props}
    >
      <Circle></Circle>
      <Circle></Circle>
      <Circle></Circle>
    </div>
  );
}
