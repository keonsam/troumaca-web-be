import { Brand } from "../domain/model/asset/brand";
import {Observable} from "rxjs";
import { Sort } from "../util/sort";
import { HeaderBaseOptions } from "../header.base.options";
import { Brands } from "../domain/model/asset/brands";

export interface BrandDataProvider {

  findBrands(searchStr: string, pageSize: number, options?: HeaderBaseOptions): Observable<Brand[]>;

  getBrands(search: string, pageNumber: number, pageSize: number, options?: HeaderBaseOptions): Observable<Brands>;

  // getBrandCount(options?: HeaderBaseOptions): Observable<number>;

  getBrandById(brandId: string, options?: HeaderBaseOptions): Observable<Brand>;

  saveBrand(brand: Brand, options?: HeaderBaseOptions): Observable<Brand>;

  updateBrand(brandId: string, brand: Brand, options?: HeaderBaseOptions): Observable<number>;

  deleteBrand(brandId: string, options?: HeaderBaseOptions): Observable<number>;

}
