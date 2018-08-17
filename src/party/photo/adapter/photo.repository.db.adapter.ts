import { PhotoRepository } from "../photo.repository";
import { Photo } from "../photo";
import { Observable } from "rxjs/Observable";
import { organizationPhotos, userPhotos } from "../../../db";
import { Observer } from "rxjs/Observer";

export class PhotoRepositoryNeDbAdapter implements PhotoRepository {


    savePhoto(type: string, photo: Photo): Observable<Photo> {

        const db = type === "user" ? userPhotos : organizationPhotos;
        return Observable.create(function(observer: Observer<Photo>) {
            db.insert(photo, function(err: any, doc: any) {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(photo);
                }
                observer.complete();
            });
        });
    }

    getPhotoById(partyId: string, type: string): Observable<Photo> {
        return Observable.create(function (observer: Observer<Photo>) {
            const query = {
                "partyId": partyId
            };
            if (type === "user") {
                userPhotos.findOne(query, function (err: any, doc: any) {
                    if (!err) {
                        observer.next(doc);
                    } else {
                        observer.error(err);
                    }
                    observer.complete();
                });
            } else {
                organizationPhotos.findOne(query, function (err: any, doc: any) {
                    if (!err) {
                        observer.next(doc);
                    } else {
                        observer.error(err);
                    }
                    observer.complete();
                });
            }
        });
    }

    updatePhoto(partyId: string, type: string, photo: Photo): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            const query = {
                "partyId": partyId
            };
            if (type === "user") {
                userPhotos.update(query, photo, {}, function (err: any, numReplaced: number) {
                    if (!err) {
                        observer.next(numReplaced);
                    } else {
                        observer.error(err);
                    }
                    observer.complete();
                });
            } else {
                organizationPhotos.update(query, photo, {}, function (err: any, numReplaced: number) {
                    if (!err) {
                        observer.next(numReplaced);
                    } else {
                        observer.error(err);
                    }
                    observer.complete();
                });
            }
        });
    }

    deletePhoto(partyId: string): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            const query = {
                "partyId": partyId
            };
            userPhotos.remove(query, {}, function (err: any, numRemoved: number) {
                if (!err) {
                    observer.next(numRemoved);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

}