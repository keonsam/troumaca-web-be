// import {Observable} from "rxjs";
// import {Affect} from "../../domain/model/affect";
// import {AssetBrand} from "../../domain/model/asset/asset.brand";
// import {Page} from "../../util/page";
// import {Sort} from "../../util/sort";
// import {AssetBrandRepository} from "../../repository/asset.brand.data.provider";
// import {createAssetBrandDataProvider} from "../../adapter/asset/asset.brand.data.provider.factory";
//
// export class AssetBrandOrchestrator {
//
//   private assetBrandRepository: AssetBrandRepository;
//
//   constructor(options?: any) {
//     this.assetBrandRepository = createAssetBrandDataProvider(options);
//   }
//
//   addAssetBrand(assetBrand: AssetBrand, headerOptions?: any): Observable<AssetBrand> {
//     return this.assetBrandRepository.addAssetBrand(assetBrand, headerOptions);
//   }
//
//   findAssetBrands(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetBrand[]> {
//     return this.assetBrandRepository.findAssetBrands(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
//   }
//
//   getAssetBrands(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetBrand[]>> {
//     return this.assetBrandRepository.getAssetBrands(ownerPartyId, pageNumber, pageSize, sort, headerOptions);
//   }
//
//   updateAssetBrand(assetBrand: AssetBrand, headerOptions?: any): Observable<Affect> {
//     return this.assetBrandRepository.updateAssetBrand(assetBrand, headerOptions);
//   }
//
//   getAssetBrandById(assetBrandId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetBrand> {
//     return this.assetBrandRepository.getAssetBrandById(assetBrandId, ownerPartyId, headerOptions);
//   }
//
//   deleteAssetBrand(assetBrandId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
//     return this.assetBrandRepository.deleteAssetBrand(assetBrandId, ownerPartyId, headerOptions);
//   }
//
// }
