export interface Film {
  name: string;
  year: number;
  rate: number;
  oscars: string[];
}

export interface Category {
  name: string;
  films: Film[];
}

export enum GridFilterTypeEnum {
  EQUALS = 'EQUALS',
  RANGE = 'RANGE',
  SET = 'SET',
}

export type GridFilterValue<T> = {
  type: GridFilterTypeEnum.RANGE | GridFilterTypeEnum.EQUALS;
  filter: Extract<T, string | number>;
  filterTo?: Extract<T, string | number>;
};

export type GridFilterSetValues<T> = {
  type: GridFilterTypeEnum.SET;
  values: T[];
};
