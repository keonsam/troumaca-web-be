import {createUserRepository} from "../../adapter/party/user.repository.factory";
import {UserRepository} from "../../repository/user.repository";
import {User} from "../../data/party/user";
import {Observable} from "rxjs";
import {map, flatMap} from "rxjs/operators";
import {shapeUsersResponse} from "./user.response.shaper";
import {Result} from "../../result.success";
import {Credential} from "../../data/authentication/credential";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {Person} from "../../data/party/person";
import { UserMenu } from "../../data/party/user.menu";
import { UserMe } from "../../data/party/user.me";

export class UserOrchestrator {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = createUserRepository();
    }


    findUser(searchStr: string, pageSize: number, options: any): Observable<User[]> {
        return this.userRepository.findUser(searchStr, pageSize, options);
    }

    getUsers(number: number, size: number, field: string, direction: string, options: any): Observable<Result<any>> {
        const sort = getSortOrderOrDefault(field, direction);
        return this.userRepository.getUsers(number, size, sort, options)
            .pipe(flatMap(value => {
                return this.userRepository
                    .getUserCount(options)
                    .pipe(map(count => {
                        const shapeUsersResp: any = shapeUsersResponse(value, number, size, value.length, count, sort);
                        return new Result<any>(false, "users", shapeUsersResp);
                    }));
            }));
    }

    getUser(partyId: any, options: any): Observable<User> {
        return this.userRepository.getUser(partyId, options);
    }

    saveUser(person: Person, credential: Credential, partyAccessRoles: string[], options: any): Observable<User> {
        return this.userRepository.saveUser(person, credential, partyAccessRoles, options);
    }

    updateUser(partyId: string, user: User, credential: Credential, partyAccessRoles: string[], options: any): Observable<number> {
        return this.userRepository.updateUser(partyId, user, credential, partyAccessRoles, options);
    }

    deleteUser(partyId: string, options: any): Observable<number> {
        return this.userRepository.deleteUser(partyId, options);
    }

    getUserMe(options: any): Observable<UserMe> {
        return this.userRepository.getUserMe(options);
    }

    updateUserMe( user: User, credential: Credential, options: any): Observable<number> {
        delete user.username;
        return this.userRepository.updateUserMe(user, credential, options);
    }

    getUserMenu(options: any): Observable<UserMenu> {
        return this.userRepository.getUserMenu(options);
    }
}
