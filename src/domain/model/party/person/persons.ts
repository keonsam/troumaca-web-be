import { Page } from "../../page/page";
import { Person } from "./person";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class Persons {
    @Field(() => Person)
    persons: Person[] = [];
    @Field({nullable: true})
    page: Page;
    constructor(persons?: Person[], page?: Page) {
        this.persons = persons;
        this.page = page;
    }
}
