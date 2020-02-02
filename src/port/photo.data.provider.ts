import {Photo} from "../domain/model/photo/photo";
import {Observable} from "rxjs";

export interface PhotoDataProvider {

    getPhotos(partyId: string, type?: string): Observable<Photo>;

    savePhoto(photo: Photo): Observable<Photo>;

    updatePhoto(photo: Photo, partyId: string): Observable<Photo>;

    // deletePhoto(partyId: string): Observable<number>;
}
