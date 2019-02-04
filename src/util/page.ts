import {Sort} from "./sort";

export class Page<T> {
  content: T;
  number: number;
  size: number;
  total: number;
  sort: Sort;
  constructor(content?: T, number?: number, size?: number, total?: number, sort?: Sort) {
    this.content = content;
    this.number = number;
    this.size = size;
    this.total = total;
    this.sort = sort;
  }
}