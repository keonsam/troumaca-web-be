import { Brand } from "../data/asset/brand";
import {Observable} from "rxjs";

export interface BrandRepository {

  findBrands(searchStr: string, pageSize: number, options: any): Observable<Brand[]>;

  getBrands(pageNumber: number, pageSize: number, order: string, options: any): Observable<Brand[]>;

  getBrandCount(options: any): Observable<number>;

  getBrandById(brandId: string, options: any): Observable<Brand>;

  saveBrand(brand: Brand, options: any): Observable<Brand>;

  updateBrand(brandId: string, brand: Brand, options: any): Observable<number>;

  deleteBrand(brandId: string, options: any): Observable<number>;

}
