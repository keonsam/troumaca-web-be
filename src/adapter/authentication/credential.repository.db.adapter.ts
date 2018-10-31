import validator from "validator";
import libphonenumberjs from "libphonenumber-js";
import PasswordValidator from "password-validator";
import {generateUUID} from "../../uuid.generator";
import {Credential} from "../../data/authentication/credential";
import {credentials} from "../../db";
import {CredentialRepository} from "../../repository/credential.repository";
import {AuthenticatedCredential} from "../../data/authentication/authenticated.credential";
import {Confirmation} from "../../data/authentication/confirmation";
import {ConfirmationRepositoryNeDbAdapter} from "./confirmation.repository.db.adapter";
import {CreatedCredential} from "../../data/authentication/created.credential";
import {Observable, Observer, of, throwError} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {generate} from "generate-password";

export class CredentialRepositoryNeDbAdapter implements CredentialRepository {

    private confirmationRepositoryNeDbAdapter: ConfirmationRepositoryNeDbAdapter = new ConfirmationRepositoryNeDbAdapter();

    isValidUsername(username: string, partyId: string): Observable<boolean> {
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
                    } else if (credential.partyId === partyId) {
                        return true;
                    } else {
                        return false;
                    }
                }));
        }
    }

    isValidPassword(password: string): Observable<boolean> {
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

    addCredential(credential: Credential, options?: any): Observable<CreatedCredential> {
        return this.addCredentialLocal(credential)
            .pipe(switchMap(credential => {
                if (!credential) {
                    return throwError("Credential was not created.");
                } else {
                    const confirmation: Confirmation = new Confirmation();
                    confirmation.credentialId = credential.credentialId;
                    return this.confirmationRepositoryNeDbAdapter.addConfirmation(confirmation)
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

    authenticate(credential: Credential, options?: any): Observable<AuthenticatedCredential> {
        return this.verifyCredential(credential.username, credential.password)
            .pipe(switchMap((credential: Credential) => {
                if (!credential) {
                    return of("Failed to verify Credential");
                } else {
                    const authenticatedCredential: AuthenticatedCredential = new AuthenticatedCredential();
                    const credentialId = credential.credentialId;
                    authenticatedCredential.username = credential.username;
                    authenticatedCredential.credentialId = credentialId;
                    authenticatedCredential.partyId = credential.partyId;
                    if (credential.status === "Active") {
                        authenticatedCredential.authenticateStatus = "AccountActive";
                        return of(authenticatedCredential);
                    } else if (credential.status === "Confirmed") {
                        authenticatedCredential.authenticateStatus = "AccountConfirmed";
                        return of(authenticatedCredential);
                    } else if (credential.status === "New") {
                        const confirmation: Confirmation = new Confirmation();
                        confirmation.credentialId = credentialId;
                        return this.confirmationRepositoryNeDbAdapter.addConfirmation(confirmation)
                            .pipe(map(confirmationRes => {
                                if (!confirmationRes) {
                                    throw new Error("Confirmation was not created");
                                } else {
                                    authenticatedCredential.confirmationId = confirmation.confirmationId;
                                    authenticatedCredential.authenticateStatus = "AccountUsernameNotConfirmed";
                                    return authenticatedCredential;
                                }
                            }));
                    }
                }
            }));
    }

    forgetPassword(credential: Credential, options: any): Observable<Confirmation> {
        return this.getCredentialByUsername(credential.username)
            .pipe( switchMap( credential => {
                if (!credential) {
                    return of(undefined);
                } else {
                    const confirmation: Confirmation = new Confirmation();
                    confirmation.credentialId = credential.credentialId;
                    return this.confirmationRepositoryNeDbAdapter.addConfirmation(confirmation)
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

    updateCredential(partyId: string, credential: Credential): Observable<number> {
        return this.getCredentialByPartyId(partyId)
            .pipe(switchMap(credentialRes => {
                if (!credentialRes) {
                    return throwError(`No credential found ${credentialRes}`);
                } else {
                    return this.updateCredentialLocal(partyId, credential)
                        .pipe(switchMap(numReplaced => {
                            if (!numReplaced) {
                                return throwError(`Failed to update credential ${numReplaced}`);
                            } else if (!credential.username) {
                                return of(numReplaced);
                            } else {
                                const confirmation: Confirmation = new Confirmation();
                                confirmation.credentialId = credentialRes.credentialId;
                                return this.confirmationRepositoryNeDbAdapter.addConfirmation(confirmation)
                                    .pipe(map(confirmationRes2 => {
                                        if (!confirmationRes2) {
                                            throw new Error(`AddConfirmation Failed ${confirmationRes2}`);
                                        } else {
                                            return numReplaced;
                                        }
                                    }));
                            }
                        }));
                }
            }));
    }


    // USED BY OTHER REPO

    public getCredentialByPartyIds(partyIds: string[]): Observable<Credential[]> {
        return Observable.create((observer: Observer<Credential[]>) => {
            const query = {partyId: {$in: partyIds}};
            credentials.find(query, (err: any, docs: any) => {
                if (!err) {
                    observer.next(docs);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    public getCredentialByPartyId(partyId: string): Observable<Credential> {
        return Observable.create((observer: Observer<Credential>) => {
            const query = {partyId: partyId};
            credentials.findOne(query, (err: any, doc: any) => {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    public updateCredentialStatusByPartyId(partyId: string, status: string): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            const query = {
                "partyId": partyId
            };

            credentials.update(query, {$set: {status: status}}, {}, function (err: any, numReplaced: number) {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    public deleteCredentialByPartyId(partyId: string): Observable<number> {
        return Observable.create((observer: Observer<number>) => {
            const query = {partyId: partyId};
            credentials.remove(query, (err: any, numReplaced: any) => {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }


    // USED LOCALLY
    private updateCredentialLocal(partyId: string, credential: Credential): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            if (credential.username) {
                credential.status = "Suspended";
            } else {
                credential.status = "Active";
            }
            credential.modifiedOn = new Date();
            const query = {"partyId": partyId};
            credentials.update(query, {$set: credential}, {}, function (err, numReplaced) {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
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

    private verifyCredential(username: string, password: string): Observable<Credential> {
        return Observable.create((observer: Observer<Credential>) => {
            const query = {
                "username": username,
                "password": password
            };
            credentials.findOne(query, (err: any, doc: any) => {
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

}
