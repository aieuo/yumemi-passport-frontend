import { DataType } from "@/types/data";
import clsx from "clsx";

const CheckMark = ({ className }: { className: string }) => (
  <svg
    clipRule="evenodd"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="m2.25 12.321 7.27 6.491c.143.127.321.19.499.19.206 0 .41-.084.559-.249l11.23-12.501c.129-.143.192-.321.192-.5 0-.419-.338-.75-.749-.75-.206 0-.411.084-.559.249l-10.731 11.945-6.711-5.994c-.144-.127-.322-.19-.5-.19-.417 0-.75.336-.75.749 0 .206.084.412.25.56"
      fillRule="nonzero"
    />
  </svg>
);

interface DataTypeSelectorProps {
  types: DataType[];
  selected: DataType;
  onSelected?: (type: DataType) => void;
}

export default function DataTypeSelector({
  types,
  selected,
  onSelected,
}: DataTypeSelectorProps) {
  return (
    <div className="w-40 rounded-md bg-white p-2 shadow-lg">
      {types.map((type) => (
        <div
          key={type}
          className={clsx(
            "relative cursor-pointer rounded-sm p-1 pl-6",
            type === selected && "bg-gray-300",
          )}
          role="button"
          onClick={() => onSelected && onSelected(type)}
        >
          {type === selected && (
            <CheckMark className="absolute top-1/2 left-1 size-4 -translate-y-1/2 transform" />
          )}
          <span className="select-none">{type}</span>
        </div>
      ))}
    </div>
  );
}
