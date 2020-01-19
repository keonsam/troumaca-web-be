import { BrandRepository } from "../../repository/brand.repository";
import { Brand} from "../../data/asset/brand";
import { Observable } from "rxjs";
import { Sort } from "../../util/sort";
import { HeaderBaseOptions } from "../../header.base.options";
import { Brands } from "../../data/asset/brands";

export class BrandRepositoryRestAdapter implements BrandRepository {

  constructor() {
  }

  findBrands(searchStr: string, pageSize: number, options?: HeaderBaseOptions): Observable<Brand[]> {
    return undefined;
  }

  getBrands(search: string, pageNumber: number, pageSize: number, options?: HeaderBaseOptions): Observable<Brands> {
    return undefined;
  }

  // getBrandCount(options?: HeaderBaseOptions): Observable<number> {
  //   return undefined;
  // }

  getBrandById(brandId: string, options?: HeaderBaseOptions): Observable<Brand> {
    return undefined;
  }

  saveBrand(brand: Brand, options?: HeaderBaseOptions): Observable<Brand> {
    return undefined;
  }

  updateBrand(brandId: string, brand: Brand, options?: HeaderBaseOptions): Observable<number> {
    return undefined;
  }

  deleteBrand(brandId: string, options?: HeaderBaseOptions): Observable<number> {
    return undefined;
  }

}
