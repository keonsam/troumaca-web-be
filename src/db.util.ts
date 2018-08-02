export function calcSkip(pageNumber: number, pageSize: number, defaultPageSize: number) {
    if (!pageNumber) {
      return 0;
    }

    if (pageNumber <= 1) {
      return 0;
    }

    if (!pageSize) {
      pageSize = defaultPageSize;
    }

    return (pageNumber - 1) * pageSize;
}