"use client";

import PopulationGraph from "@/components/PopulationGraph/PopulationGraph";
import PrefectureList from "@/components/PrefectureList/PrefectureList";
import { fetchPopulationComposition, fetchPrefectures } from "@/lib/api";
import { PopulationComposition } from "@/types/data";
import { populationListToGraphData } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type PopulationCompositions = Record<number, PopulationComposition>;

export default function Home() {
  const {
    isPending,
    error: prefectureError,
    data: prefectures,
  } = useQuery({
    queryKey: ["prefectures"],
    queryFn: fetchPrefectures,
  });

  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);

  const [populations, setPopulations] = useState<PopulationCompositions>({});

  const handlePrefectureChecked = (code: number, checked: boolean) => {
    if (checked) {
      setSelectedPrefectures((selected) => {
        return Array.from(new Set([...selected, code]));
      });

      // 人口データをAPIから取得していなければ取得する
      (async () => {
        if (!populations[code]) {
          try {
            const population = await fetchPopulationComposition(code);
            setPopulations({
              ...populations,
              [code]: population,
            });
          } catch (e: unknown) {
            if (e instanceof Error) {
              alert(e.message);
            }
            return;
          }
        }
      })();
      return;
    }

    setSelectedPrefectures((selected) => {
      return selected.filter((c) => c !== code);
    });
  };

  if (isPending || !prefectures) {
    return <p className="mt-8 text-center sm:mt-12">読み込み中...</p>;
  }

  if (prefectureError) {
    return (
      <div className="mx-auto mt-8 max-w-[30rem] rounded-md border border-red-300 bg-red-50 p-2 sm:mt-12">
        <p className="text-center">{prefectureError.message}</p>
      </div>
    );
  }

  const graphData = populationListToGraphData(
    populations,
    prefectures,
    selectedPrefectures,
    "総人口",
  );

  return (
    <main>
      <div className="mx-auto mt-8 max-w-[60rem] px-4 sm:mt-12">
        <div>
          <h2 className="text-xl font-bold">都道府県</h2>
          <div className="mt-1">
            <PrefectureList
              prefectures={prefectures}
              selectedPrefectureCodes={selectedPrefectures}
              onChecked={handlePrefectureChecked}
            />
          </div>
        </div>
        <div className="mt-6 sm:mt-10">
          <h2 className="text-xl font-bold">総人口</h2>
          <div className="mt-1 max-w-full overflow-x-auto">
            <div className="aspect-video w-full min-w-[40rem]">
              <PopulationGraph populations={graphData} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
