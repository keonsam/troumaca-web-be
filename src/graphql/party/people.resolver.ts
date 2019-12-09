import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { HeaderBaseOptions } from "../../header.base.options";
import { ApolloError } from "apollo-server-errors";
import { ERROR_CODE } from "../error.code";
import {PersonOrchestrator} from "../../party/person/person.orchestrator";
import {Persons} from "../../data/party/persons";

@Resolver()
export class PeopleResolver {
    private personOrchestrator: PersonOrchestrator = new PersonOrchestrator();

    @Query( () => Persons)
    async findPersons(@Arg("searchStr", { nullable: true }) searchStr?: string,
                                  @Ctx("req") req?: any): Promise<Persons> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.personOrchestrator.findPeople(searchStr, headerOptions)
            .toPromise()
            .then(res => {
                return new Persons(res);
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

}