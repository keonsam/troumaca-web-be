import {User} from "../data/party/user";
import {Person} from "../data/party/person";
import {Observable} from "rxjs";
import { UserMenu } from "../data/party/user.menu";
import { UserMe } from "../data/party/user.me";
import { Credential } from "../data/authentication/credential";

export interface UserRepository {

  findUser(searchStr: string, pageSize: number, options: any): Observable<User[]>;

  getUsers(pageNumber: number, pageSize: number, order: string, options: any): Observable<User[]>;

  getUserCount(options: any): Observable<number>;

  getUser(partyId: string, options?: any): Observable<User>;

  getPerson(partyId: string, options: any): Observable<Person>;

  saveUser(person: Person, credential: Credential, partyAccessRoles: string[], options: any): Observable<User>;

  deleteUser(partyId: string, options: any): Observable<number>;

  updateUser(partyId: string, user: User, credential: Credential, partyAccessRoles: string[], options: any): Observable<number>;

  getUserMe(options: any): Observable<UserMe>;

  getUserMenu(options: any): Observable<UserMenu>;

  updateUserMe(user: User, credential: Credential, options: any): Observable<number>;

}
