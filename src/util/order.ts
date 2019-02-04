import {Direction} from "./direction";

export class Order {
  direction: Direction;
  property: string;
  constructor(direction?: Direction, property?: string) {
    this.direction = direction;
    this.property = property;
  }
}