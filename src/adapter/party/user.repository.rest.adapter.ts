import {UserRepository} from "../../repository/user.repository";
import {User} from "../../data/party/user";
import {Observable} from "rxjs";
import { UserMenu } from "../../data/party/user.menu";
import { UserMe } from "../../data/party/user.me";
import { Credential } from "../../data/authentication/credential";
import { HeaderBaseOptions } from "../../header.base.options";

export class UserRepositoryRestAdapter implements UserRepository {

  getUserMe(options: HeaderBaseOptions): Observable<UserMe> {
    return undefined;
  }

  getUserMenu(options: HeaderBaseOptions): Observable<UserMenu> {
    return undefined;
  }

  updateUserMe(user: User, credential: Credential, options: HeaderBaseOptions): Observable<number> {
    return undefined;
  }
}
