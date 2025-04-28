import { Film, GridFilterValue, GridFilterSetValues, GridFilterTypeEnum } from '../types';

interface FilmFiltersState {
  name?: string;
  year?: GridFilterValue<number>;
  rate?: GridFilterValue<number>;
  oscars?: GridFilterSetValues<string>;
}

export class FilmFilter {
  private filters: FilmFiltersState = {};

  applySearchValue(value: string) {
    this.filters.name = value;
  }

  applyFiltersValue(filters: Partial<FilmFiltersState>) {
    this.filters = { ...this.filters, ...filters };
  }

  getFilters(): FilmFiltersState {
    return this.filters;
  }

  filterFilms(films: Film[]): Film[] {
    return films.filter(film => {
      const { name, year, rate, oscars } = this.filters;

      const matchesName = !name || film.name.toLowerCase().includes(name.toLowerCase());

      const matchesYear =
        !year ||
        (year.type === GridFilterTypeEnum.RANGE &&
          film.year >= year.filter &&
          (year.filterTo === undefined || film.year <= year.filterTo));

      const matchesRate =
        !rate ||
        (rate.type === GridFilterTypeEnum.RANGE &&
          film.rate >= rate.filter &&
          (rate.filterTo === undefined || film.rate <= rate.filterTo));

      const matchesOscars =
        !oscars ||
        (oscars.type === GridFilterTypeEnum.SET && oscars.values.every(oscar => film.oscars.includes(oscar)));

      return matchesName && matchesYear && matchesRate && matchesOscars;
    });
  }
}
