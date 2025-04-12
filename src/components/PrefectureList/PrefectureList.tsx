import { Prefecture } from "@/types/data";
import CheckBox from "../CheckBox/CheckBox";

interface PrefectureListProps {
  prefectures: Prefecture[];
  selectedPrefectureCodes?: number[];
  onChecked?: (code: number, checked: boolean) => void;
}

export default function PrefectureList({
  prefectures,
  selectedPrefectureCodes = [],
  onChecked,
}: PrefectureListProps) {
  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(6rem, 1fr))",
      }}
    >
      {prefectures.map((prefecture) => (
        <CheckBox
          label={prefecture.prefName}
          key={prefecture.prefCode}
          checked={selectedPrefectureCodes.includes(prefecture.prefCode)}
          onChecked={(checked) =>
            onChecked && onChecked(prefecture.prefCode, checked)
          }
        />
      ))}
    </div>
  );
}
