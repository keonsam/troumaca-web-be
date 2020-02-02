import {createBrandDataProvider} from "../../../../infrastructure/asset/brand.data.provider.factory";
import {BrandDataProvider} from "../../../../port/brand.data.provider";
import {Brand} from "../../../../domain/model/asset/brand";
import {Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import { Brands } from "../../../../domain/model/asset/brands";
// import { Page } from "../../domain/model/page/page";
import { Sort } from "../../../../util/sort";
import { HeaderBaseOptions } from "../../../../header.base.options";
import { RepositoryKind } from "../../../../repository.kind";

export class BrandOrchestrator {

    private brandRepository: BrandDataProvider;

    constructor(options?: RepositoryKind) {
        this.brandRepository = createBrandDataProvider(options);
    }

    findBrands(searchStr: string, pageSize: number, options?: HeaderBaseOptions): Observable<Brand[]> {
        return this.brandRepository.findBrands(searchStr, pageSize, options);
    }

    getBrands(search: string, number: number, size: number, options?: HeaderBaseOptions): Observable<Brands> {
        return this.brandRepository.getBrands(search, number, size, options);
    }

    getBrandById(brandId: string, options?: HeaderBaseOptions): Observable<Brand> {
        return this.brandRepository.getBrandById(brandId, options);
    }

    saveBrand(brand: Brand, options?: HeaderBaseOptions): Observable<Brand> {
        return this.brandRepository.saveBrand(brand, options);
    }

    updateBrand(brandId: string, brand: Brand, options?: HeaderBaseOptions): Observable<number> {
        return this.brandRepository.updateBrand(brandId, brand, options);
    }

    deleteBrand(brandId: string, options?: HeaderBaseOptions): Observable<number> {
        return this.brandRepository.deleteBrand(brandId, options);
    }

}

