// import { CoreOptions } from "request";

export function jsonRequestHeaderMap(options: any) {

  let correlationId = "";
  if (options.correlationId) {
    correlationId = options.correlationId
  } else if (options.correlationid) {
    correlationId = options.correlationid
  }

  return {
    "Content-Type": "application/json",
    "correlationId": correlationId,
    "sourcePartyId" : "",
  };

}

export function postJsonOptions(uri: any, headers: any, json: any) {

  if (!uri) {
    throw new Error('A \"uri\" is required to make a post request');
  }

  const headerMap = new Map();
  headerMap.set("uri", uri);
  headerMap.set("method", "POST");
  if (headers) {
    headerMap.set("headers", headers);
  }

  if (headers) {
    headerMap.set("json", json);
  }

  return {
    uri: uri,
    method: "POST",
    headers: headers,
    json: json
  };

  // if (headers) {
    // headerMap.set("headers", headers);
    // options.headers = headers;
  // }

  // if (headers) {
    // headerMap.set("json", json);
    // options.json = json;
  // }

  // return options;
}
