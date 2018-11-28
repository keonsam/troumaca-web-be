import { accessRoles, partyAccessRoles } from "../../db";
import {PartyAccessRoleRepository} from "../../repository/party.access.role.repository";
import {PartyAccessRole} from "../../data/authorization/party.access.role";
import {Observable, Observer, throwError} from "rxjs";
import {generateUUID} from "../../uuid.generator";
import { map, switchMap } from "rxjs/operators";
import { AccessRole } from "../../data/authorization/access.role";

// import {calcSkip} from "../../db.util";

export class PartyAccessRoleDBRepository implements PartyAccessRoleRepository {

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

  addPartyAccessRoles(partyAccessRoleArr: PartyAccessRole[], partyId: string): Observable<PartyAccessRole[]> {
    partyAccessRoleArr.forEach(value => {
      value.partyAccessRoleId = generateUUID();
      value.partyId = partyId;
      value.createdOn = new Date();
      value.modifiedOn = new Date();
    });
    return this.addPartyAccessRolesLocal(partyAccessRoleArr);
  }

  private addPartyAccessRolesLocal(partyAccessRoleArr: PartyAccessRole[]): Observable<PartyAccessRole[]> {
      return Observable.create(function(observer: Observer<PartyAccessRole[]>) {
          partyAccessRoles.insert(partyAccessRoleArr, function(err: any, docs: any) {
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
            const accessRoleIds: string[] = partyAccessRoles.map(x => {
                if (x.accessRoleId) return x.accessRoleId;
            });
            return this.getAccessRoleByIds(accessRoleIds)
                .pipe(map(accessRoles => {
                    if (accessRoles.length < 1) {
                        throw new Error(`No AccessRole found ${accessRoles}`);
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

  updatePartyAccessRoles(partyAccessRoles: PartyAccessRole[], partyId: string): Observable<PartyAccessRole[]> {
    return this.deletePartyAccessRoles(partyId)
        .pipe(switchMap(numDel => {
          if (!numDel) {
            return throwError(`Failed to Delete partyAccessRoles ${numDel}`);
          } else {
            return this.updatePartyAccessRolesLocal(partyAccessRoles, partyId);
          }
        }));
  }

  private updatePartyAccessRolesLocal(partyAccessRoleArr: PartyAccessRole[], partyId: string): Observable<PartyAccessRole[]> {
    partyAccessRoleArr.forEach(value => {
      if (!value.partyAccessRoleId) {
        value.partyAccessRoleId = generateUUID();
      }
      if (!value.partyId) {
        value.partyId = partyId;
      }

      if (!value.createdOn) {
        value.createdOn = new Date();
      }

      value.modifiedOn = new Date();
    });

    return this.addPartyAccessRolesLocal(partyAccessRoleArr);
  }


}