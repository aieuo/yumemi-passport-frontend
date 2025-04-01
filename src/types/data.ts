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
