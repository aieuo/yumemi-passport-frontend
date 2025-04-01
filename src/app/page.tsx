"use client";

import PopulationGraph, {
  PopulationGraphData,
} from "@/components/PopulationGraph/PopulationGraph";
import PrefectureList from "@/components/PrefectureList/PrefectureList";
import { Prefecture } from "@/types/data";
import { useState } from "react";

export default function Home() {
  const prefectures = [
    { prefCode: 1, prefName: "北海道" },
    { prefCode: 2, prefName: "青森県" },
    { prefCode: 3, prefName: "岩手県" },
    { prefCode: 4, prefName: "宮城県" },
    { prefCode: 5, prefName: "秋田県" },
  ] as Prefecture[];
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
