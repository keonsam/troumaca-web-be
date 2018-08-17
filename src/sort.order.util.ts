export function getSortOrderOrDefault(field: string, direction: string): any {
  if (field && direction) {
    return {
      field: direction
    };
  } else {
    return {};
  }
}