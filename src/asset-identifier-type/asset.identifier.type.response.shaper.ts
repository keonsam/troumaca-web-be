export function shapeAssetIdentifierTypesResponse(data: any, pageNumber: number, pageSize: number, items: any, totalItems: number, sort: any) {
  return {
    assetIdentifierTypes: data,
    page: {
      number: pageNumber,
      size: pageSize,
      items: items,
      totalItems: totalItems
    },
    sort: sort
  };
}
