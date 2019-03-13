import {Sort} from "../../util/sort";
import {Direction} from "../../util/direction";

export class SortGenerator {
  static generate(sort: Sort): any {
    let obj:any = {};
    if (!sort.orders) {
      return obj;
    }

    if (sort.orders.length <= 0) {
      return obj;
    }

    let order = sort.orders[0];

    if (!order.direction) {
      return obj
    }

    let direction = order.direction;
    let directionNumber = 1;
    if (direction as Direction === Direction.DESC) {
      directionNumber = -1;
    }

    let property = order.property;

    if (property) {
      obj[property] = directionNumber
    }

    return obj;
  }
}