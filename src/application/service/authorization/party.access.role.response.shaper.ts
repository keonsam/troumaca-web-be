export function shapePartyAccessRoleResponse2(dataName: string, data: any) {
  return {
    partyAccessRoles: data,
    page: {},
    sort: {}
  };
}

export function shapePartyAccessRolesResponse(data: any, pageNumber: number, pageSize: number, items: any, totalItems: number, sort: any) {
  return {
    partyAccessRoles: data,
    page: {
      number: pageNumber,
      size: pageSize,
      items: items,
      totalItems: totalItems
    },
    sort: sort
  };
}
