import {UserRepository} from "../../repository/user.repository";
import {User} from "../../data/party/user";
import {Person} from "../../data/party/person";
import {Observable} from "rxjs";
import { UserMenu } from "../../data/party/user.menu";
import { UserMe } from "../../data/party/user.me";
import { Credential } from "../../data/authentication/credential";

export class UserRepositoryRestAdapter implements UserRepository {

  findUser(searchStr: string, pageSize: number, options: any): Observable<User[]> {
    return undefined;
  }

  deleteUser(partyId: string, options: any): Observable<number> {
    return undefined;
  }

  getUser(partyId: string, options?: any): Observable<User> {
    return undefined;
  }

  getPerson(partyId: string, options: any): Observable<Person> {
    return undefined;
  }

  getUserCount(options: any): Observable<number> {
    return undefined;
  }

  getUsers(pageNumber: number, pageSize: number, order: string, options: any): Observable<User[]> {
    return undefined;
  }

  saveUser(person: Person,  credential: Credential, partyAccessRoles: string[], options: any): Observable<User> {
    return undefined;
  }

  updateUser(partyId: string, user: User, credential: Credential, partyAccessRoles: string[], options: any): Observable<number> {
    return undefined;
  }

  getUserMe(options: any): Observable<UserMe> {
    return undefined;
  }

  getUserMenu(options: any): Observable<UserMenu> {
    return undefined;
  }

  updateUserMe(user: User, credential: Credential, options: any): Observable<number> {
    return undefined;
  }
}
