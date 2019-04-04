import { Brand } from "../data/asset/brand";
import {Observable} from "rxjs";
import { Sort } from "../util/sort";
import { HeaderBaseOptions } from "../header.base.options";
import { Brands } from "../data/asset/brands";

export interface BrandRepository {

  findBrands(searchStr: string, pageSize: number, options?: HeaderBaseOptions): Observable<Brand[]>;

  getBrands(pageNumber: number, pageSize: number, order: Sort, options?: HeaderBaseOptions): Observable<Brands>;

  // getBrandCount(options?: HeaderBaseOptions): Observable<number>;

  getBrandById(brandId: string, options?: HeaderBaseOptions): Observable<Brand>;

  saveBrand(brand: Brand, options?: HeaderBaseOptions): Observable<Brand>;

  updateBrand(brandId: string, brand: Brand, options?: HeaderBaseOptions): Observable<number>;

  deleteBrand(brandId: string, options?: HeaderBaseOptions): Observable<number>;

}
