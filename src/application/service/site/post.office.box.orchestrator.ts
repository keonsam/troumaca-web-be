import {createPostOfficeBoxDataProvider} from "../../../infrastructure/site/post.office.box.data.provider.factory";
import {PostOfficeBoxDataProvider} from "../../../port/post.office.box.data.provider";
import {Observable} from "rxjs";
import {flatMap, map} from "rxjs/operators";
import {getSortOrderOrDefault} from "../../../sort.order.util";
import {shapePostOfficeBoxesResponse} from "./post.office.box.response.shaper";
import {PostOfficeBox} from "../../../domain/model/site/post.office.box";
import {Result} from "../../../result.success";

export class PostOfficeBoxOrchestrator {

  private postOfficeBoxRepository: PostOfficeBoxDataProvider;

  constructor() {
    this.postOfficeBoxRepository = createPostOfficeBoxDataProvider();
  }

  getPostOfficeBoxes(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
    const sort: string = getSortOrderOrDefault(field, direction);
    return this.postOfficeBoxRepository
      .getPostOfficeBoxes(number, size, sort)
      .pipe(flatMap(value => {
        return this.postOfficeBoxRepository
          .getPostOfficeBoxCount()
          .pipe(map(count => {
            const shapePostOfficeBoxesResp: any = shapePostOfficeBoxesResponse(value, number, size, value.length, count, sort);
            return new Result<any>(false, "postOfficeBoxes", shapePostOfficeBoxesResp);
          }));
      }));
  }

  getPostOfficeBoxById(siteId: string): Observable<PostOfficeBox> {
    return this.postOfficeBoxRepository.getPostOfficeBoxById(siteId);
  }

  savePostOfficeBox(postOfficeBox: PostOfficeBox): Observable<PostOfficeBox> {
    return this.postOfficeBoxRepository.savePostOfficeBox(postOfficeBox);
  }

  updatePostOfficeBox(siteId: string, postOfficeBox: PostOfficeBox): Observable<number> {
    return this.postOfficeBoxRepository.updatePostOfficeBox(siteId, postOfficeBox);
  }

  deletePostOfficeBox(siteId: string): Observable<number> {
    return this.postOfficeBoxRepository.deletePostOfficeBox(siteId);
  }


}
