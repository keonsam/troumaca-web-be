export function shapePersonResponse2(dataName:string, data:any) {
  return {
    [dataName]: data,
    page: {},
    sort: {}
  }
}
