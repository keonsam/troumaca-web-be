import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class Page {
  @Field({nullable:true})
  number: number;
  @Field({nullable:true})
  size: number;
  @Field({nullable:true})
  items: number;
  @Field({nullable:true})
  totalItems: number;


  constructor(number?: number, size?: number, items?: number, totalItems?: number) {
    this.number = number;
    this.size = size;
    this.items = items;
    this.totalItems = totalItems;
  }

}
