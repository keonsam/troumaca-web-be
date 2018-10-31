import {UserRepository} from "../../repository/user.repository";
import {User} from "../../data/party/user";
import {Person} from "../../data/party/person";
import {Observable} from "rxjs";

export class UserRepositoryRestAdapter implements UserRepository {

  findUser(searchStr: string, pageSize: number): Observable<User[]> {
    return undefined;
  }

  deleteUser(partyId: string): Observable<number> {
    return undefined;
  }

  getUser(partyId: string): Observable<User> {
    return undefined;
  }

  getPerson(partyId: string): Observable<Person> {
    return undefined;
  }

  getUserCount(): Observable<number> {
    return undefined;
  }

  getUsers(pageNumber: number, pageSize: number, order: string): Observable<User[]> {
    return undefined;
  }

  saveUser(person: Person): Observable<User> {
    return undefined;
  }

  updateUser(partyId: string, user: User): Observable<number> {
    return undefined;
  }
}