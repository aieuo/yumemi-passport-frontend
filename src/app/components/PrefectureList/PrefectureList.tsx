import { Prefecture } from "@/types/data";
import CheckBox from "../CheckBox/CheckBox";

interface PrefectureListProps {
  prefectures: Prefecture[];
  selectedPrefectureCodes?: number[];
}

export default function PrefectureList({
  prefectures,
  selectedPrefectureCodes = [],
}: PrefectureListProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {prefectures.map((prefecture) => (
        <CheckBox
          label={prefecture.prefName}
          key={prefecture.prefCode}
          checked={selectedPrefectureCodes.includes(prefecture.prefCode)}
        />
      ))}
    </div>
  );
}
