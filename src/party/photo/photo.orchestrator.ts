import { createPhotoRepository } from "../../adapter/photo/photo.repository.factory";
import { PhotoRepository } from "../../repository/photo.repository";
import { Photo } from "../../data/photo/photo";
import { Observable} from "rxjs";
import {SessionRepository} from "../../repository/session.repository";
import {createSessionRepositoryFactory} from "../../adapter/session/session.repository.factory";

export class PhotoOrchestrator {

    private photoRepository: PhotoRepository;
    private sessionRepository: SessionRepository;


    constructor() {
        this.photoRepository = createPhotoRepository();
        this.sessionRepository = createSessionRepositoryFactory();
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
