import {createOrganizationRepository} from "../../../adapter/party/organization.repository.factory";
import {OrganizationRepository} from "../../../repository/organization.repository";
import {Organization} from "../../../data/party/organization";
import {Observable} from "rxjs";

export class OrganizationProfileOrchestrator {

  private organizationRepository: OrganizationRepository;

  constructor() {
    this.organizationRepository = createOrganizationRepository();
  }

  findOrganization(searchStr: string, pageSize: number): Observable<Organization[]> {
    return this.organizationRepository.findOrganization(searchStr, pageSize);
  }

}
