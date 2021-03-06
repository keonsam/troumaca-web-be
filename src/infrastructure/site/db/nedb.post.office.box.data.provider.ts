import {PostOfficeBoxDataProvider} from "../../../port/post.office.box.data.provider";
import {Observable, Observer} from "rxjs";
import {RepositoryKind} from "../../../repository.kind";
import {postOfficeBoxes} from "../../../db";
import {PostOfficeBox} from "../../../domain/model/site/post.office.box";
import {calcSkip} from "../../../db.util";
import {generateUUID} from "../../../uuid.generator";

export class NedbPostOfficeBoxDataProvider implements PostOfficeBoxDataProvider {

  private defaultPageSize: number = 10;

  savePostOfficeBox(postOfficeBox: PostOfficeBox): Observable<PostOfficeBox> {
    postOfficeBox.siteId = generateUUID();
    return Observable.create(function (observer: Observer<PostOfficeBox>) {
      postOfficeBoxes.insert(postOfficeBox, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(postOfficeBox);
        }
        observer.complete();
      });
    });
  }

  getPostOfficeBoxes(pageNumber: number, pageSize: number, order: string): Observable<PostOfficeBox[]> {
    const localDefaultPageSize = this.defaultPageSize;
    return Observable.create(function (observer: Observer<PostOfficeBox[]>) {
      const skip = calcSkip(pageNumber, pageSize, localDefaultPageSize);
      postOfficeBoxes.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getPostOfficeBoxCount(): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      postOfficeBoxes.count({}, function (err: any, count: number) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getPostOfficeBoxById(siteId: string): Observable<PostOfficeBox> {
    return Observable.create(function (observer: Observer<PostOfficeBox>) {
      const query = {
        "siteId": siteId
      };
      postOfficeBoxes.findOne(query, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  updatePostOfficeBox(siteId: string, postOfficeBox: PostOfficeBox): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      const query = {
        "siteId": siteId
      };
      postOfficeBoxes.update(query, postOfficeBox, {}, function (err: any, numReplaced: number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  deletePostOfficeBox(siteId: string): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      const query = {
        "siteId": siteId
      };
      postOfficeBoxes.remove(query, {}, function (err: any, numRemoved: number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

}

// class PostOfficeBoxRestRepository implements PostOfficeBoxDataProvider {
//
//   deletePostOfficeBox(siteId: string): Observable<number> {
//     return undefined;
//   }
//
//   getPostOfficeBoxById(siteId: string): Observable<PostOfficeBox> {
//     return undefined;
//   }
//
//   getPostOfficeBoxCount(): Observable<number> {
//     return undefined;
//   }
//
//   getPostOfficeBoxes(pageNumber: number, pageSize: number, order: string): Observable<PostOfficeBox[]> {
//     return undefined;
//   }
//
//   savePostOfficeBox(postOfficeBox: PostOfficeBox): Observable<PostOfficeBox> {
//     return undefined;
//   }
//
//   updatePostOfficeBox(siteId: string, postOfficeBox: PostOfficeBox): Observable<number> {
//     return undefined;
//   }
// }

// export function createPostOfficeBoxRepository(kind?: RepositoryKind): PostOfficeBoxDataProvider {
//   switch (kind) {
//     case RepositoryKind.Nedb:
//       return new NedbPostOfficeBoxDataProvider();
//     case RepositoryKind.Rest:
//       return new PostOfficeBoxRestRepository();
//     default:
//       return new NedbPostOfficeBoxDataProvider();
//   }
// }
