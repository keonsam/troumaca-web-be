export function shapeResourceResponse2(dataName: string, data: any) {
  return {
    [dataName]: data,
    page: {},
    sort: {}
  };
}

export function shapeResourcesResponse(data: any, pageNumber: number, pageSize: number, items: any, totalItems: number, sort: any) {
  return {
    resources: data,
    page: {
      number: pageNumber,
      size: pageSize,
      items: items,
      totalItems: totalItems
    },
    sort: sort
  };
}
