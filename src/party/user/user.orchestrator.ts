import {createUserRepository} from "../../adapter/party/user.repository.factory";
import {UserRepository} from "../../repository/user.repository";
import {User} from "../../data/party/user";
import {Observable} from "rxjs";
import {Credential} from "../../data/authentication/credential";
import { UserMenu } from "../../data/party/user.menu";
import { UserMe } from "../../data/party/user.me";
import { HeaderBaseOptions } from "../../header.base.options";

export class UserOrchestrator {

    private userRepository: UserRepository;

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
