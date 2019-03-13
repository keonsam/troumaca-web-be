import { PhotoRepository } from "../../repository/photo.repository";
import { Photo } from "../../data/photo/photo";
import {  photos } from "../../db";
import { Observable, Observer, throwError } from "rxjs";
import { switchMap } from "rxjs/operators";
import { generateUUID } from "../../uuid.generator";

export class PhotoRepositoryNeDbAdapter implements PhotoRepository {

    getPhotos(partyId: string, type?: string): Observable<Photo> {
        return Observable.create( (observer: Observer<Photo>) => {
            const query = { "partyId": partyId};
            photos.findOne(query, (err: any, doc: any) => {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    savePhoto(photo: Photo): Observable<Photo> {

        photo.photoId = generateUUID();
        photo.createdOn = new Date();
        photo.modifiedOn = new Date();
        return Observable.create(function(observer: Observer<Photo>) {
            photos.insert(photo, function(err: any, doc: any) {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(doc);
                }
                observer.complete();
            });
        });
    }

    updatePhoto(photo: Photo, partyId: string): Observable<Photo> {
        return this.updatePhotoLocal(photo, partyId)
            .pipe( switchMap( num => {
                if (!num) {
                    return throwError(`Failed to update image ${num}`);
                } else {
                    return this.getPhotos(partyId);
                }
            }));
    }

    private updatePhotoLocal(photo: Photo, photoId: string): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            photos.update({photoId}, {$set: photo}, {}, function (err: any, numReplaced: number) {
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
