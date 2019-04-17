import {Sort} from "../../util/sort";
import {Direction} from "../../util/direction";

export class SortGenerator {
  static generate(sort: Sort): any {
    const obj: any = {};
    if (!sort.orders) {
      return obj;
    }

    if (sort.orders.length <= 0) {
      return obj;
    }

    const order = sort.orders[0];

    if (!order.direction) {
      return obj;
    }

    const direction = order.direction;
    let directionNumber = 1;
    if (direction as Direction === Direction.DESC) {
      directionNumber = -1;
    }

    const property = order.property;

    if (property) {
      obj[property] = directionNumber;
    }

    return obj;
  }
}