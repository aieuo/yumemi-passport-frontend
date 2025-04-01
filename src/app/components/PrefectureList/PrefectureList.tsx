import CheckBox from "@/app/components/CheckBox/CheckBox";
import { Prefecture } from "@/types/data";

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
