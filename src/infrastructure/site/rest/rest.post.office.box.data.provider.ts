import {Observable} from "rxjs";
import {PostOfficeBox} from "../../../domain/model/site/post.office.box";
import {PostOfficeBoxDataProvider} from "../../../port/post.office.box.data.provider";

export class RestPostOfficeBoxDataProvider implements PostOfficeBoxDataProvider {
  deletePostOfficeBox(siteId: string): Observable<number> {
    return undefined;
  }

  getPostOfficeBoxById(siteId: string): Observable<PostOfficeBox> {
    return undefined;
  }

  getPostOfficeBoxCount(): Observable<number> {
    return undefined;
  }

  getPostOfficeBoxes(pageNumber: number, pageSize: number, order: string): Observable<PostOfficeBox[]> {
    return undefined;
  }

  savePostOfficeBox(postOfficeBox: PostOfficeBox): Observable<PostOfficeBox> {
    return undefined;
  }

  updatePostOfficeBox(siteId: string, postOfficeBox: PostOfficeBox): Observable<number> {
    return undefined;
  }
}