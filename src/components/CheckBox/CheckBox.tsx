import clsx from "clsx";

interface CheckBoxProps {
  label: string;
  checked: boolean;
  onChecked?: (checked: boolean) => void;
  disabled?: boolean;
}

export default function CheckBox({
  label,
  checked,
  onChecked,
  disabled = false,
}: CheckBoxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-1">
      <input
        type="checkbox"
        className={
          "h-4 w-4 cursor-pointer rounded-md border-gray-300 bg-gray-100 disabled:pointer-events-none"
        }
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChecked && onChecked(e.target.checked)}
      />
      <span
        className={clsx("text-gray-900", {
          "opacity-50": disabled,
        })}
      >
        {label}
      </span>
    </label>
  );
}
