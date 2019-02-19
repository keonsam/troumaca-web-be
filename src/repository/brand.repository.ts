import { Brand } from "../data/asset/brand";
import {Observable} from "rxjs";

export interface BrandRepository {

  findBrands(searchStr: string, pageSize: number): Observable<Brand[]>;

  getBrands(pageNumber: number, pageSize: number, order: string): Observable<Brand[]>;

  getBrandCount(): Observable<number>;

  getBrandById(brandId: string): Observable<Brand>;

  saveBrand(brand: Brand): Observable<Brand>;

  updateBrand(brandId: string, brand: Brand): Observable<number>;

  deleteBrand(brandId: string): Observable<number>;

}
