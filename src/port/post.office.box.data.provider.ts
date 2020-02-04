import {PostOfficeBox} from "../domain/model/site/post.office.box";
import {Observable} from "rxjs";

export interface PostOfficeBoxDataProvider {
  savePostOfficeBox(postOfficeBox: PostOfficeBox): Observable<PostOfficeBox>;

  getPostOfficeBoxes(pageNumber: number, pageSize: number, order: string): Observable<PostOfficeBox[]>;

  getPostOfficeBoxCount(): Observable<number>;

  getPostOfficeBoxById(siteId: string): Observable<PostOfficeBox>;

  updatePostOfficeBox(siteId: string, postOfficeBox: PostOfficeBox): Observable<number>;

  deletePostOfficeBox(siteId: string): Observable<number>;
}
