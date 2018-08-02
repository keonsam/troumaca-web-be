export function shapeAttributesResponse(data: any, pageNumber: number, pageSize: number, items: any, totalItems: number, sort: string) {
  return {
    attributes: data,
    page: {
      number: pageNumber,
      size: pageSize,
      items: items,
      totalItems: totalItems
    },
    sort: sort
  };
}
