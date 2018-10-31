import {createOrganizationRepository} from "../../../adapter/party/organization.repository.factory";
import {createAccessRoleRepository} from "../../../adapter/authorization/access.role.repository.factory";
// import {createPersonRepository} from "../../../adapter/party/person.repository.factory";
import {OrganizationRepository} from "../../../repository/organization.repository";
import {Organization} from "../../../data/party/organization";
import {Observable, zip, forkJoin} from "rxjs";
import {map} from "rxjs/operators";
import {OrganizationProfile} from "../../../data/profile/organization.profile";
import {AccessRoleRepository} from "../../../repository/access.role.repository";
import {Photo} from "../../../data/photo/photo";

// import {PersonRepository} from "../../../repository/person.repository";

export class OrganizationProfileOrchestrator {

  private organizationRepository: OrganizationRepository;
  private accessRoleRepository: AccessRoleRepository;

  // private personRepository: PersonRepository;

  constructor() {
    this.organizationRepository = createOrganizationRepository();
    this.accessRoleRepository = createAccessRoleRepository();
    // this.personRepository = createPersonRepository();
  }

  createProfileOrganization(profile: OrganizationProfile, options?: any): Observable<Organization> {
    return this.organizationRepository.saveCustomerOrganization(profile.organization, options);
  }

  createProfilePhoto(profile: OrganizationProfile, options?: any): Observable<Photo> {
    return undefined;
  }

  createProfile(profile: OrganizationProfile): Observable<Organization[]> {
    const organizationObservable = this.organizationRepository.saveOrganization(profile.organization);
    const addAccessRolesObservable = this.accessRoleRepository.addAccessRoles(profile.accessRoles);
    // let personObservable = this.personRepository.addPerson(profile.person);


    // forkJoin([organizationObservable, addAccessRolesObservable, personObservable]).map(results => {
    forkJoin([organizationObservable, addAccessRolesObservable]).pipe(map(results => {
      const length1 = results.length;
      console.log(length1);
    }));

    // let observable = zip(organizationObservable, addAccessRolesObservable, personObservable);

    return undefined;
  }

}
