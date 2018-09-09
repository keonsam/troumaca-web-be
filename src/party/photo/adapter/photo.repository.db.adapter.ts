import { PhotoRepository } from "../photo.repository";
import { Photo } from "../photo";
import { Observable ,  Observer } from "rxjs";
import { organizationPhotos, userPhotos } from "../../../db";
import { map, switchMap } from "rxjs/operators";

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

    getPhotos(partyId: string): Observable<Photo> {
        const newPhoto: Photo = new Photo();
        return this.getPhotoById(partyId, "user").pipe( switchMap(userPhoto => {
            return this.getPhotoById(partyId, "organization").pipe(map( organizationPhoto => {
                newPhoto.partyId = userPhoto.partyId;
                newPhoto.userImage = userPhoto.imageStr;
                newPhoto.organizationImage = organizationPhoto.imageStr;
                return newPhoto;
            }));
        }));
    }

    getPhotoById(partyId: string, type: string): Observable<Photo> {
        return Observable.create(function (observer: Observer<Photo>) {
            const query = { "partyId": partyId };
            const db = type === "user" ? userPhotos : organizationPhotos;
            db.findOne(query, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    updatePhoto(partyId: string, type: string, photo: Photo): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            const query = {
                "partyId": partyId
            };
            const db = type === "user" ? userPhotos : organizationPhotos;
            db.update(query, photo, {}, function (err: any, numReplaced: number) {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    // deletePhoto(partyId: string): Observable<number> {
    //     return Observable.create(function (observer: Observer<number>) {
    //         const query = {
    //             "partyId": partyId
    //         };
    //         userPhotos.remove(query, {}, function (err: any, numRemoved: number) {
    //             if (!err) {
    //                 observer.next(numRemoved);
    //             } else {
    //                 observer.error(err);
    //             }
    //             observer.complete();
    //         });
    //     });
    // }

}