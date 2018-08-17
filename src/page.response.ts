export class PageResponse<T> {

  private _items: T;
  private _pageNumber: number;
  private _pageSize: number;
  private _totalPageItems: number;
  private _sortOrder: string;


  constructor(items?: T, pageNumber?: number, pageSize?: number, totalPageItems?: number, sortOrder?: string) {
    this._items = items;
    this._pageNumber = pageNumber;
    this._pageSize = pageSize;
    this._totalPageItems = totalPageItems;
    this._sortOrder = sortOrder;
  }

  get items(): T {
    return this._items;
  }

  set items(value: T) {
    this._items = value;
  }

  get pageNumber(): number {
    return this._pageNumber;
  }

  set pageNumber(value: number) {
    this._pageNumber = value;
  }

  get pageSize(): number {
    return this._pageSize;
  }

  set pageSize(value: number) {
    this._pageSize = value;
  }

  get totalPageItems(): number {
    return this._totalPageItems;
  }

  set totalPageItems(value: number) {
    this._totalPageItems = value;
  }

  get sortOrder(): string {
    return this._sortOrder;
  }

  set sortOrder(value: string) {
    this._sortOrder = value;
  }
}