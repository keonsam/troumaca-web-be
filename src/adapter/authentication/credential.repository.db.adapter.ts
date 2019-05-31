import validator from "validator";
import libphonenumberjs from "libphonenumber-js";
import PasswordValidator from "password-validator";
import {generateUUID} from "../../uuid.generator";
import {Credential} from "../../data/authentication/credential";
import { credentialConfirmations, credentials, organizations, persons } from "../../db";
import {CredentialRepository} from "../../repository/credential.repository";
import {AuthenticatedCredential} from "../../data/authentication/authenticated.credential";
import {Confirmation} from "../../data/authentication/confirmation";
import {ConfirmationRepositoryNeDbAdapter} from "./confirmation.repository.db.adapter";
import {CreatedCredential} from "../../data/authentication/created.credential";
import {Observable, Observer, of, throwError} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {Person} from "../../data/party/person";
import {ChangePasswordInput} from "../../graphql/authentication/dto/change.password.input";
import { ChangeResponse } from "../../data/authentication/change.response";
import phoneToken from "generate-sms-verification-code";
import { HeaderBaseOptions } from "../../header.base.options";
import { RegisterInput } from "../../graphql/authentication/dto/register.input";

export class CredentialRepositoryNeDbAdapter implements CredentialRepository {

    // private confirmationRepositoryNeDbAdapter: ConfirmationRepositoryNeDbAdapter = new ConfirmationRepositoryNeDbAdapter();

    isValidUsername(username: string, options?: HeaderBaseOptions): Observable<boolean> {
        if (!username) {
            return of(false);
        }

        // the user name is valid if:
        let validUsername: boolean = false;
        // 1. is username and email
        const validEmail: boolean = validator.isEmail(username);

        if (validEmail) {
            validUsername = true;
        } else {
            const parsedObj: any = libphonenumberjs.parse(username, "US");
            if (parsedObj && parsedObj.phone) {
                // 2. or username is a phone number
                validUsername = libphonenumberjs.isValidNumber(parsedObj);
            }
        }

        if (!validUsername) {
            // 3. and is not taken
            return of(false);
        } else {
            return this.getCredentialByUsername(username)
                .pipe(map(credential => {
                    if (!credential) {
                        return true;
                    } else if (options && credential.partyId === options.partyId) {
                        return true;
                    } else {
                        return false;
                    }
                }));
        }
    }

    isValidPassword(password: string, options?: HeaderBaseOptions): Observable<boolean> {
        if (!password) {

            return of(false);

        } else {
            // Create a schema
            const schema: any = new PasswordValidator();

            // Add properties to it
            schema
                .is().min(8)                                    // Minimum length 8
                .is().max(100)                                  // Maximum length 100
                .has().uppercase()                              // Must have uppercase letters
                .has().lowercase()                              // Must have lowercase letters
                .has().digits()                                 // Must have digits
                .has().not().spaces()                           // Should not have spaces
                .is().not().oneOf(["Passw0rd", "Password123"]); // Blacklist these values

            return of(schema.validate(password));
        }

    }

    addCredential(person: Person, register: RegisterInput, options?: HeaderBaseOptions): Observable<CreatedCredential> {
        return this.addCredentialLocal(register)
            .pipe(switchMap(credential => {
                if (!credential) {
                    return throwError("Credential was not created.");
                } else {
                    person.partyId = credential.partyId;
                    return this.addPerson(person, options)
                        .pipe(switchMap(personRes => {
                            if (!personRes) {
                                return throwError("Failed to save Person");
                            } else {
                                const confirmation: Confirmation = new Confirmation();
                                confirmation.credentialId = credential.credentialId;
                                return this.addConfirmation(confirmation)
                                    .pipe(map(confirmation => {
                                        if (!confirmation) {
                                            throw new Error("Confirmation failed to be created.");
                                        } else {
                                            return new CreatedCredential(credential, confirmation);
                                        }
                                    }));
                            }
                        }));
                }
            }));
    }

    authenticate(cred: Credential, options?: HeaderBaseOptions): Observable<AuthenticatedCredential> {
        return this.getCredentialByUsername(cred.username)
            .pipe(switchMap((credential: Credential) => {
                if (!credential) {
                    return throwError("username not found");
                } else if (cred.password !== credential.password) {
                    return throwError("password does not match");
                } else {
                    return of(this.authCred(credential));
                }
            }));
    }

    forgetPassword(username: string, options?: HeaderBaseOptions): Observable<Confirmation> {
        return this.getCredentialByUsername(username)
            .pipe(switchMap(credential => {
                if (!credential) {
                    return throwError(`No credential found. ${credential}`);
                } else {
                    const confirmation: Confirmation = new Confirmation();
                    confirmation.credentialId = credential.credentialId;
                    return this.addConfirmation(confirmation)
                        .pipe(map(confirmation => {
                            if (!confirmation) {
                                throw new Error("Confirmation failed to be created.");
                            } else {
                                return confirmation;
                            }
                        }));
                }
            }));
    }

    changePassword(changePassword: ChangePasswordInput, options?: HeaderBaseOptions): Observable<boolean> {
        return Observable.create(function (observer: Observer<boolean>) {
            const query = {
                "credentialId": changePassword.credentialId
            };

            credentials.update(query, {$set: {password: changePassword.password}}, {}, function (err: any, num: any) {
                if (!err) {
                    observer.next(true);
                } else {
                    observer.error(`Failed to change password ${num}`);
                }
                observer.complete();
            });
        });
    }

    // HELPERS

    private getCredentialByUsername(username: string): Observable<Credential> {
        return Observable.create(function (observer: Observer<Credential>) {
            const query = {
                "username": username
            };

            credentials.findOne(query, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    private addPerson(person: Person, options: HeaderBaseOptions): Observable<Person> {
        person.createdOn = new Date();
        person.modifiedOn = new Date();
        return Observable.create(function (observer: Observer<Person>) {
            persons.insert(person, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    private addConfirmation(confirmation: Confirmation): Observable<Confirmation> {
        confirmation.confirmationId = generateUUID();
        confirmation.code = phoneToken(6, {type: "string"});
        confirmation.status = "New";
        confirmation.createdOn = new Date();
        confirmation.modifiedOn = new Date();
        return Observable.create(function (observer: Observer<Confirmation>) {
            credentialConfirmations.insert(confirmation, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    private addCredentialLocal(registerInput: RegisterInput): Observable<Credential> {
        const credential = new Credential(registerInput.username, registerInput.companyName, registerInput.password);
        credential.credentialId = generateUUID();
        credential.partyId = generateUUID();
        credential.createdOn = new Date();
        credential.modifiedOn = new Date();
        if (!credential.status) {
            credential.status = "New";
        }
        return Observable.create(function (observer: Observer<Credential>) {
            credentials.insert(credential, function (err: any, doc: any) {
                if (!err) {
                    observer.next(credential);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    private authCred(credential: Credential) {
        const authenticatedCredential: AuthenticatedCredential = new AuthenticatedCredential();
        const credentialId = credential.credentialId;
        authenticatedCredential.username = credential.username;
        authenticatedCredential.ownerPartyId = credential.ownerPartyId;
        authenticatedCredential.credentialId = credentialId;
        authenticatedCredential.partyId = credential.partyId;
        authenticatedCredential.authenticateStatus = credential.status === "Active" ? "CredentialActive" : "CredentialConfirmed";
        return authenticatedCredential;
    }
}
