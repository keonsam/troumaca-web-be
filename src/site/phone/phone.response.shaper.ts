export function shapePhoneResponse2(dataName: string, data: any) {
  return {
    [dataName]: data,
    page: {},
    sort: {}
  };
}

export function shapePhonesResponse(data: any, pageNumber: number, pageSize: number, items: any, totalItems: number, sort: any) {
  return {
    phones: data,
    page: {
      number: pageNumber,
      size: pageSize,
      items: items,
      totalItems: totalItems
    },
    sort: sort
  };
}
