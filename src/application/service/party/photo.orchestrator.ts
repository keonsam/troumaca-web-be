import { createPhotoDataProvider } from "../../../infrastructure/photo/photo.data.provider.factory";
import { PhotoDataProvider } from "../../../port/photo.data.provider";
import { Photo } from "../../../domain/model/photo/photo";
import { Observable} from "rxjs";
import {SessionDataProvider} from "../../../port/session.data.provider";
import {createSessionDataProvider} from "../../../infrastructure/session/session.data.provider.factory";

export class PhotoOrchestrator {

    private photoRepository: PhotoDataProvider;
    private sessionRepository: SessionDataProvider;


    constructor() {
        this.photoRepository = createPhotoDataProvider();
        this.sessionRepository = createSessionDataProvider();
    }

    getPhotos(partyId: string, type?: string): Observable<Photo> {
        return this.photoRepository.getPhotos(partyId, type);
    }

    savePhoto(photo: Photo): Observable<Photo> {
        return this.photoRepository.savePhoto(photo);
    }

    updatePhoto(photo: Photo, partyId: any): Observable<Photo> {
        return this.photoRepository.updatePhoto(photo, partyId);
    }
}
