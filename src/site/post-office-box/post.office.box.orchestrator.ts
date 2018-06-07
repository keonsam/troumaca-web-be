import {createPostOfficeBoxRepository} from './post.office.box.repository.factory';
import {PostOfficeBoxRepository} from "./post.office.box.repository";
import {Observable} from "rxjs/Observable";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {shapePostOfficeBoxesResponse} from "./post.office.box.response.shaper";
import {PostOfficeBox} from "./post.office.box";
import {Result} from "../../result.success";

export class PostOfficeBoxOrchestrator {

  private postOfficeBoxRepository:PostOfficeBoxRepository;

  constructor() {
    this.postOfficeBoxRepository = createPostOfficeBoxRepository();
  }

  getPostOfficeBoxes(number:number, size:number, field:string, direction:string):Observable<Result<any>> {
    let sort:string = getSortOrderOrDefault(field, direction);
    return this.postOfficeBoxRepository
      .getPostOfficeBoxes(number, size, sort)
      .flatMap(value => {
        return this.postOfficeBoxRepository
          .getPostOfficeBoxCount()
          .map(count => {
            let shapePostOfficeBoxesResp:any = shapePostOfficeBoxesResponse(value, number, size, value.length, count, sort);
            return new Result<any>(false, "postOfficeBoxes", shapePostOfficeBoxesResp);
          });
      });
  };

  getPostOfficeBoxById(siteId:string):Observable<PostOfficeBox> {
    return this.postOfficeBoxRepository.getPostOfficeBoxById(siteId);
  };

  savePostOfficeBox(postOfficeBox:PostOfficeBox):Observable<PostOfficeBox> {
    return this.postOfficeBoxRepository.savePostOfficeBox(postOfficeBox);
  };

  updatePostOfficeBox(siteId:string, postOfficeBox:PostOfficeBox):Observable<number> {
    return this.postOfficeBoxRepository.updatePostOfficeBox(siteId, postOfficeBox);
  };

  deletePostOfficeBox(siteId:string):Observable<number> {
    return this.postOfficeBoxRepository.deletePostOfficeBox(siteId);
  };


}
