import { PopulationGraphData } from "@/components/PopulationGraph/PopulationGraph";
import { PopulationComposition, Prefecture } from "@/types/data";

export function populationListToGraphData(
  populations: Record<number, PopulationComposition>,
  prefectures: Prefecture[],
  selectedPrefectures: number[],
  dataType: string,
): PopulationGraphData[] {
  const prefectureCodeToName: Record<number, string> = {};
  for (const prefecture of prefectures) {
    prefectureCodeToName[prefecture.prefCode] = prefecture.prefName;
  }

  const result: PopulationGraphData[] = [];
  for (const code of selectedPrefectures) {
    if (!populations[code]) {
      continue;
    }

    for (const data of populations[code]) {
      if (data.label === dataType) {
        result.push({
          name: prefectureCodeToName[code],
          data: data.data,
        });
      }
    }
  }
  return result;
}
