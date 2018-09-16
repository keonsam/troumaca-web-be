import { partyAccessRoles } from "../../db";
import { PartyAccessRoleRepository } from "../../repository/party.access.role.repository";
import { PartyAccessRole } from "../../data/authorization/party.access.role";
import { Observable ,  Observer } from "rxjs";
import { RepositoryKind } from "../../repository.kind";
import { generateUUID } from "../../uuid.generator";
// import {calcSkip} from "../../db.util";

class PartyAccessRoleDBRepository implements PartyAccessRoleRepository {

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

  addPartyAccessRole(partyAccessRole: PartyAccessRole[]): Observable<PartyAccessRole[]> {
    partyAccessRole.forEach( value => {
      if (!value.partyAccessRoleId) {
        value.partyAccessRoleId = generateUUID();
      }
    });
    return Observable.create(function(observer: Observer<PartyAccessRole[]>) {
      partyAccessRoles.insert(partyAccessRole, function(err: any, docs: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(docs);
        }
        observer.complete();
      });
    });
  }

  deletePartyAccessRole(partyId: string): Observable<number> {
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

  getPartyAccessRoleById(partyId: string): Observable<PartyAccessRole[]> {
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

}


class PartyAccessRoleRestRepository implements PartyAccessRoleRepository {

  // findPartyAccessRoles(searchStr: string, pageSize: number): Observable<PartyAccessRole[]> {
  //   return undefined;
  // };
  //

  getPartyAccessRoles(): Observable<PartyAccessRole[]> {
    return undefined;
  }
  //
  // getPartyAccessRoleCount():Observable<number> {
  //   return undefined;
  // }

  addPartyAccessRole(partyAccessRole: PartyAccessRole[]): Observable<PartyAccessRole[]> {
    return undefined;
  }

  deletePartyAccessRole(partyId: string): Observable<number> {
    return undefined;
  }

  deletePartyAccessRoleByAccessRoleId(accessRoleId: string): Observable<number> {
    return undefined;
  }

  getPartyAccessRoleById(partyId: string): Observable<PartyAccessRole[]> {
    return undefined;
  }

  updatePartyAccessRole(partyAccessRoleId: string, partyAccessRole: PartyAccessRole): Observable<number> {
    return undefined;
  }

}

export function createPartyAccessRoleRepositoryFactory(kind?: RepositoryKind): PartyAccessRoleRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new PartyAccessRoleDBRepository();
    case RepositoryKind.Rest:
      return new PartyAccessRoleRestRepository();
    default:
      return new PartyAccessRoleDBRepository();
  }
}
