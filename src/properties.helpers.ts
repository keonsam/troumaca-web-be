import PropertiesReader from "properties-reader";
import * as path from "path";

const propertyFile = path.resolve(__dirname, ".") + "/properties.file";
export let properties = PropertiesReader(propertyFile);
