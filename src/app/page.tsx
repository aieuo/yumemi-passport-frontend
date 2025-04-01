"use client";

import PopulationGraph, {
  PopulationGraphData,
} from "@/components/PopulationGraph/PopulationGraph";
import PrefectureList from "@/components/PrefectureList/PrefectureList";
import { fetchPrefectures } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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

  const populations = [
    {
      name: "東京",
      data: [
        { year: 1980, population: Math.floor(Math.random() * 1000) },
        { year: 1990, population: Math.floor(Math.random() * 1000) },
        { year: 2000, population: Math.floor(Math.random() * 1000) },
        { year: 2010, population: Math.floor(Math.random() * 1000) },
        { year: 2020, population: Math.floor(Math.random() * 1000) },
      ],
    },
  ] as PopulationGraphData[];

  const handlePrefectureChecked = (code: number, checked: boolean) => {
    setSelectedPrefectures((selected) => {
      if (checked) {
        selected.push(code);
        return Array.from(new Set(selected));
      }

      return selected.filter((c) => c !== code);
    });
  };

  if (isPending) {
    return <p className="mt-8 text-center sm:mt-12">読み込み中...</p>;
  }

  if (prefectureError) {
    return (
      <div className="mx-auto mt-8 max-w-[30rem] rounded-md border border-red-300 bg-red-50 p-2 sm:mt-12">
        <p className="text-center">{prefectureError.message}</p>
      </div>
    );
  }

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
              <PopulationGraph populations={populations} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
