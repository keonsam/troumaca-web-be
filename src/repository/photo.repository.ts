import { Photo } from "../data/photo/photo";
import { Observable } from "rxjs";

export interface PhotoRepository {
  savePhoto(type: string, photo: Photo): Observable<Photo>;

  getPhotos(partyId: string, type?: string): Observable<Photo>;

  updatePhoto(partyId: string, type: string, photo: Photo): Observable<number>;

  // deletePhoto(partyId: string): Observable<number>;
}
