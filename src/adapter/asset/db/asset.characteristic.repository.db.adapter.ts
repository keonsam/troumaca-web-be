import {AssetCharacteristicRepository} from "../../../repository/asset.characteristic.repository";
import {AssetCharacteristic} from "../../../data/asset/asset.characteristic";
import { Observable, Observer, of } from "rxjs";
import {Affect} from "../../../data/affect";
import {generateUUID} from "../../../uuid.generator";
import {assetCharacteristics} from "../../../db";
import {SkipGenerator} from "../../util/skip.generator";
import {Sort} from "../../../util/sort";
import { Page} from "../../../data/page/page";
import {SortGenerator} from "../../util/sort.generator";
import { CharacteristicType } from "../../../data/asset/characteristic.type";
import { AssetCharacteristics } from "../../../data/asset/asset.characteristics";
import { HeaderBaseOptions } from "../../../header.base.options";
import { AssetCharacteristicRequest } from "../../../graphql/asset/dto/asset.characteristic.request";
import { mapObjectProps } from "../../../graphql/object.property.mapper";

const continuous = new CharacteristicType("054b50c2-9e8a-4cfb-8bac-54af9ac53613", "Continuous");
const category = new CharacteristicType("2f062d58-f464-40a6-921a-a49528f205f6", "Category");
const types: CharacteristicType[] = [continuous, category];
export class AssetCharacteristicRepositoryNeDbAdapter implements AssetCharacteristicRepository {
    addAssetCharacteristic(assetCharacteristicInput: AssetCharacteristicRequest, headerOptions?: HeaderBaseOptions): Observable<AssetCharacteristic> {
        const assetCharacteristic: AssetCharacteristic = mapObjectProps(assetCharacteristicInput, new AssetCharacteristic());
        assetCharacteristic.assetCharacteristicId = generateUUID();
        assetCharacteristic.version = generateUUID();
        assetCharacteristic.dateModified = new Date();
        assetCharacteristic.ownerPartyId = headerOptions.ownerPartyId;

        return Observable.create(function (observer: Observer<AssetCharacteristic>) {
            assetCharacteristics.insert(assetCharacteristic, function (err: any, doc: any) {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(doc);
                }
                observer.complete();
            });
        });
    }

    deleteAssetCharacteristic(assetCharacteristicId: string, headerOptions?: HeaderBaseOptions): Observable<Affect> {
        return Observable.create(function (observer: Observer<Affect>) {
            assetCharacteristics.remove(
                {assetCharacteristicId: assetCharacteristicId},
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

    findAssetCharacteristics(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetCharacteristic[]> {
        return Observable.create(function (observer: Observer<AssetCharacteristic[]>) {
            assetCharacteristics.count({ownerPartyId: headerOptions.ownerPartyId}, function (err, count) {
                const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
                assetCharacteristics.find({name: new RegExp(searchStr)})
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

    getAssetCharacteristicById(assetCharacteristicId: string, headerOptions?: HeaderBaseOptions): Observable<AssetCharacteristic> {
        return Observable.create(function (observer: Observer<AssetCharacteristic>) {
            // , ownerPartyId:ownerPartyId
            assetCharacteristics.find(
                {assetCharacteristicId: assetCharacteristicId},
                (err: any, docs: any) => {
                    if (!err) {
                        observer.next(docs[0]);
                    } else {
                        observer.error(err);
                    }
                    observer.complete();
                });
        });
    }

    // getAssetCharacteristicCount(headerOptions?: HeaderBaseOptions): Observable<number> {
    //   return Observable.create(function (observer: Observer<number>) {
    //     assetCharacteristics.count(
    //       { },
    //       (err: any, count: any) => {
    //         if (!err) {
    //           observer.next(count);
    //         } else {
    //           observer.error(err);
    //         }
    //         observer.complete();
    //       });
    //   });
    // }

    getAssetCharacteristics(tab?: string, search?: string, selected?: string[], pageNumber?: number, pageSize?: number, headerOptions?: HeaderBaseOptions): Observable<AssetCharacteristics> {
        return Observable.create(function (observer: Observer<AssetCharacteristics>) {
            assetCharacteristics.count({ownerPartyId: headerOptions.ownerPartyId}, function (err, count) {
                const skipAmount = pageNumber ? pageNumber * pageSize : 0;
                assetCharacteristics.find({
                    ownerPartyId: headerOptions.ownerPartyId,
                    name: new RegExp(search),
                    assetCharacteristicId: {$nin: selected}
                })
                    .skip(skipAmount)
                    .limit(pageSize)
                    .exec((err: any, docs: AssetCharacteristic[]) => {
                        if (!err) {
                            observer.next(new AssetCharacteristics(docs));
                        } else {
                            observer.error(err);
                        }
                        observer.complete();
                    });
            });
        });
    }

    updateAssetCharacteristic(assetCharacteristicId: string, assetCharacteristic: AssetCharacteristic, headerOptions?: HeaderBaseOptions): Observable<Affect> {
        assetCharacteristic.version = generateUUID();
        assetCharacteristic.dateModified = new Date();
        // ownerPartyId:assetCharacteristic.ownerPartyId
        return Observable.create(function (observer: Observer<Affect>) {
            assetCharacteristics.update(
                {assetCharacteristicId: assetCharacteristicId},
                {$set: assetCharacteristic},
                {upsert: true},
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

    getAssetCharacteristicTypes(options?: HeaderBaseOptions): Observable<CharacteristicType[]> {
        // not generated values
        return of(types);
    }

    getAssetCharacteristicType(assetCharacteristicTypeId: string, options?: HeaderBaseOptions): Observable<CharacteristicType> {
        return of(types.find(x => x.assetCharacteristicTypeId === assetCharacteristicTypeId));
    }

}
