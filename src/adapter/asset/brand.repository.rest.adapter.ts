import { BrandRepository } from "../../repository/brand.repository";
import { Brand} from "../../data/asset/brand";
import { Observable } from "rxjs";

export class BrandRepositoryRestAdapter implements BrandRepository {

  constructor() {
  }

  findBrands(searchStr: string, pageSize: number, options: any): Observable<Brand[]> {
    return undefined;
  }

  getBrands(pageNumber: number, pageSize: number, order: string, options: any): Observable<Brand[]> {
    return undefined;
  }

  getBrandCount(options: any): Observable<number> {
    return undefined;
  }

  getBrandById(brandId: string, options: any): Observable<Brand> {
    return undefined;
  }

  saveBrand(brand: Brand, options: any): Observable<Brand> {
    return undefined;
  }

  updateBrand(brandId: string, brand: Brand, options: any): Observable<number> {
    return undefined;
  }

  deleteBrand(brandId: string, options: any): Observable<number> {
    return undefined;
  }

}
