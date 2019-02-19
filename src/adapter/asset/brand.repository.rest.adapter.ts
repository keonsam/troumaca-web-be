import { BrandRepository } from "../../repository/brand.repository";
import { Brand} from "../../data/asset/brand";
import { Observable } from "rxjs";

export class BrandRepositoryRestAdapter implements BrandRepository {

  constructor() {
  }

  findBrands(searchStr: string, pageSize: number): Observable<Brand[]> {
    return undefined;
  }

  getBrands(pageNumber: number, pageSize: number, order: string): Observable<Brand[]> {
    return undefined;
  }

  getBrandCount(): Observable<number> {
    return undefined;
  }

  getBrandById(brandId: string): Observable<Brand> {
    return undefined;
  }

  saveBrand(brand: Brand): Observable<Brand> {
    return undefined;
  }

  updateBrand(brandId: string, brand: Brand): Observable<number> {
    return undefined;
  }

  deleteBrand(brandId: string): Observable<number> {
    return undefined;
  }

}
