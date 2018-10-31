import { PhotoRepository } from "../../repository/photo.repository";
import { Photo } from "../../data/photo/photo";
import {  photos } from "../../db";
import { Observable ,  Observer } from "rxjs";

export class PhotoRepositoryNeDbAdapter implements PhotoRepository {

    getPhotos(partyId: string, type?: string): Observable<Photo> {
        return Observable.create( (observer: Observer<Photo>) => {
            const query = { "partyId": partyId };
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

    savePhoto(type: string, photo: File, partyId: string): Observable<Photo> {
        const body = new Photo();
        body.partyId = partyId;
        if (type === "user") {
            body.userImage = photo;
        } else {
            body.organizationImage = photo;
        }
        body.createdOn = new Date();
        body.modifiedOn = new Date();
        return Observable.create(function(observer: Observer<Photo>) {
            photos.insert(body, function(err: any, doc: any) {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(doc);
                }
                observer.complete();
            });
        });
    }

    updatePhoto(partyId: string, type: string, photo: File): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            const query = {"partyId": partyId};
            const body = new Photo();
            if (type === "user") {
                body.userImage = photo;
            } else {
                body.organizationImage = photo;
            }
            body.modifiedOn = new Date();
            photos.update(query, {$set: body}, {}, function (err: any, numReplaced: number) {
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