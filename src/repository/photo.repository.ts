import {Photo} from "../data/photo/photo";
import {Observable} from "rxjs";

export interface PhotoRepository {

    getPhotos(partyId: string, type?: string): Observable<Photo>;

    savePhoto(photo: Photo): Observable<Photo>;

    updatePhoto(photo: Photo, partyId: string): Observable<Photo>;

    // deletePhoto(partyId: string): Observable<number>;
}
