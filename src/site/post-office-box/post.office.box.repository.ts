import { Observable } from "rxjs/Observable";
import { PostOfficeBox } from "./post.office.box";

export interface PostOfficeBoxRepository {
  savePostOfficeBox(postOfficeBox: PostOfficeBox): Observable<PostOfficeBox>;

  getPostOfficeBoxes(pageNumber: number, pageSize: number, order: string): Observable<PostOfficeBox[]>;

  getPostOfficeBoxCount(): Observable<number>;

  getPostOfficeBoxById(siteId: string): Observable<PostOfficeBox>;

  updatePostOfficeBox(siteId: string, postOfficeBox: PostOfficeBox): Observable<number>;

  deletePostOfficeBox(siteId: string): Observable<number>;
}
