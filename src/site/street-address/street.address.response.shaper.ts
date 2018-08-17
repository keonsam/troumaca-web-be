export function shapeStreetAddressResponse2(dataName: string, data: any) {
  return {
    [dataName]: data,
    page: {},
    sort: {}
  };
}

export function shapeStreetAddressesResponse(data: any, pageNumber: number, pageSize: number, items: any, totalItems: number, sort: any) {
  return {
    streetAddresses: data,
    page: {
      number: pageNumber,
      size: pageSize,
      items: items,
      totalItems: totalItems
    },
    sort: sort
  };
}
