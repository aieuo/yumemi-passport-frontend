export interface Population {
  year: number;
  value: number;
}

export interface Prefecture {
  prefCode: number;
  prefName: string;
}

export type PopulationComposition = {
  label: string;
  data: Population[];
}[];

export type DataType = "総人口" | "年少人口" | "生産年齢人口" | "老年人口";
