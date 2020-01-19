import {AssetCharacteristicTypeRepository} from "../../../repository/asset.characteristic.type.repository";
import {CharacteristicType} from "../../../data/asset/characteristic.type";
import { Observable, Observer, of } from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import {generateUUID} from "../../../uuid.generator";
import {assetCharacteristicTypes} from "../../../db";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";
import { CharacteristicTypes } from "../../../data/asset/characteristic.types";

// const continuous = new CharacteristicType("054b50c2-9e8a-4cfb-8bac-54af9ac53613", "Continuous Asset Characteristic");
// const category = new CharacteristicType("2f062d58-f464-40a6-921a-a49528f205f6", "Asset Category");
// const types: CharacteristicType[] = [continuous, category];

export class AssetCharacteristicTypeRepositoryNeDbAdapter implements AssetCharacteristicTypeRepository {

    getCharacteristicTypes(headerOptions?: any): Observable<CharacteristicTypes> {
        const characteristicTypes: CharacteristicTypes = new CharacteristicTypes();
        characteristicTypes.characteristicTypes = [
            new CharacteristicType("1", "Text", ["fas", "font"]),
            new CharacteristicType( "2", "Number", ["fas", "hashtag"]),
            new CharacteristicType("3", "Checkbox", ["fas", "check-square"]),
            new CharacteristicType("4", "Select", ["fas", "check"]),
            new CharacteristicType("5",  "Multi Select", ["fas", "check-double"]),
            new CharacteristicType("6",  "Date", ["fas", "calendar"]),
            new CharacteristicType("7", "Person", ["fas", "user"]),
            new CharacteristicType("8", "URL", ["fas", "link"]),
            new CharacteristicType("9", "Location", ["fas", "map-marker-alt"])
        ];
        return of(characteristicTypes);
    }


    // OTHERS
  addAssetCharacteristicType(assetCharacteristicType: CharacteristicType, headerOptions?: any): Observable<CharacteristicType> {
    // assetCharacteristicType.assetCharacteristicTypeId = generateUUID();
    assetCharacteristicType.version = generateUUID();
    assetCharacteristicType.dateModified = new Date();

    return Observable.create(function (observer: Observer<CharacteristicType>) {
      assetCharacteristicTypes.insert(assetCharacteristicType, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  deleteAssetCharacteristicType(assetCharacteristicTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      assetCharacteristicTypes.remove(
        {assetCharacteristicTypeId: assetCharacteristicTypeId, ownerPartyId: ownerPartyId},
        function (err: any, numRemoved: number) {
          if (err) {
            observer.error(err);
          } else {
            observer.next(new Affect(numRemoved));
          }
          observer.complete();
        });
    });
  }

  findAssetCharacteristicTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<CharacteristicType[]> {
    return Observable.create(function (observer: Observer<CharacteristicType[]>) {
      assetCharacteristicTypes.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetCharacteristicTypes.find({ownerPartyId: ownerPartyId, name: new RegExp(searchStr) })
          .skip(skipAmount)
          .limit(pageSize)
          .exec(
            (err: any, docs: any) => {
              if (!err) {
                observer.next(docs);
              } else {
                observer.error(err);
              }
              observer.complete();
            });
      });
    });
  }

  getAssetCharacteristicTypeById(assetCharacteristicTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<CharacteristicType> {
        return undefined;
      // return of(types.find(x => x.assetCharacteristicTypeId === assetCharacteristicTypeId));
    // return Observable.create(function (observer: Observer<CharacteristicType>) {
    //   // , ownerPartyId:ownerPartyId
    //   assetCharacteristicTypes.find(
    //     {assetCharacteristicTypeId:assetCharacteristicTypeId},
    //     (err: any, docs: any) => {
    //       if (!err) {
    //         observer.next(docs[0]);
    //       } else {
    //         observer.error(err);
    //       }
    //       observer.complete();
    //     })
    // });
  }

  getAssetCharacteristicTypeCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      assetCharacteristicTypes.count(
        {ownerPartyId: ownerPartyId},
        (err: any, count: any) => {
          if (!err) {
            observer.next(count);
          } else {
            observer.error(err);
          }
          observer.complete();
        });
    });
  }


  updateAssetCharacteristicType(assetCharacteristicType: CharacteristicType, headerOptions?: any): Observable<Affect> {
    assetCharacteristicType.version = generateUUID();
    assetCharacteristicType.dateModified = new Date();
    // ownerPartyId:assetCharacteristicType.ownerPartyId
    return Observable.create(function (observer: Observer<Affect>) {
      assetCharacteristicTypes.update(
        {assetCharacteristicTypeId: assetCharacteristicType.assetCharacteristicTypeId},
        assetCharacteristicType,
        { upsert: true },
        function (err: any, numReplaced: number, upsert: any) {
          if (err) {
            observer.error(err);
          } else {

            observer.next(new Affect(numReplaced));
          }
          observer.complete();
        });
    });
  }

}
