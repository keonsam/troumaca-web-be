import { accessRoles, partyAccessRoles } from "../../../db";
import {PartyAccessRoleDataProvider} from "../../../port/party.access.role.data.provider";
import {PartyAccessRole} from "../../../domain/model/authorization/party.access.role";
import { Observable, Observer, of, throwError } from "rxjs";
import {generateUUID} from "../../../uuid.generator";
import { map, switchMap } from "rxjs/operators";
import { AccessRole } from "../../../domain/model/authorization/access.role";

// import {calcSkip} from "../../db.util";

export class NedbPartyAccessRoleDataProvider implements PartyAccessRoleDataProvider {

  private defaultPageSize: number = 10;

  // findPartyAccessRoles(searchStr: string, pageSize: number): Observable<PartyAccessRole[]> {
  //   let searchStrLocal = new RegExp(searchStr);
  //   return Observable.create(function(observer:Observer<PartyAccessRole[]>) {
  //     partyAccessRoles.find({name: {$regex: searchStrLocal}}).limit(pageSize).exec(function (err: any, doc: any) {
  //       if (!err) {
  //         observer.next(doc);
  //       } else {
  //         observer.error(err);
  //       }
  //       observer.complete();
  //     });
  //   });
  // };

  getPartyAccessRoles(): Observable<PartyAccessRole[]> {
    return Observable.create(function (observer: Observer<PartyAccessRole[]>) {
      partyAccessRoles.find({}, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  // getPartyAccessRoleCount():Observable<number> {
  //   return Observable.create(function (observer:Observer<number>) {
  //     partyAccessRoles.count({}, function (err:any, count:number) {
  //       if (!err) {
  //         observer.next(count);
  //       } else {
  //         observer.error(err);
  //       }
  //       observer.complete();
  //     });
  //   });
  // };

  addPartyAccessRoles(partyAccessRoles1: string[], partyId: string): Observable<PartyAccessRole[]> {
      const newPartyAccessRoles: PartyAccessRole[] = [];
      partyAccessRoles1.forEach(value => {
        const newPartyAccessRole = new PartyAccessRole();
        newPartyAccessRole.partyAccessRoleId = generateUUID();
        newPartyAccessRole.accessRoleId = value;
        newPartyAccessRole.partyId = partyId;
        newPartyAccessRole.createdOn = new Date();
        newPartyAccessRole.modifiedOn = new Date();
        newPartyAccessRoles.push(newPartyAccessRole);
    });
      return Observable.create(function(observer: Observer<PartyAccessRole[]>) {
          partyAccessRoles.insert(newPartyAccessRoles, function(err: any, docs: any) {
              if (err) {
                  observer.error(err);
              } else {
                  observer.next(docs);
              }
              observer.complete();
          });
      });
  }


  deletePartyAccessRoles(partyId: string): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      const query = {
        "partyId": partyId
      };
      partyAccessRoles.remove(query, {multi: true}, function (err: any, numRemoved: number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  deletePartyAccessRoleByAccessRoleId(accessRoleId: string): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      const query = {
        "accessRole.accessRoleId": accessRoleId
      };
      partyAccessRoles.remove(query, {multi: true}, function (err: any, numRemoved: number) {
        if (!err) {
          console.log(numRemoved);
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getPartyAccessRolesByPartyId(partyId: string): Observable<PartyAccessRole[]> {
    return this.getPartyAccessRolesByPartyIdLocal(partyId)
        .pipe(switchMap( partyAccessRoles => {
            if (!partyAccessRoles) {
                return of(partyAccessRoles);
            }
            const accessRoleIds: string[] = partyAccessRoles.map(x => {
                if (x.accessRoleId) return x.accessRoleId;
            });
            return this.getAccessRoleByIds(accessRoleIds)
                .pipe(map(accessRoles => {
                    if (accessRoles.length < 1) {
                        return partyAccessRoles;
                        // throw new Error(`No AccessRole found ${accessRoles}`);
                    } else {
                        partyAccessRoles.forEach(value => {
                            value.accessRole =  accessRoles.find(x => x.accessRoleId === value.accessRoleId);
                        });
                        return partyAccessRoles;
                    }
                }));
        }));
  }

  private getPartyAccessRolesByPartyIdLocal(partyId: string): Observable<PartyAccessRole[]> {
      return Observable.create(function (observer: Observer<PartyAccessRole[]>) {
          const query = {
              "partyId": partyId
          };
          partyAccessRoles.find(query, function (err: any, docs: any) {
              if (!err) {
                  observer.next(docs);
              } else {
                  observer.error(err);
              }
              observer.complete();
          });
      });
  }

  private getAccessRoleByIds(accessRoleIds: string[]): Observable<AccessRole[]> {
      return Observable.create(function (observer: Observer<AccessRole[]>) {
          // let query = {
          //   "accessRoleId":accessRoleId
          // };
          accessRoles.find({accessRoleId: {$in: accessRoleIds}}, function (err: any, docs: any) {
              if (!err) {
                  observer.next(docs);
              } else {
                  observer.error(err);
              }
              observer.complete();
          });
      });
  }

  updatePartyAccessRole(partyAccessRoleId: string, partyAccessRole: PartyAccessRole): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      const query = {
        "partyAccessRoleId": partyAccessRoleId
      };
      partyAccessRoles.update(query, partyAccessRole, {}, function (err: any, numReplaced: number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  updatePartyAccessRoles(partyAccessRoles: string[], partyId: string): Observable<PartyAccessRole[]> {
    return this.deletePartyAccessRoles(partyId)
        .pipe(switchMap(numDel => {
          if (!numDel) {
            return throwError(`Failed to Delete partyAccessRoles ${numDel}`);
          } else {
            return this.addPartyAccessRoles(partyAccessRoles, partyId);
          }
        }));
  }


}
