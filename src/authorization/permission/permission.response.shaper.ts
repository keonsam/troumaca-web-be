export function shapePermissionResponse2(dataName:string, data:any) {
  return {
    [dataName]: data,
    page: {},
    sort: {}
  }
}

export function shapePermissionsResponse(data:any, pageNumber:number, pageSize:number, items:any, totalItems:number, sort:any) {
  return {
    permissions:data,
    page:{
      number:pageNumber,
      size:pageSize,
      items:items,
      totalItems:totalItems
    },
    sort:sort
  }
}
