import { PhotoDataProvider } from "../../../port/photo.data.provider";
import { Photo } from "../../../domain/model/photo/photo";
import { Observable } from "rxjs";

export class RestPhotoDataProvider implements PhotoDataProvider {

    // deletePhoto(partyId: string): Observable<number> {
    //     return undefined;
    // }

    getPhotos(partyId: string, type?: string): Observable<Photo> {
        return undefined;
    }

    savePhoto(photo: Photo): Observable<Photo> {
        return undefined;
    }

    updatePhoto(photo: Photo, partyId: string): Observable<Photo> {
        return undefined;
    }
}
