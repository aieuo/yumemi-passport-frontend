"use server";

import { PopulationComposition, Prefecture } from "@/types/data";

const API_ENDPOINT = process.env.API_ENDPOINT || "";
const API_KEY = process.env.API_KEY || "";

export async function fetchPrefectures(): Promise<Prefecture[]> {
  const response = await fetch(`${API_ENDPOINT}/api/v1/prefectures`, {
    headers: {
      "X-API-KEY": API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error("都道府県の取得に失敗しました");
  }

  const body = await response.json();
  if (!body.result) {
    throw new Error("都道府県の取得に失敗しました");
  }

  return body.result;
}

export async function fetchPopulationComposition(
  prefCode: number,
): Promise<PopulationComposition> {
  const response = await fetch(
    `${API_ENDPOINT}/api/v1/population/composition/perYear?prefCode=${prefCode}`,
    {
      headers: {
        "X-API-KEY": API_KEY,
      },
    },
  );

  if (!response.ok) {
    throw new Error("人口データの取得に失敗しました");
  }

  const body = await response.json();
  if (!body.result || !body.result.data) {
    throw new Error("人口データの取得に失敗しました");
  }

  return body.result.data;
}
