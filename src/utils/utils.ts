import { PopulationGraphData } from "@/components/PopulationGraph/PopulationGraph";
import { PopulationComposition, Prefecture } from "@/types/data";

export function populationListToGraphData(
  populations: Record<number, PopulationComposition>,
  prefectures: Prefecture[],
  selectedPrefectures: number[],
  dataType: string,
): PopulationGraphData[] {
  const prefectureCodeToObject: Record<number, Prefecture> = {};
  for (const prefecture of prefectures) {
    prefectureCodeToObject[prefecture.prefCode] = prefecture;
  }

  const result: PopulationGraphData[] = [];
  for (const code of selectedPrefectures) {
    if (!populations[code]) {
      continue;
    }

    for (const data of populations[code]) {
      if (data.label === dataType) {
        result.push({
          prefecture: prefectureCodeToObject[code],
          data: data.data,
        });
      }
    }
  }
  return result.toSorted(
    (a, b) => a.prefecture.prefCode - b.prefecture.prefCode,
  );
}
