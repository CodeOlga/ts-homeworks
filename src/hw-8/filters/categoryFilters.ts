import { Category } from '../types';

interface CategoryFilterState {
  name?: string;
}

export class CategoryFilter {
  private filter: CategoryFilterState = {};

  applySearchValue(value: string) {
    this.filter.name = value;
  }

  getFilters(): CategoryFilterState {
    return this.filter;
  }

  filterCategories(categories: Category[]): Category[] {
    const { name } = this.filter;

    if (!name) return categories;

    return categories.filter(category => category.name.toLowerCase().includes(name.toLowerCase()));
  }
}
