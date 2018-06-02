export function shapeAccessRoleResponse2(dataName:string, data:any) {
  return {
    accessRoles: data,
    page: {},
    sort: {}
  }
}

export function shapeAccessRolesResponse(data:any, pageNumber:number, pageSize:number, items:any, totalItems:number, sort:any) {
  return {
    accessRoles:data,
    page:{
      number:pageNumber,
      size:pageSize,
      items:items,
      totalItems:totalItems
    },
    sort:sort
  }
}
