import {Order} from "./order";

export class Sort {
  orders: Array<Order> = new Array<Order>();
  constructor(orders?: Array<Order>) {
    if (orders) {
      this.orders = orders;
    }
  }

  add(order: Order): Sort {
    this.orders.push(order);
    return this;
  }
}