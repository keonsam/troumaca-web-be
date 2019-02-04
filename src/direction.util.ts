import {Direction} from "./util/direction";

export function getDirectionValueOrDefault(value: string, defaultValue: Direction):Direction {
  if (!value) {
    return defaultValue;
  }

  if (value.toLowerCase() == "asc") {
    return Direction.ASC
  } else if (value.toLowerCase() == "desc") {
    return Direction.DESC
  } else if (value.toLowerCase() == "dsc") {
    return Direction.DESC
  }

  return null;
}
