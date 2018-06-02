export function getStringValueOrDefault(strValue:string, defaultValue:string) {
  if (!strValue && !defaultValue) {
    return "";
  }

  if (!strValue && defaultValue) {
    return defaultValue;
  }

  return strValue;
}
