import {Credential} from "../data/authentication/credential";
import {AuthenticatedCredential} from "../data/authentication/authenticated.credential";
import {CreatedCredential} from "../data/authentication/created.credential";
import {Observable} from "rxjs";
import { Confirmation } from "../data/authentication/confirmation";

export interface CredentialRepository {

    isValidUsername(username: string, partyId: string): Observable<boolean>;

    isValidPassword(password: string): Observable<boolean>;

    addCredential(credential: Credential, options?: any): Observable<CreatedCredential>;

    authenticate(credential: Credential, options: any): Observable<AuthenticatedCredential>;

    forgetPassword(credential: Credential, options: any): Observable<Confirmation>;

    updateCredential(partyId: string, credential: Credential): Observable<number>;

    // USED BY OTHER REPOS

    updateCredentialStatusByPartyId(partyId: string, status: string): Observable<number>;

    deleteCredentialByPartyId(partyId: string): Observable<number>;

}
