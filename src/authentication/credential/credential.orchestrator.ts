import {Credential} from "../../data/authentication/credential";
import {createCredentialRepositoryFactory} from "../../adapter/authentication/credential.repository.factory";
import {CredentialRepository} from "../../repository/credential.repository";
import {Session} from "../../data/session/session";
import {createSessionRepositoryFactory} from "../../adapter/session/session.repository.factory";
import {SessionRepository} from "../../repository/session.repository";
import {AuthenticatedCredential} from "../../data/authentication/authenticated.credential";
import {Observable, of, throwError} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {UserRepository} from "../../repository/user.repository";
import {createUserRepository} from "../../adapter/party/user.repository.factory";
import {Confirmation} from "../../data/authentication/confirmation";
import {PersonRepository} from "../../repository/person.repository";
import {createPersonRepository} from "../../adapter/party/person.repository.factory";
// import {Person} from "../../data/party/person";
import {ChangePasswordInput} from "../../graphql/authentication/dto/change.password.input";
import { HeaderBaseOptions } from "../../header.base.options";
import { RegisterInput } from "../../graphql/authentication/dto/register.input";

export class CredentialOrchestrator {

  private credentialRepository: CredentialRepository;
  private sessionRepository: SessionRepository;
  private userRepository: UserRepository;
  private personRepository: PersonRepository;


  constructor() {
    this.sessionRepository = createSessionRepositoryFactory();
    this.credentialRepository = createCredentialRepositoryFactory();
    this.userRepository = createUserRepository();
    this.personRepository = createPersonRepository();
  }

  isValidUsername(username: string, options?: HeaderBaseOptions): Observable<boolean> {
    return this.credentialRepository.isValidUsername(username, options);
  }

  isValidPassword(password: string, options?: HeaderBaseOptions): Observable<boolean> {
    return this.credentialRepository.isValidPassword(password, options);
  }

  addCredential(register: RegisterInput, options?: HeaderBaseOptions): Observable<Confirmation> {
    return this.credentialRepository.addCredential(register, options);
  }

  authenticate(credential: any, options?: HeaderBaseOptions): Observable<string> {
      return this.credentialRepository.authenticate(credential, options);
  }

  forgetPassword(username: string, options?: HeaderBaseOptions): Observable<Confirmation> {
    return this.credentialRepository.forgetPassword(username, options);
  }
  //
  changePassword(changePassword: ChangePasswordInput, options?: HeaderBaseOptions): Observable<boolean> {
    return this.credentialRepository.changePassword(changePassword, options);
  }
}
