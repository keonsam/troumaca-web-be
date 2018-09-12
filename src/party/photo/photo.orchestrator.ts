import { createPhotoRepository } from "./photo.repository.factory";
import { PhotoRepository } from "./photo.repository";
import { Observable, of} from "rxjs";
import { Photo } from "./photo";
import { SessionRepository} from "../../session/session.repository";
import { createSessionRepositoryFactory } from "../../session/session.repository.factory";
import { switchMap, } from "rxjs/operators";

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
              photo.partyId = session.partyId;
              return this.photoRepository.savePhoto(type, photo);
          }
      }));
  }

  getPhotos(sessionId: string, type?: string): Observable<Photo> {
    return this.sessionRepository.getSessionById(sessionId).pipe( switchMap( session => {
      if (!session) {
        return of(undefined);
      } else {
        return this.photoRepository.getPhotos(session.partyId, type);
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
