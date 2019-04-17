import { Page } from "../page/page";
import { Person } from "./person";

export class Persons {
    constructor(persons: Person[], page: Page) {
        this.persons = persons;
        this.page = page;
    }

    persons: Person[] = [];
    page: Page;
}
