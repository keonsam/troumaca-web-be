export function shapeUnitOfMeasuresResponse(data: any, pageNumber: number, pageSize: number, items: any, totalItems: number, sort: any) {
  return {
    unitOfMeasures: data,
    page: {
      number: pageNumber,
      size: pageSize,
      items: items,
      totalItems: totalItems
    },
    sort: sort
  };
}
