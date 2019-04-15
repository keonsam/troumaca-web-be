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
import {ChangePassword} from "../../data/authentication/change.password";
import { ChangeResponse } from "../../data/authentication/change.response";
import phoneToken from "generate-sms-verification-code";
import { HeaderBaseOptions } from "../../header.base.options";

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

    addCredential(person: Person, credential: Credential, options?: HeaderBaseOptions): Observable<CreatedCredential> {
        return this.addCredentialLocal(credential)
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

    private addCredentialLocal(credential: Credential): Observable<Credential> {
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

    // forgetPassword(credential: Credential, options?: HeaderBaseOptions): Observable<Confirmation> {
    //     return this.getCredentialByUsername(credential.username)
    //         .pipe(switchMap(credential => {
    //             if (!credential) {
    //                 return throwError(`No credential found. ${credential}`);
    //             } else {
    //                 const confirmation: Confirmation = new Confirmation();
    //                 confirmation.credentialId = credential.credentialId;
    //                 return this.confirmationRepositoryNeDbAdapter.addConfirmation(confirmation)
    //                     .pipe(map(confirmation => {
    //                         if (!confirmation) {
    //                             throw new Error("Confirmation failed to be created.");
    //                         } else {
    //                             return confirmation;
    //                         }
    //                     }));
    //             }
    //         }));
    // }
    //
    // changePassword(changePassword: ChangePassword, options?: HeaderBaseOptions): Observable<ChangeResponse> {
    //     return this.changePasswordLocal(changePassword)
    //         .pipe(map(num => {
    //             if (!num) {
    //                 throw new Error(`Failed to update credential ${num}`);
    //             } else {
    //                 const changeRes = new ChangeResponse();
    //                 changeRes.name = "ChangePassword";
    //                 changeRes.changed = true;
    //                 return changeRes;
    //             }
    //         }));
    // }

    // updateCredential(partyId: string, credential: Credential): Observable<number> {
    //     return this.getCredentialByPartyId(partyId)
    //         .pipe(switchMap(credentialRes => {
    //             if (!credentialRes) {
    //                 return throwError(`No credential found ${credentialRes}`);
    //             } else {
    //                 return this.updateCredentialLocal(partyId, credential)
    //                     .pipe(switchMap(numReplaced => {
    //                         if (!numReplaced) {
    //                             return throwError(`Failed to update credential ${numReplaced}`);
    //                         } else if (!credential.username) {
    //                             return of(numReplaced);
    //                         } else {
    //                             const confirmation: Confirmation = new Confirmation();
    //                             confirmation.credentialId = credentialRes.credentialId;
    //                             return this.confirmationRepositoryNeDbAdapter.addConfirmation(confirmation)
    //                                 .pipe(map(confirmationRes2 => {
    //                                     if (!confirmationRes2) {
    //                                         throw new Error(`AddConfirmation Failed ${confirmationRes2}`);
    //                                     } else {
    //                                         return numReplaced;
    //                                     }
    //                                 }));
    //                         }
    //                     }));
    //             }
    //         }));
    // }


    // USED BY OTHER REPO

    // public updateCredentialStatusByPartyId(partyId: string, status: string): Observable<number> {
    //     return Observable.create(function (observer: Observer<number>) {
    //         const query = {
    //             "partyId": partyId
    //         };
    //
    //         credentials.update(query, {$set: {status: status}}, {}, function (err: any, numReplaced: number) {
    //             if (!err) {
    //                 observer.next(numReplaced);
    //             } else {
    //                 observer.error(err);
    //             }
    //             observer.complete();
    //         });
    //     });
    // }
    //
    // public deleteCredentialByPartyId(partyId: string): Observable<number> {
    //     return Observable.create((observer: Observer<number>) => {
    //         const query = {partyId: partyId};
    //         credentials.remove(query, (err: any, numReplaced: any) => {
    //             if (!err) {
    //                 observer.next(numReplaced);
    //             } else {
    //                 observer.error(err);
    //             }
    //             observer.complete();
    //         });
    //     });
    // }


    // USED LOCALLY
    // private updateCredentialLocal(partyId: string, credential: Credential): Observable<number> {
    //     return Observable.create(function (observer: Observer<number>) {
    //         if (credential.username) {
    //             credential.status = "Suspended";
    //         } else {
    //             credential.status = "Active";
    //         }
    //         credential.modifiedOn = new Date();
    //         const query = {"partyId": partyId};
    //         credentials.update(query, {$set: credential}, {}, function (err, numReplaced) {
    //             if (!err) {
    //                 observer.next(numReplaced);
    //             } else {
    //                 observer.error(err);
    //             }
    //             observer.complete();
    //         });
    //     });
    // }

    // private changePasswordLocal(changePassword: ChangePassword): Observable<number> {
    //     return Observable.create(function (observer: Observer<number>) {
    //         const query = {
    //             "credentialId": changePassword.credentialId
    //         };
    //
    //         credentials.update(query, {$set: {password: changePassword.newPassword}}, {}, function (err: any, num: any) {
    //             if (!err) {
    //                 observer.next(num);
    //             } else {
    //                 observer.error(err);
    //             }
    //             observer.complete();
    //         });
    //     });
    // }

}
