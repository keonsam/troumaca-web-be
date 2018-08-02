import { createPhotoRepository } from "./photo.repository.factory";
import { PhotoRepository } from "./photo.repository";
import { Observable } from "rxjs/Observable";
import { Photo } from "./photo";

export class PhotoOrchestrator {

  private photoRepository: PhotoRepository;

  constructor() {
    this.photoRepository = createPhotoRepository();
  }

  savePhoto(partyId: string, type: string, photo: Photo): Observable<Photo> {
    return this.photoRepository.savePhoto(partyId, type, photo);
  }

  getPhotoById(partyId: string, type: string): Observable<Photo> {
    return this.photoRepository.getPhotoById(partyId, type);
  }

  updatePhoto(partyId: string, type: string, photo: Photo): Observable<number> {
    return this.photoRepository.updatePhoto(partyId, type, photo);
  }

  // deletePhoto(partyId:string):Observable<number> {
  //   return this.photoRepository.deletePhoto(partyId);
  // };

}
