export function mapObjectProps(fromObject: any, toObject: any) {
  if (fromObject === undefined) {
    return toObject;
  }

  if (toObject === undefined) {
    return toObject;
  }

  for (const fromKey in fromObject) {
    if (fromObject.hasOwnProperty(fromKey)) {
      toObject[fromKey] = fromObject[fromKey];
    }
  }

  return toObject;
}
