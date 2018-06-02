export function shapeValuesResponse(data:any, pageNumber:number, pageSize:number, items:any, totalItems:number, sort:any) {
  return {
    values:data,
    page:{
      number:pageNumber,
      size:pageSize,
      items:items,
      totalItems:totalItems
    },
    sort:sort
  }
}

export function shapeValuesResponse2(data:any) {
  return {
    values: data,
    page: {},
    sort: {}
  }
}
