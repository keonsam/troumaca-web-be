import {createUserRepository} from "../../../infrastructure/party/user.data.provider.factory";
import {UserDataProvider} from "../../../port/user.data.provider";
import {User} from "../../../domain/model/party/user";
import {Observable} from "rxjs";
import {Credential} from "../../../domain/model/authentication/credential";
import { UserMenu } from "../../../domain/model/party/user.menu";
import { UserMe } from "../../../domain/model/party/user.me";
import { HeaderBaseOptions } from "../../../header.base.options";

export class UserOrchestrator {

    private userRepository: UserDataProvider;

    constructor() {
        this.userRepository = createUserRepository();
    }

    getUserMe(options: HeaderBaseOptions): Observable<UserMe> {
        return this.userRepository.getUserMe(options);
    }

    updateUserMe(user: User, credential: Credential, options: HeaderBaseOptions): Observable<number> {
        return this.userRepository.updateUserMe(user, credential, options);
    }

    getUserMenu(options: HeaderBaseOptions): Observable<UserMenu> {
        return this.userRepository.getUserMenu(options);
    }
}
