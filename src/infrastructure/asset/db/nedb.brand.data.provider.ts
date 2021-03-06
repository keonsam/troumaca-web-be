import {BrandDataProvider} from "../../../port/brand.data.provider";
import { Brand} from "../../../domain/model/asset/brand";
import {generateUUID} from "../../../uuid.generator";
import { assetBrands } from "../../../db";
import {Observable, Observer} from "rxjs";
// import { Sort } from "../../../util/sort";
// import { SkipGenerator } from "../../util/skip.generator";
// import { SortGenerator } from "../../util/sort.generator";
import { Page } from "../../../domain/model/page/page";
import { HeaderBaseOptions } from "../../../header.base.options";
import { Brands } from "../../../domain/model/asset/brands";

export class NedbBrandDataProvider implements BrandDataProvider {

    private defaultPageSize: number = 10;

    constructor() {
    }

    findBrands(searchStr: string, pageSize: number, options?: HeaderBaseOptions): Observable<Brand[]> {
        const searchStrLocal = new RegExp(searchStr);
        const query = searchStr ? {
            name: {$regex: searchStrLocal},
            ownerPartyId: options.ownerPartyId
        } : { ownerPartyId: options.ownerPartyId };
        return Observable.create((observer: Observer<Brand[]>) => {
            assetBrands.find(query).limit(100).exec((err: any, docs: any) => {
                if (!err) {
                    observer.next(docs);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getBrands(search: string, pageNumber: number, pageSize: number, options?: HeaderBaseOptions): Observable<Brands> {
        return Observable.create(function (observer: Observer<Brands>) {
            assetBrands.count({ownerPartyId: options.ownerPartyId }, function (err, count) {
                // const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
                // const generate = SortGenerator.generate(sort);
                const skipAmount = pageNumber ? pageNumber * pageSize : 0;
                assetBrands.find({
                    ownerPartyId: options.ownerPartyId,
                    name: new RegExp(search),
                })
                    .skip(skipAmount)
                    .limit(pageSize)
                    .exec((err: any, docs: Brand[]) => {
                        if (!err) {
                            observer.next(new Brands(docs, new Page(pageNumber, pageSize, docs.length, count)));
                        } else {
                            observer.error(err);
                        }
                        observer.complete();
                    });
            });
        });
    }

    // getBrandCount(options?: HeaderBaseOptions): Observable<number> {
    //     const query = {
    //         // ownerPartyId: options["Owner-Party-Id"]
    //     };
    //     return Observable.create(function (observer: Observer<number>) {
    //         assetBrands.count(query, function (err: any, count: number) {
    //             if (!err) {
    //                 observer.next(count);
    //             } else {
    //                 observer.error(err);
    //             }
    //             observer.complete();
    //         });
    //     });
    // }

    getBrandById(brandId: string, options?: HeaderBaseOptions): Observable<Brand> {
        return Observable.create((observer: Observer<Brand>) => {
            const query = {
                "brandId": brandId,
                // ownerPartyId: options["Owner-Party-Id"]
            };
            assetBrands.findOne(query, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    saveBrand(brand: Brand, options?: HeaderBaseOptions): Observable<Brand> {
        brand.brandId = generateUUID();
        brand.ownerPartyId = options.ownerPartyId;
        return Observable.create(function (observer: Observer<Brand>) {
            assetBrands.insert(brand, function (err: any, doc: any) {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(doc);
                }
                observer.complete();
            });
        });
    }

    updateBrand(brandId: string, brand: Brand, options?: HeaderBaseOptions): Observable<number> {
        const query = {
            brandId
            // ownerPartyId: options["Owner-Party-Id"]
        };
        return Observable.create(function (observer: Observer<number>) {
            assetBrands.update(query, { $set: brand}, {}, function (err: any, numReplaced: number) {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    deleteBrand(brandId: string, options?: HeaderBaseOptions): Observable<number> {
        const query = {
            brandId,
            // ownerPartyId: options["Owner-Party-Id"]
        };
        return Observable.create(function (observer: Observer<number>) {
            assetBrands.remove(query, {}, function (err: any, numRemoved: number) {
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
