export function shapeEmailResponse2(dataName:string, data:any) {
  return {
    [dataName]: data,
    page: {},
    sort: {}
  }
}

export function shapeEmailsResponse(data:any, pageNumber:number, pageSize:number, items:any, totalItems:number, sort:any) {
  return {
    emails:data,
    page:{
      number:pageNumber,
      size:pageSize,
      items:items,
      totalItems:totalItems
    },
    sort:sort
  }
}
