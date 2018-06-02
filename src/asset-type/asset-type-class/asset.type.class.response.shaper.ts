export function shapeAssetTypeClassesResponse(dataName:string, data:any, pageNumber:number, pageSize:number, items:any, totalItems:number, sort:string) {
  return {
    [dataName]:data,
    page:{
      number:pageNumber,
      size:pageSize,
      items:items,
      totalItems:totalItems
    },
    sort:sort
  }
}

export function shapeAssetTypeClassesResponse2(dataName:string, data:any) {
  return {
    [dataName]: data,
    page: {},
    sort: {}
  }
}
