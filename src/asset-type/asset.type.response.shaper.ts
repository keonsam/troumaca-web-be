export function shapeAssetTypesResponse(data:any, pageNumber:number, pageSize:number, items:any, totalItems:number, sort:any) {
  return {
    assetTypes:data,
    page:{
      number:pageNumber,
      size:pageSize,
      items:items,
      totalItems:totalItems
    },
    sort:sort
  }
}

export function shapeAssetTypesResponse2( data:any) {
  return {
    assetTypes: data,
    page: {},
    sort: {}
  }
}
