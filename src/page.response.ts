export class PageResponse<T> {

  constructor(items?: T, pageNumber?: number, pageSize?: number, totalPageItems?: number, sortOrder?: string) {
    this._items = items;
    this._pageNumber = pageNumber;
    this._pageSize = pageSize;
    this._totalPageItems = totalPageItems;
    this._sortOrder = sortOrder;
  }

  private _items: T;

  get items(): T {
    return this._items;
  }

  set items(value: T) {
    this._items = value;
  }

  private _pageNumber: number;

  get pageNumber(): number {
    return this._pageNumber;
  }

  set pageNumber(value: number) {
    this._pageNumber = value;
  }

  private _pageSize: number;

  get pageSize(): number {
    return this._pageSize;
  }

  set pageSize(value: number) {
    this._pageSize = value;
  }

  private _totalPageItems: number;

  get totalPageItems(): number {
    return this._totalPageItems;
  }

  set totalPageItems(value: number) {
    this._totalPageItems = value;
  }

  private _sortOrder: string;

  get sortOrder(): string {
    return this._sortOrder;
  }

  set sortOrder(value: string) {
    this._sortOrder = value;
  }
}