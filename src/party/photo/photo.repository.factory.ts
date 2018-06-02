import * as Rx from 'rxjs';
import {PhotoRepository} from "./photo.repository";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {RepositoryKind} from "../../repository.kind";
import {userPhotos, organizationPhotos} from "../../db";
import {Photo} from "./photo";

class PhotoDBRepository implements PhotoRepository {

  //private defaultPageSize:number = 10;

  savePhoto(partyId: string, type:string, photo:Photo):Observable<Photo> {
    let newPhoto = photo.toJson();
    return Rx.Observable.create(function(observer:Observer<Photo>) {
      if(type === "user") {
        userPhotos.insert(newPhoto, function(err:any, doc:any) {
          if (err) {
            observer.error(err);
          } else {
            observer.next(photo);
          }
          observer.complete();
        });
      }else {
        organizationPhotos.insert(newPhoto, function(err:any, doc:any) {
          if (err) {
            observer.error(err);
          } else {
            observer.next(photo);
          }
          observer.complete();
        });
      }
    });
  }

  getPhotoById(partyId:string, type: string):Observable<Photo> {
    return Rx.Observable.create(function (observer:Observer<Photo>) {
      let query = {
        "partyId":partyId
      };
      if(type === "user") {
        userPhotos.findOne(query, function (err:any, doc:any) {
          if (!err) {
            observer.next(doc);
          } else {
            observer.error(err);
          }
          observer.complete();
        });
      }else {
        organizationPhotos.findOne(query, function (err:any, doc:any) {
          if (!err) {
            observer.next(doc);
          } else {
            observer.error(err);
          }
          observer.complete();
        });
      }
    });
  };

  updatePhoto(partyId:string, type:string, photo:Photo):Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "partyId":partyId
      };
      let newPhoto = photo.toJson();
      if(type === "user"){
        userPhotos.update(query, newPhoto, {}, function (err:any, numReplaced:number) {
          if (!err) {
            observer.next(numReplaced);
          } else {
            observer.error(err);
          }
          observer.complete();
        });
      }else {
        organizationPhotos.update(query, newPhoto, {}, function (err:any, numReplaced:number) {
          if (!err) {
            observer.next(numReplaced);
          } else {
            observer.error(err);
          }
          observer.complete();
        });
      }
    });
  };

  deletePhoto(partyId:string):Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "partyId":partyId
      };
      userPhotos.remove(query, {}, function (err:any, numRemoved:number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

}

class PhotoRestRepository implements PhotoRepository {

  deletePhoto(partyId:string): Observable<number> {
    return undefined;
  }

  getPhotoById(partyId:string, type: string): Observable<Photo> {
    return undefined;
  }

  savePhoto(partyId: string, type:string, photo: Photo): Observable<Photo> {
    return undefined;
  }

  updatePhoto(partyId:string, type: string, photo:Photo): Observable<number> {
    return undefined;
  }
}

export function createPhotoRepository(kind?:RepositoryKind):PhotoRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new PhotoDBRepository();
    case RepositoryKind.Rest:
      return new PhotoRestRepository();
    default:
      return new PhotoDBRepository();
  }
}
