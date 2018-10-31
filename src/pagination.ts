export class Pagination {

  constructor(page: number, sort: string) {
    this.page = page;
    this.sort = sort;
  }

  private _page: number;

  get page(): number {
    return this._page;
  }

  set page(value: number) {
    this._page = value;
  }

  private _sort: string;

  get sort(): string {
    return this._sort;
  }

  set sort(value: string) {
    this._sort = value;
  }
}