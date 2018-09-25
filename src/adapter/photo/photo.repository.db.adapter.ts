import { PhotoRepository } from "../../repository/photo.repository";
import { Photo } from "../../data/photo/photo";
import { organizationPhotos, userPhotos } from "../../db";
import { Observable ,  Observer } from "rxjs";
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

    getPhotos(partyId: string, type?: string): Observable<Photo> {
        const newPhoto: Photo = new Photo();
        if (!type) {
            return this.getPhotoById(partyId, "user").pipe( switchMap(userPhoto => {
                return this.getPhotoById(partyId, "organization").pipe(map( organizationPhoto => {
                    if (userPhoto) {
                        newPhoto.userImage = userPhoto.imageStr;
                        newPhoto.partyId = userPhoto.partyId;
                    }
                    if (organizationPhoto) {
                        newPhoto.organizationImage = organizationPhoto.imageStr;
                        // TODO: this will need fixing. what if it's an invited user organization photo? for now leave as is.
                        if (!userPhoto) {
                            newPhoto.partyId = organizationPhoto.partyId;
                        }
                    }
                    return newPhoto;
                }));
            }));
        } else {
            return this.getPhotoById(partyId, type)
                .pipe( map( photo => {
                    if (type == "user") {
                        newPhoto.userImage = photo.imageStr;
                    } else {
                        newPhoto.organizationImage = photo.imageStr;
                    }
                    return newPhoto;
            }));
        }
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