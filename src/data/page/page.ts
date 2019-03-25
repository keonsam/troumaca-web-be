export class Page {

  number: number;
  size: number;
  items: number;
  totalItems: number;


  constructor(number?: number, size?: number, items?: number, totalItems?: number) {
    this.number = number;
    this.size = size;
    this.items = items;
    this.totalItems = totalItems;
  }

}
