export class Pagination {

  private _page: number;
  private _sort: string;

  constructor(page: number, sort: string) {
    this.page = page;
    this.sort = sort;
  }

  get page(): number {
    return this._page;
  }

  set page(value: number) {
    this._page = value;
  }

  get sort(): string {
    return this._sort;
  }

  set sort(value: string) {
    this._sort = value;
  }
}