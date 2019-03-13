import {Sort} from "./sort";

export class PageRequest {
  page: number;
  size: number;
  sort: Sort;
  constructor(page?: number, size?: number, sort?: Sort) {
    this.page = page;
    this.size = size;
    this.sort = sort;
  }
}