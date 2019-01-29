export function shapeAssetCharacteristicsResponse(data: any, pageNumber: number, pageSize: number, items: any, totalItems: number, sort: any) {
  return {
    assetCharacteristics: data,
    page: {
      number: pageNumber,
      size: pageSize,
      items: items,
      totalItems: totalItems
    },
    sort: sort
  };
}
