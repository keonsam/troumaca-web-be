import {createBrandRepositoryFactory} from "../adapter/asset/brand.repository.factory";
// import {shapeBrandsResponse} from "./brand.response.shaper";
import {getSortOrderOrDefault} from "../sort.order.util";
import {BrandRepository} from "../repository/brand.repository";
import {Brand} from "../data/asset/brand";
import {Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {Result} from "../result.success";

export class BrandOrchestrator {

    private brandRepository: BrandRepository;

    constructor(options?: any) {
        this.brandRepository = createBrandRepositoryFactory(options);
    }

    findBrands(searchStr: string, pageSize: number, options: any): Observable<Brand[]> {
        return this.brandRepository.findBrands(searchStr, pageSize, options);
    }

    getBrands(number: number, size: number, field: string, direction: string, options: any): Observable<Result<any>> {
        const sort: string = getSortOrderOrDefault(field, direction);
        return this.brandRepository
            .getBrands(number, size, sort, options)
            .pipe(switchMap((brands: Brand[]) => {
                return this.brandRepository
                    .getBrandCount(options)
                    .pipe(map((count: number) => {
                        const shapeBrandsResp: any = {};
                          //(brands, number, size, brands.length, count, sort);
                        return new Result<any>(false, "brands", shapeBrandsResp);
                    }));
            }));
    }

    getBrandById(brandId: string, options: any): Observable<Brand> {
        return this.brandRepository.getBrandById(brandId, options);
    }

    saveBrand(brand: Brand, options: any): Observable<Brand> {
        return this.brandRepository.saveBrand(brand, options);
    }

    updateBrand(brandId: string, brand: Brand, options: any): Observable<number> {
        return this.brandRepository.updateBrand(brandId, brand, options);
    }

    deleteBrand(brandId: string, options: any): Observable<number> {
        return this.brandRepository.deleteBrand(brandId, options);
    }

}

