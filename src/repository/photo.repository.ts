import {Photo} from "../data/photo/photo";
import {Observable} from "rxjs";

export interface PhotoRepository {

    getPhotos(partyId: string, type?: string): Observable<Photo>;

    savePhoto(type: string, photo: File, partyId: string): Observable<Photo>;

    updatePhoto(partyId: string, type: string, photo: File): Observable<number>;

    // deletePhoto(partyId: string): Observable<number>;
}
