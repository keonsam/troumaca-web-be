import { Observable } from "rxjs/Observable";
import { Photo } from "../data/photo/photo";

export interface PhotoRepository {
  savePhoto(type: string, photo: Photo): Observable<Photo>;

  getPhotoById(partyId: string, type: string): Observable<Photo>;

  updatePhoto(partyId: string, type: string, photo: Photo): Observable<number>;

  deletePhoto(partyId: string): Observable<number>;
}