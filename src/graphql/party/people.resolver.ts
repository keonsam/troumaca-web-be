import {Arg, Ctx, Query, Resolver, UseMiddleware} from "type-graphql";
import { HeaderBaseOptions } from "../../header.base.options";
import { ApolloError } from "apollo-server-errors";
import { ERROR_CODE } from "../error.code";
import {PersonOrchestrator} from "../../party/person/person.orchestrator";
import {Persons} from "../../data/party/persons";
import {Person} from "../../data/party/person";
import {isAuth} from "../../middleware/isAuth";
import {UpdateMeInput} from "./dto/update.me.input";
import {UserInput} from "./dto/user.input";
import {Credential} from "../../data/authentication/credential";

@Resolver()
export class PeopleResolver {
    private personOrchestrator: PersonOrchestrator = new PersonOrchestrator();

    @UseMiddleware(isAuth)
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

    @UseMiddleware(isAuth)
    @Query( () => Person)
    async getMe( @Ctx("req") req?: any): Promise<Person> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.personOrchestrator.getPerson(headerOptions.partyId, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @UseMiddleware(isAuth)
    @Query( () => Boolean)
    async updateMe(@Arg("me", () => UpdateMeInput) me: UpdateMeInput,
        @Ctx("req") req?: any
    ): Promise<boolean> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        const person: Person = new Person();
        Object.assign(person, me);
        return await this.personOrchestrator.updatePersonMe(headerOptions.partyId, person, headerOptions)
            .toPromise()
            .then(res => {
                return !!res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @UseMiddleware(isAuth)
    @Query( () => Person)
    async getUser(
        @Arg("partyId") partyId: string,
        @Ctx("req") req?: any
    ): Promise<Person> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.personOrchestrator.getPerson(partyId, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @UseMiddleware(isAuth)
    @Query( () => Person)
    async addUser(
        @Arg("user", () => Person) user: UserInput,
        @Ctx("req") req?: any
    ): Promise<Person> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        const person: Person = new Person();
        Object.assign(person, user);
        return await this.personOrchestrator.savePerson(person, new Credential(), [], headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @UseMiddleware(isAuth)
    @Query( () => Boolean)
    async updateUser(
        @Arg("partyId") partyId: string,
        @Arg("user", () => Person) user: UserInput,
        @Ctx("req") req?: any
    ): Promise<boolean> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        const person: Person = new Person();
        Object.assign(person, user);
        return await this.personOrchestrator.updatePerson(partyId, person, new Credential(), [], headerOptions)
            .toPromise()
            .then(res => {
                return !!res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @UseMiddleware(isAuth)
    @Query( () => Boolean)
    async deleteUser(
        @Arg("partyId") partyId: string,
        @Ctx("req") req?: any
    ): Promise<boolean> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.personOrchestrator.deletePerson(partyId, headerOptions)
            .toPromise()
            .then(res => {
                return !!res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }
}
