import { createPhotoRepository } from "../../adapter/photo/photo.repository.factory";
import { PhotoRepository } from "../../repository/photo.repository";
import { Photo } from "../../data/photo/photo";
import { Observable, of} from "rxjs";
import { switchMap, } from "rxjs/operators";
import {SessionRepository} from "../../repository/session.repository";
import {createSessionRepositoryFactory} from "../../adapter/session/session.repository.factory";

export class PhotoOrchestrator {

  private photoRepository: PhotoRepository;
  private sessionRepository: SessionRepository;


  constructor() {
    this.photoRepository = createPhotoRepository();
    this.sessionRepository = createSessionRepositoryFactory();
  }

  savePhoto(type: string, photo: Photo, sessionId: string): Observable<Photo> {
      return this.sessionRepository.getSessionById(sessionId).pipe( switchMap( session => {
          if (!session) {
              return of(undefined);
          } else {
              // photo.partyId = session.partyId;
              // return this.photoRepository.savePhoto(type, photo);
          }
      }));
  }

  getPhotos(sessionId: string, type?: string): Observable<Photo> {
    return this.sessionRepository.getSessionById(sessionId).pipe( switchMap( session => {
      if (!session) {
        return of(undefined);
      } else {
        // return this.photoRepository.getPhotos(session.partyId, type);
      }
    }));
  }

  updatePhoto(partyId: string, type: string, photo: Photo): Observable<number> {
    return this.photoRepository.updatePhoto(partyId, type, photo);
  }

  // deletePhoto(partyId:string):Observable<number> {
  //   return this.photoRepository.deletePhoto(partyId);
  // };

}
