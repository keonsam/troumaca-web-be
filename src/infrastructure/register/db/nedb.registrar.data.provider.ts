import {  registrars } from "../../../db";
import { Observable, Observer} from "rxjs";
import { generateUUID } from "../../../uuid.generator";
import {RegisterDataProvider} from "../../../port/register.data.provider";
import {RegisterCustomerRequest} from "../../../domain/model/register/request/register.customer.request";
import {HeaderBaseOptions} from "../../../header.base.options";
import {RegisterCustomerResponse} from "../../../domain/model/register/dto/register.customer.response";

export class NedbRegistrarDataProvider implements RegisterDataProvider {

    registerCustomer(registerCustomerRequest?: RegisterCustomerRequest, options?: HeaderBaseOptions): Observable<RegisterCustomerResponse> {
        const reg = {
            "register": generateUUID(),
            "firstName": registerCustomerRequest.firstName,
            "lastName": registerCustomerRequest.lastName,
            "organizationName": registerCustomerRequest.organizationName,
            "username": registerCustomerRequest.username,
            "password": registerCustomerRequest.password,
            "confirmPassword": registerCustomerRequest.confirmPassword
        };

        return new Observable(observer => {
            registrars.insert(reg, function(err: any, doc: any) {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(doc);
                }
                observer.complete();
            });
        });
    }
}
