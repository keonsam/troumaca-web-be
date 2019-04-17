import {User} from "../data/party/user";
import {Observable} from "rxjs";
import { UserMenu } from "../data/party/user.menu";
import { UserMe } from "../data/party/user.me";
import { Credential } from "../data/authentication/credential";
import { HeaderBaseOptions } from "../header.base.options";

export interface UserRepository {

  getUserMe(options: HeaderBaseOptions): Observable<UserMe>;

  getUserMenu(options: HeaderBaseOptions): Observable<UserMenu>;

  updateUserMe(user: User, credential: Credential, options: HeaderBaseOptions): Observable<number>;

}
