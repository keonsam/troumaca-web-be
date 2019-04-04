import {createBrandRepositoryFactory} from "../../adapter/asset/brand.repository.factory";
import {BrandRepository} from "../../repository/brand.repository";
import {Brand} from "../../data/asset/brand";
import {Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import { Brands } from "../../data/asset/brands";
import { Page } from "../../data/page/page";
import { Sort } from "../../util/sort";
import { HeaderBaseOptions } from "../../header.base.options";
import { RepositoryKind } from "../../repository.kind";

export class BrandOrchestrator {

    private brandRepository: BrandRepository;

    constructor(options?: RepositoryKind) {
        this.brandRepository = createBrandRepositoryFactory(options);
    }

    findBrands(searchStr: string, pageSize: number, options?: HeaderBaseOptions): Observable<Brand[]> {
        return this.brandRepository.findBrands(searchStr, pageSize, options);
    }

    getBrands(number: number, size: number, sort: Sort, options?: HeaderBaseOptions): Observable<Brands> {
        return this.brandRepository.getBrands(number, size, sort, options);
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

