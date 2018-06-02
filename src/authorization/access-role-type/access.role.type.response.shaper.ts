export function shapeAccessRoleTypeResponse2(dataName:string, data:any) {
  return {
    accessRoleTypes: data,
    page: {},
    sort: {}
  }
}

export function shapeAccessRoleTypesResponse(data:any, pageNumber:number, pageSize:number, items:any, totalItems:number, sort:any) {
  return {
    accessRoleTypes:data,
    page:{
      number:pageNumber,
      size:pageSize,
      items:items,
      totalItems:totalItems
    },
    sort:sort
  }
}
