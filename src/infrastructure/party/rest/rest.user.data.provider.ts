import {UserDataProvider} from "../../../port/user.data.provider";
import {User} from "../../../domain/model/party/user";
import {Observable} from "rxjs";
import { UserMenu } from "../../../domain/model/party/user.menu";
import { UserMe } from "../../../domain/model/party/user.me";
import { Credential } from "../../../domain/model/authentication/credential";
import { HeaderBaseOptions } from "../../../header.base.options";

export class RestUserDataProvider implements UserDataProvider {

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
