export class SkipGenerator {
  static generate(page: number, size: number, total: number) {
    if (page <= 0) {
      return 0;
    } else if (size <= 0) {
      return 0;
    } else if (total <= 0) {
      return 0;
    }

    let pages = total/size;

    if (page > pages) {
      return 0;
    }

    return Math.floor((pages * page) - page);
  }
}