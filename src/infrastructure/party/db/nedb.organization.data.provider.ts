import {OrganizationDataProvider} from "../../../port/organization.data.provider";
import { Observable, Observer, throwError } from "rxjs";
import {Organization} from "../../../domain/model/party/organization";
import { credentials, organizations, sessions } from "../../../db";
import {generateUUID} from "../../../uuid.generator";
import { map, switchMap } from "rxjs/operators";
import { HeaderBaseOptions } from "../../../header.base.options";

export class NedbOrganizationDataProvider implements OrganizationDataProvider {

  // private defaultPageSize: number = 10;

  // findOrganization(searchStr: string, pageSize: number): Observable<Organization[]> {
  //   const searchStrLocal = new RegExp(searchStr);
  //   const query = searchStr ? {name: {$regex: searchStrLocal}} : {};
  //   return Observable.create(function (observer: Observer<Organization[]>) {
  //     organizations.find(query).limit(100).exec(function (err: any, doc: any) {
  //       if (!err) {
  //         observer.next(doc);
  //       } else {
  //         observer.error(err);
  //       }
  //       observer.complete();
  //     });
  //   });
  // }

  getOrganization(options: HeaderBaseOptions): Observable<Organization> {
    return Observable.create(function (observer: Observer<Organization>) {
      const query = {ownerPartyId: options.ownerPartyId };
      organizations.findOne(query, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  saveOrganization(organization: Organization, options?: HeaderBaseOptions): Observable<Organization> {
    const partyId = options.partyId;
    return this.saveOrganizationLocal(organization, partyId)
        .pipe(switchMap(organization => {
          return this.updateAccount(partyId, organization.ownerPartyId)
              .pipe(switchMap(num => {
                if (!num) {
                  return throwError("organization credential update failed");
                } else {
                  return this.updateSession(partyId, organization.ownerPartyId)
                      .pipe( map(num1 => {
                        if (!num1) {
                          throw new Error("Failed to update session");
                        } else {
                          return organization;
                        }
                      }));
                }
              }));
        }));
  }

  private updateAccount(partyId: string, ownerPartyId: string): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      credentials.update({partyId}, {$set: {status: "Active", ownerPartyId: ownerPartyId}}, {}, function (err: any, numReplaced: number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  private updateSession(partyId: string, ownerPartyId: string): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      sessions.update({partyId}, {$set: {ownerPartyId: ownerPartyId}}, {}, function (err: any, numReplaced: number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  private saveOrganizationLocal(organization: Organization, partyId: string): Observable<Organization> {
    organization.partyId = partyId;
    organization.version = generateUUID();
    organization.ownerPartyId = generateUUID();
    organization.createdOn = new Date();
    organization.modifiedOn = new Date();

    return Observable.create(function (observer: Observer<Organization>) {
      organizations.insert(organization, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  // saveAccessRequest(request: JoinOrganization): Observable<JoinOrganization> {
  //   request.accessRequestId = generateUUID();
  //   return Observable.create(function (observer: Observer<JoinOrganization>) {
  //     requests.insert(request, function (err: any, doc: any) {
  //       if (!err) {
  //         observer.next(doc);
  //       } else {
  //         observer.error(err);
  //       }
  //       observer.complete();
  //     });
  //   });
  // }

  // getOrganizations(pageNumber: number, pageSize: number, order: string): Observable<Organization[]> {
  //   const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
  //   return Observable.create((observer: Observer<Organization[]>) => {
  //     organizations.find({}).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
  //       if (!err) {
  //         observer.next(doc);
  //       } else {
  //         observer.error(err);
  //       }
  //       observer.complete();
  //     });
  //   });
  // }

  // getOrganizationCount(): Observable<number> {
  //   return Observable.create(function (observer: Observer<number>) {
  //     organizations.count({}, function (err: any, count: number) {
  //       if (!err) {
  //         observer.next(count);
  //       } else {
  //         observer.error(err);
  //       }
  //       observer.complete();
  //     });
  //   });
  // }


  // deleteOrganization(partyId: string): Observable<number> {
  //   return Observable.create(function (observer: Observer<number>) {
  //     const query = {
  //       "partyId": partyId
  //     };
  //
  //     organizations.remove(query, {}, function (err: any, numRemoved: number) {
  //       if (!err) {
  //         observer.next(numRemoved);
  //       } else {
  //         observer.error(err);
  //       }
  //       observer.complete();
  //     });
  //   });
  // }
  //
  updateOrganization(organization: Organization, options: HeaderBaseOptions): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      organization.modifiedOn = new Date();
      const query = {
        ownerPartyId: options.ownerPartyId
      };
      organizations.update(query, { $set: organization}, {}, function (err: any, numReplaced: number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }
  //
  // getCompany(options: any): Observable<CompanyInfo> {
  //   return this.getOrganization(options["Owner-Party-Id"])
  //       .pipe(switchMap( organization => {
  //         return this.getActivities(options["Owner-Party-Id"])
  //             .pipe(switchMap(activities => {
  //               return this.countUsers(options["Owner-Party-Id"])
  //                   .pipe( switchMap(usersNum => {
  //                     return this.countAssets(options["Owner-Party-Id"])
  //                         .pipe(map( assetsNum => {
  //                           return new CompanyInfo(organization, activities, usersNum, assetsNum);
  //                         }));
  //                   }));
  //             }));
  //       }));
  // }
  //
  // private getActivities(ownerPartyId: string): Observable<Activity[]> {
  //   return Observable.create((observer: Observer<Activity[]>) => {
  //     activities.find({ownerPartyId}).limit(5).exec(function (err: any, doc: any) {
  //       if (!err) {
  //         observer.next(doc);
  //       } else {
  //         observer.error(err);
  //       }
  //       observer.complete();
  //     });
  //   });
  // }
  //
  // private countUsers(ownerPartyId: string): Observable<number> {
  //   return Observable.create(function (observer: Observer<number>) {
  //     users.count({ownerPartyId}, function (err: any, count: number) {
  //       if (!err) {
  //         observer.next(count);
  //       } else {
  //         observer.error(err);
  //       }
  //       observer.complete();
  //     });
  //   });
  // }
  //
  // private countAssets(ownerPartyId: string): Observable<number> {
  //   return Observable.create(function (observer: Observer<number>) {
  //     assets.count({ownerPartyId}, function (err: any, count: number) {
  //       if (!err) {
  //         observer.next(count);
  //       } else {
  //         observer.error(err);
  //       }
  //       observer.complete();
  //     });
  //   });
  // }
}

