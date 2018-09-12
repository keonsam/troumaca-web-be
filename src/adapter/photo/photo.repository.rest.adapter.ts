import { PhotoRepository } from "../../repository/photo.repository";
import { Observable } from "rxjs/Observable";
import { Photo } from "../../data/photo/photo";

export class PhotoRepositoryRestAdapter implements PhotoRepository {

    deletePhoto(partyId: string): Observable<number> {
        return undefined;
    }

    getPhotoById(partyId: string, type: string): Observable<Photo> {
        return undefined;
    }

    savePhoto(type: string, photo: Photo): Observable<Photo> {
        return undefined;
    }

    updatePhoto(partyId: string, type: string, photo: Photo): Observable<number> {
        return undefined;
    }
}