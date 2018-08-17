export function shapeOrganizationResponse2(dataName: string, data: any) {
  return {
    [dataName]: data,
    page: {},
    sort: {}
  };
}

export function shapeOrganizationsResponse(data: any, pageNumber: number, pageSize: number, items: any, totalItems: number, sort: any) {
  return {
    organizations: data,
    page: {
      number: pageNumber,
      size: pageSize,
      items: items,
      totalItems: totalItems
    },
    sort: sort
  };
}
