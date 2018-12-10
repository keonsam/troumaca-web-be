// import { CoreOptions } from "request";

export function jsonRequestHeaderMap(options: any) {
  options["Content-Type"] = "application/json";
  return options;
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

}

export function putJsonOptions(uri: any, headers: any, json: any) {

  if (!uri) {
    throw new Error('A \"uri\" is required to make a post request');
  }

  const headerMap = new Map();
  headerMap.set("uri", uri);
  headerMap.set("method", "PUT");
  if (headers) {
    headerMap.set("headers", headers);
  }

  if (headers) {
    headerMap.set("json", json);
  }

  return {
    uri: uri,
    method: "PUT",
    headers: headers,
    json: json
  };

}

export function getJsonOptions(uri: any, headers: any, json: any) {

  if (!uri) {
    throw new Error('A \"uri\" is required to make a post request');
  }

  return {
    uri: uri,
    method: "GET",
    headers: headers,
    qs: json
  };

}

