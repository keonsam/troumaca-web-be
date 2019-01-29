import {BrandRepository} from "../../repository/brand.repository";
import { Brand} from "../../data/asset/brand";
import {generateUUID} from "../../uuid.generator";
import { assetBrands } from "../../db";
import {calcSkip} from "../../db.util";
import {Observable, Observer} from "rxjs";

export class BrandRepositoryDbAdapter implements BrandRepository {

    private defaultPageSize: number = 10;

    constructor() {
    }

    findBrands(searchStr: string, pageSize: number): Observable<Brand[]> {
        const searchStrLocal = new RegExp(searchStr);
        const query = searchStr ? {name: {$regex: searchStrLocal}} : {};
        return Observable.create((observer: Observer<Brand[]>) => {
            assetBrands.find(query).limit(pageSize).exec((err: any, docs: any) => {
                if (!err) {
                    observer.next(docs);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getBrands(pageNumber: number, pageSize: number, order: string): Observable<Brand[]> {
        const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
        return Observable.create((observer: Observer<Brand[]>) => {
            assetBrands.find({}).skip(skip).limit(pageSize).exec(function (err: any, docs: any) {
                if (!err) {
                    observer.next(docs);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getBrandCount(): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            assetBrands.count({}, function (err: any, count: number) {
                if (!err) {
                    observer.next(count);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getBrandById(brandId: string): Observable<Brand> {
        return Observable.create((observer: Observer<Brand>) => {
            const query = {"brandId": brandId};
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

    saveBrand(brand: Brand): Observable<Brand> {
        brand.brandId = generateUUID();
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

    updateBrand(brandId: string, brand: Brand): Observable<number> {
        const query = {brandId};
        return Observable.create(function (observer: Observer<number>) {
            assetBrands.update(query, brand, {}, function (err: any, numReplaced: number) {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    deleteBrand(brandId: string): Observable<number> {
        const query = {brandId};
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
