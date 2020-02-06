import {Observable} from "rxjs";
import request from "request";
import {jsonRequestHeaderMap, postJsonOptions} from "../../../request.helpers";
import {AuthenticatedCredential} from "../../../domain/model/authentication/authenticated.credential";
import { HeaderBaseOptions } from "../../../header.base.options";
import {Service} from "typedi";
import {LoginDataProvider} from "../../../port/login.data.provider";

@Service("restCredentialDataProvider")
export class RestLoginDataProvider implements LoginDataProvider {

  constructor(private registrarUrl: string) {
  }

  authenticate(username: string, password: string, options?: HeaderBaseOptions): Observable<AuthenticatedCredential> {
    const headerMap = jsonRequestHeaderMap(options ? options.toHeaders() : {});

    const json = {
      username: username,
      password: password
    };

    const uriAndPath: string = `${this.registrarUrl}/login`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);

    return new Observable(observer => {
      request(requestOptions, function (error: any, response: any, body: any) {
        try {
          if (error) {
            observer.error(error);
          } else if (response && response.statusCode != 200) {
            observer.error(body);
          } else {
            const authenticatedCredential: AuthenticatedCredential = new AuthenticatedCredential();
            authenticatedCredential.state = body["authenticatedCredential"]["state"];
            authenticatedCredential.confirmation = body["authenticatedCredential"]["confirmation"];
            authenticatedCredential.sessionId = body["sessionDto"]["createdSession"]["sessionEvent"]["session"]["sessionId"];
            observer.next(authenticatedCredential);
          }
          observer.complete();
        } catch (e) {
          observer.error(new Error(e.message));
          observer.complete();
        }
      });
    });
  }

}
