import {User} from "../domain/model/party/user";
import {Observable} from "rxjs";
import { UserMenu } from "../domain/model/party/user.menu";
import { UserMe } from "../domain/model/party/user.me";
import { Credential } from "../domain/model/authentication/credential";
import { HeaderBaseOptions } from "../header.base.options";

export interface UserDataProvider {

  getUserMe(options: HeaderBaseOptions): Observable<UserMe>;

  getUserMenu(options: HeaderBaseOptions): Observable<UserMenu>;

  updateUserMe(user: User, credential: Credential, options: HeaderBaseOptions): Observable<number>;

}
