import {PersonDataProvider} from "../../../port/person.data.provider";
import { Observable, Observer, of, throwError } from "rxjs";
import {generateUUID} from "../../../uuid.generator";
import { credentials, partyAccessRoles, persons } from "../../../db";
import {Person} from "../../../domain/model/party/person/person";
import { map, switchMap } from "rxjs/operators";
import { Credential } from "../../../domain/model/authentication/credential";
import { generate } from "generate-password";
import { HeaderBaseOptions } from "../../../header.base.options";
import { PartyAccessRole } from "../../../domain/model/authorization/party.access.role";
import { SkipGenerator } from "../../util/skip.generator";
import { SortGenerator } from "../../util/sort.generator";
import { Page } from "../../../domain/model/page/page";
import { Sort } from "../../../util/sort";
import { Persons } from "../../../domain/model/party/person/persons";

export class NedbPersonDataProvider implements PersonDataProvider {

  findPeople(searchStr: string, options: HeaderBaseOptions): Observable<Person[]> {
    const searchStrLocal = new RegExp(searchStr);
    const query = searchStr ? {
      firstName: {$regex: searchStrLocal},
      // ownerPartyId: options.ownerPartyId
    } : {};
    return Observable.create(function (observer: Observer<Person[]>) {
      persons.find(query).limit(100).exec(function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getPersons(pageNumber: number, pageSize: number, sort: Sort, options: HeaderBaseOptions): Observable<Persons> {
    return Observable.create(function (observer: Observer<Persons>) {
      persons.count({ownerPartyId: options.ownerPartyId}, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        const generate = SortGenerator.generate(sort);
        persons.find({ownerPartyId: options.ownerPartyId})
            .skip(skipAmount)
            .limit(pageSize)
            .exec((err: any, docs: Person[]) => {
              if (!err) {
                observer.next(new Persons(docs, new Page(pageNumber, pageSize, docs.length, count)));
              } else {
                observer.error(err);
              }
              observer.complete();
            });
      });
    });
  }

  getPerson(partyId: string, options?: any): Observable<Person> {
    const query = {
      partyId,
    };
    return Observable.create(function (observer: Observer<Person>) {
      persons.findOne(query, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  savePerson(person: Person, credential: Credential, partyAccessRoles: string[], options: HeaderBaseOptions): Observable<Person> {
    return this.savePersonLocal(person, options)
        .pipe(switchMap(personRes => {
          if (!personRes) {
            return throwError("failed to save person");
          } else if (!credential || credential.username) {
            return of(personRes);
          } else {
            credential.partyId = personRes.partyId;
            return this.createCredential(credential, options)
                .pipe(switchMap(cred => {
                  if (!cred) {
                    return throwError("failed to create credential");
                  } else if (!partyAccessRoles || partyAccessRoles.length < 1) {
                    return of(personRes);
                  } else {
                    this.addPartyAccessRoles(personRes.partyId, partyAccessRoles, options)
                        .pipe(map(partyAccessRolesRes => {
                          if (!partyAccessRolesRes) {
                            throw new Error("failed to save partyAccessRoles");
                          } else {
                            return personRes;
                          }
                        }));
                  }
                }));
          }
        }));
  }

  updatePerson(partyId: string, person: Person, credential: Credential, partyAccessRoles: string[], options: HeaderBaseOptions): Observable<number> {
    return this.updatePersonLocal(partyId, person)
        .pipe(switchMap(personRes => {
          if (!personRes) {
            return throwError("failed to update person");
          } else if (!credential || credential.username) {
            return of(personRes);
          } else {
            this.updateCredential(partyId, credential)
                .pipe(switchMap(credentialRes => {
                  if (!credentialRes) {
                    return throwError("failed to update Credential");
                  } else if (!partyAccessRoles) {
                    return of(personRes);
                  } else {
                    this.addPartyAccessRoles(partyId, partyAccessRoles, options)
                        .pipe(map(partyAccessRolesRes => {
                          if (!partyAccessRolesRes) {
                            throw new Error("failed to save partyAccessRoles");
                          } else {
                            return personRes;
                          }
                        }));
                  }
                }));
          }
        }));
  }

  deletePerson(partyId: string, options: HeaderBaseOptions): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      const query = {
        "partyId": partyId
      };
      persons.remove(query, {}, function (err: any, numRemoved: number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }


  // HELPERS

  private savePersonLocal(person: Person, options: HeaderBaseOptions): Observable<Person> {
    person.createdOn = new Date();
    person.modifiedOn = new Date();
    person.partyId = generateUUID();
    person.ownerPartyId = options.ownerPartyId;
    person.version = generateUUID();
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

  private createCredential(credential: Credential, options: HeaderBaseOptions): Observable<Credential> {
    credential.password = generate({length: 10, numbers: true});
    //credential.ownerPartyId = options.ownerPartyId;
    credential.status = "Active";
    return Observable.create(function (observer: Observer<Credential>) {
      credentials.insert(credential, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  private addPartyAccessRoles(partyId: string, partyAccessRolesArr: string[], options: HeaderBaseOptions): Observable<PartyAccessRole[]> {
    const newDocs = partyAccessRolesArr.map(x => new PartyAccessRole(x, generateUUID(), partyId, options.ownerPartyId));
    return Observable.create(function (observer: Observer<PartyAccessRole[]>) {
      partyAccessRoles.insert(newDocs, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  private updatePersonLocal(partyId: string, person: Person): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      const query = {
        "partyId": partyId
      };
      person.modifiedOn = new Date();
      persons.update(query, {$set: person}, {}, function (err: any, numReplaced: number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  private updateCredential(partyId: string, credential: Credential): Observable<number> {
    const query = {
      "partyId": partyId
    };
    return Observable.create(function (observer: Observer<number>) {
      credentials.update(query, {$set: credential}, {}, function (err: any, numReplaced: number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }
}
