export function shapeOrganizationResponse2(dataName: string, data: any) {
  return {
    [dataName]: data,
    page: {},
    sort: {}
  };
}
