import path from "path";
import Datastore from "nedb";

// reference data
const theDataTypesDb = path.resolve(__dirname, "..") + "/nedb/data-types.db";
const theUnitOfMeasurementDb = path.resolve(__dirname, "..") + "/nedb/unit-of-measurements.db";
const theUnitOfMeasurementSystemsDb = path.resolve(__dirname, "..") + "/nedb/unit-of-measurement-systems.db";
const theUnitMeasurementDimensionsDb = path.resolve(__dirname, "..") + "/nedb/unit-of-measurement-dimensions.db";
const theUnitMeasurementConversionsDb = path.resolve(__dirname, "..") + "/nedb/unit-of-measurement-conversions.db";

// asset / asset type
const theAssetsDb = path.resolve(__dirname, "..") + "/nedb/asset_type/assets.db";
const theAssetTypesDb = path.resolve(__dirname, "..") + "/nedb/asset_type/asset-types.db";
const theAssetRoleTypesDb = path.resolve(__dirname, "..") + "/nedb/asset_type/asset-role-types.db";
const theAssetNameTypesDb = path.resolve(__dirname, "..") + "/nedb/asset_type/asset-name-types.db";
const theAssetIdentifierTypesDb = path.resolve(__dirname, "..") + "/nedb/asset_type/asset-identifier-types.db";
const theAssetCharacteristicTypesDb = path.resolve(__dirname, "..") + "/nedb/asset_type/asset-characteristic-types.db";
const theBrandsDb = path.resolve(__dirname, "..") + "/nedb/asset_type/brands.db";
const theAssetCategoryLegalValuesDb = path.resolve(__dirname, "..") + "/nedb/asset_type/asset-category-legal-values.db";
const theAssetCharacteristicsDb = path.resolve(__dirname, "..") + "/nedb/asset_type/asset-characteristics.db";
const theAssetSpecificationsDb = path.resolve(__dirname, "..") + "/nedb/asset_type/asset-specifications.db";
const theOtherAssetTypesDb = path.resolve(__dirname, "..") + "/nedb/asset_type/other-asset-types.db";
const theAssetStructuresDb = path.resolve(__dirname, "..") + "/nedb/asset_type/asset-structures.db";
const theAssetTypeStructuresDb = path.resolve(__dirname, "..") + "/nedb/asset_type/asset-type-structures.db";
const theAssetStructureTypesDb = path.resolve(__dirname, "..") + "/nedb/asset_type/asset-structures-types.db";
const theAssetRolesDb = path.resolve(__dirname, "..") + "/nedb/asset_type/asset-roles.db";
const theAssetNamesDb = path.resolve(__dirname, "..") + "/nedb/asset_type/asset-names.db";
const theAssetIdentifiersDb = path.resolve(__dirname, "..") + "/nedb/asset_type/asset-identifiers.db";
const theAssetNameAssignmentsDb = path.resolve(__dirname, "..") + "/nedb/asset_type/asset-name-assignments.db";
const theAssetIdentifierAssignmentsDb = path.resolve(__dirname, "..") + "/nedb/asset_type/asset-identifier-assignments.db";
const theAssetCharacteristicAssignmentsDb = path.resolve(__dirname, "..") + "/nedb/asset_type/asset-characteristic-assignments.db";

const theAttributesDb = path.resolve(__dirname, "..") + "/nedb/asset_type/attributes.db";
const theAssignedAttributesDb = path.resolve(__dirname, "..") + "/nedb/asset_type/assigned-attributes.db";
const theAssetTypeClassesDb = path.resolve(__dirname, "..") + "/nedb/asset_type/asset-type-classes.db";
const theValuesDb = path.resolve(__dirname, "..") + "/nedb/asset_type/values.db";

// const theAssetCharsDb = path.resolve(__dirname, "..") + "/nedb/asset_type/asset-chars.db";
const theAssetKindsDb = path.resolve(__dirname, "..") + "/nedb/asset_type/asset-kinds.db";

// sites
const theSitesDb = path.resolve(__dirname, "..") + "/nedb/site/sites.db";
const theStreetAddressDb = path.resolve(__dirname, "..") + "/nedb/site/street-addresses.db";
const theTelephoneDb = path.resolve(__dirname, "..") + "/nedb/site/telephones.db";
const theEmailDb = path.resolve(__dirname, "..") + "/nedb/site/emails.db";
const theWebSiteDb = path.resolve(__dirname, "..") + "/nedb/site/web-sites.db";
const thePostOfficeBoxDb = path.resolve(__dirname, "..") + "/nedb/site/post-office-boxes.db";

// party
const theContactInfoDb = path.resolve(__dirname, "..") + "/nedb/party/contact-info.db";
const thePersonsDb = path.resolve(__dirname, "..") + "/nedb/party/persons.db";
const theOrganizationDb = path.resolve(__dirname, "..") + "/nedb/party/organizations.db";
const theRequestsDb = path.resolve(__dirname, "..") + "/nedb/party/requests.db";
const theUsersDb = path.resolve(__dirname, "..") + "/nedb/party/users.db";

// authentication
const theCredentialDb = path.resolve(__dirname, "..") + "/nedb/authentication/credentials.db";
const theRegistrationDb = path.resolve(__dirname, "..") + "/nedb/authentication/registrations.db";
const theCredentialConfirmationsDb = path.resolve(__dirname, "..") + "/nedb/authentication/credential_confirmations.db";

// file
const thePhotosDb = path.resolve(__dirname, "..") + "/nedb/file_meta_data/photos.db";

const sessionDb = path.resolve(__dirname, "..") + "/nedb/session/sessions.db";

const theShipmentsDb = path.resolve(__dirname, "..") + "/nedb/shipment/shipments.db";

// authorization
const accessRolesDb = path.resolve(__dirname, "..") + "/nedb/authorization/access-roles.db";
const accessRoleTypesDb = path.resolve(__dirname, "..") + "/nedb/authorization/access-role-types.db";
const grantsDb = path.resolve(__dirname, "..") + "/nedb/authorization/grants.db";
const permissionsDb = path.resolve(__dirname, "..") + "/nedb/authorization/permissions.db";
const resourcesDb = path.resolve(__dirname, "..") + "/nedb/authorization/resources.db";
const resourceTypesDb = path.resolve(__dirname, "..") + "/nedb/authorization/resource-types.db";
const resourcePermissionsDb = path.resolve(__dirname, "..") + "/nedb/authorization/resource-permissions.db";
const partyAccessRolesDb = path.resolve(__dirname, "..") + "/nedb/authorization/party-access-roles.db";

// lobby
const subscriptionDb = path.resolve(__dirname, "..") + "/nedb/lobby/subscriptions.db";

// Billing
const billingDb = path.resolve(__dirname, "..") + "/nedb/billing/billings.db";
const paymentMethodDb = path.resolve(__dirname, "..") + "/nedb/billing/payment-methods.db";
const paymentInformationDb = path.resolve(__dirname, "..") + "/nedb/billing/payment-information.db";

// depreciation
const bookDepreciationDb = path.resolve(__dirname, "..") + "/nedb/depreciation/book.db";
const taxDepreciationDb = path.resolve(__dirname, "..") + "/nedb/depreciation/tax.db";
const depreciationMethodDb = path.resolve(__dirname, "..") + "/nedb/depreciation/methods.db";
const depreciationSystemDb = path.resolve(__dirname, "..") + "/nedb/depreciation/systems.db";
const propertyClassesDb = path.resolve(__dirname, "..") + "/nedb/depreciation/propertyClasses.db";

const theActivitiesDb = path.resolve(__dirname, "..") + "/nedb/activity/activities.db";

// Todo: Fix remove
// party

export let contacts = new Datastore(theContactInfoDb);
contacts.loadDatabase(handleError);
contacts.ensureIndex({fieldName: "contactInfoId", unique: true}, handleError);

export let photos = new Datastore(thePhotosDb);
photos.loadDatabase(handleError);
photos.ensureIndex({ fieldName: "partyId", unique: true }, handleError);

export let persons = new Datastore(thePersonsDb);
persons.loadDatabase(handleError);
persons.ensureIndex({fieldName: "partyId", unique: true}, handleError);

export let users = new Datastore(theUsersDb);
users.loadDatabase(handleError);
users.ensureIndex({fieldName: "partyId", unique: true}, handleError);

export let organizations = new Datastore(theOrganizationDb);
organizations.loadDatabase(handleError);
organizations.ensureIndex({fieldName: "partyId", unique: true}, handleError);

export let requests = new Datastore(theRequestsDb);
requests.loadDatabase(handleError);
requests.ensureIndex({fieldName: "accessRequestId", unique: true}, handleError);

// authentication
export let credentials = new Datastore(theCredentialDb);
credentials.loadDatabase(handleError);
credentials.ensureIndex({fieldName: "credentialId", unique: true}, handleError);

export let credentialConfirmations = new Datastore(theCredentialConfirmationsDb);
credentialConfirmations.loadDatabase(handleError);
credentialConfirmations.ensureIndex({fieldName: "confirmationId", unique: true}, handleError);

// registrars
export let registrars = new Datastore(theRegistrationDb);
registrars.loadDatabase(handleError);
registrars.ensureIndex({fieldName: "registrationId", unique: true}, handleError);

// sites
export let sites = new Datastore(theSitesDb);
sites.loadDatabase(handleError);
sites.ensureIndex({fieldName: "siteId", unique: true}, handleError);

export let streetAddresses = new Datastore(theStreetAddressDb);
streetAddresses.loadDatabase(handleError);
streetAddresses.ensureIndex({fieldName: "siteId", unique: true}, handleError);

export let postOfficeBoxes = new Datastore(thePostOfficeBoxDb);
postOfficeBoxes.loadDatabase(handleError);
postOfficeBoxes.ensureIndex({fieldName: "siteId", unique: true}, handleError);

export let telephones = new Datastore(theTelephoneDb);
telephones.loadDatabase(handleError);
telephones.ensureIndex({fieldName: "siteId", unique: true}, handleError);

export let emails = new Datastore(theEmailDb);
emails.loadDatabase(handleError);
emails.ensureIndex({fieldName: "siteId", unique: true}, handleError);

export let webSites = new Datastore(theWebSiteDb);
webSites.loadDatabase(handleError);
webSites.ensureIndex({fieldName: "siteId", unique: true}, handleError);


// reference data
export let dataTypes = new Datastore(theDataTypesDb);
dataTypes.loadDatabase(handleError);
dataTypes.ensureIndex({fieldName: "dataTypeId", unique: true}, handleError);

export let unitOfMeasurements = new Datastore(theUnitOfMeasurementDb);
unitOfMeasurements.loadDatabase(handleError);
unitOfMeasurements.ensureIndex({fieldName: "unitOfMeasurementId", unique: true}, handleError);

export let unitOfMeasurementSystems = new Datastore(theUnitOfMeasurementSystemsDb);
unitOfMeasurementSystems.loadDatabase(handleError);
unitOfMeasurementSystems.ensureIndex({fieldName: "unitOfMeasurementSystemId", unique: true}, handleError);

export let unitOfMeasurementDimensions = new Datastore(theUnitMeasurementDimensionsDb);
unitOfMeasurementDimensions.loadDatabase(handleError);
unitOfMeasurementDimensions.ensureIndex({fieldName: "unitOfMeasurementDimensionId", unique: true}, handleError);

export let unitOfMeasurementConversions = new Datastore(theUnitMeasurementConversionsDb);
unitOfMeasurementConversions.loadDatabase(handleError);
unitOfMeasurementConversions.ensureIndex({fieldName: "unitOfMeasurementConversionId", unique: true}, handleError);

// asset type
export let assets = new Datastore(theAssetsDb);
assets.loadDatabase(handleError);
assets.ensureIndex({fieldName: "assetId", unique: true}, handleError);

export let assetTypes = new Datastore(theAssetTypesDb);
assetTypes.loadDatabase(handleError);
assetTypes.ensureIndex({fieldName: "assetTypeId", unique: true}, handleError);

export let assetRoleTypes = new Datastore(theAssetRoleTypesDb);
assetRoleTypes.loadDatabase(handleError);
assetRoleTypes.ensureIndex({fieldName: "assetRoleTypeId", unique: true}, handleError);

export let assetNameTypes = new Datastore(theAssetNameTypesDb);
assetNameTypes.loadDatabase(handleError);
assetNameTypes.ensureIndex({fieldName: "assetNameTypeId", unique: true}, handleError);

export let assetIdentifierTypes = new Datastore(theAssetIdentifierTypesDb);
assetIdentifierTypes.loadDatabase(handleError);
assetIdentifierTypes.ensureIndex({fieldName: "assetIdentifierTypeId", unique: true}, handleError);

export let assetCharacteristicTypes = new Datastore(theAssetCharacteristicTypesDb);
assetCharacteristicTypes.loadDatabase(handleError);
assetCharacteristicTypes.ensureIndex({fieldName: "assetCharacteristicTypeId", unique: true}, handleError);

export let assetBrands = new Datastore(theBrandsDb);
assetBrands.loadDatabase(handleError);
assetBrands.ensureIndex({fieldName: "brandId", unique: true}, handleError);

export let assetCategoryLegalValues = new Datastore(theAssetCategoryLegalValuesDb);
assetCategoryLegalValues.loadDatabase(handleError);
assetCategoryLegalValues.ensureIndex({fieldName: "assetCategoryLegalValueId", unique: true}, handleError);

export let assetSpecifications = new Datastore(theAssetSpecificationsDb);
assetSpecifications.loadDatabase(handleError);
assetSpecifications.ensureIndex({fieldName: "assetTypeId", unique: true}, handleError);

export let assetCharacteristics = new Datastore(theAssetCharacteristicsDb);
assetCharacteristics.loadDatabase(handleError);
assetCharacteristics.ensureIndex({fieldName: "assetCharacteristicId", unique: true}, handleError);

export let otherAssetTypes = new Datastore(theOtherAssetTypesDb);
otherAssetTypes.loadDatabase(handleError);
otherAssetTypes.ensureIndex({fieldName: "assetTypeId", unique: true}, handleError);

export let assetStructures = new Datastore(theAssetStructuresDb);
assetStructures.loadDatabase(handleError);
assetStructures.ensureIndex({fieldName: "assetStructureId", unique: true}, handleError);

export let assetTypeStructures = new Datastore(theAssetTypeStructuresDb);
assetTypeStructures.loadDatabase(handleError);
assetTypeStructures.ensureIndex({fieldName: "assetTypeStructureId", unique: true}, handleError);

export let assetStructureTypes = new Datastore(theAssetStructureTypesDb);
assetStructureTypes.loadDatabase(handleError);
assetStructureTypes.ensureIndex({fieldName: "assetStructureTypeId", unique: true}, handleError);

export let assetRoles = new Datastore(theAssetRolesDb);
assetRoles.loadDatabase(handleError);
assetRoles.ensureIndex({fieldName: "assetRoleId", unique: true}, handleError);

export let assetNames = new Datastore(theAssetNamesDb);
assetNames.loadDatabase(handleError);
assetNames.ensureIndex({fieldName: "assetNameId", unique: true}, handleError);

export let assetIdentifiers = new Datastore(theAssetIdentifiersDb);
assetIdentifiers.loadDatabase(handleError);
assetIdentifiers.ensureIndex({fieldName: "assetIdentifierId", unique: true}, handleError);

export let assetNameAssignments = new Datastore(theAssetNameAssignmentsDb);
assetNameAssignments.loadDatabase(handleError);
assetNameAssignments.ensureIndex({fieldName: "assetNameAssignmentId", unique: true}, handleError);

export let assetIdentifierAssignments = new Datastore(theAssetIdentifierAssignmentsDb);
assetIdentifierAssignments.loadDatabase(handleError);
assetIdentifierAssignments.ensureIndex({fieldName: "assetIdentifierAssignmentId", unique: true}, handleError);

export let assetCharacteristicAssignments = new Datastore(theAssetCharacteristicAssignmentsDb);
assetCharacteristicAssignments.loadDatabase(handleError);
assetCharacteristicAssignments.ensureIndex({fieldName: "assetCharacteristicAssignmentId", unique: true}, handleError);

export let values = new Datastore(theValuesDb);
values.loadDatabase(handleError);
values.ensureIndex({fieldName: "valueId", unique: true}, handleError);

export let assetKinds = new Datastore(theAssetKindsDb);
assetKinds.loadDatabase(handleError);
assetKinds.ensureIndex({fieldName: "assetKindId", unique: true}, handleError);

export let assetTypeClasses = new Datastore(theAssetTypeClassesDb);
assetTypeClasses.loadDatabase(handleError);
assetTypeClasses.ensureIndex({fieldName: "assetClassificationId", unique: true}, handleError);

export let attributes = new Datastore(theAttributesDb);
attributes.loadDatabase(handleError);
attributes.ensureIndex({fieldName: "attributeId", unique: true}, handleError);

export let assignedAttributes = new Datastore(theAssignedAttributesDb);
assignedAttributes.loadDatabase(handleError);
assignedAttributes.ensureIndex({fieldName: "assignedAttributeId", unique: true}, handleError);

export let sessions = new Datastore(sessionDb);
sessions.loadDatabase(handleError);

export let shipments = new Datastore(theShipmentsDb);
shipments.loadDatabase(function (err) { if (err) { console.log(err); }});

// activity
export let activities = new Datastore(theActivitiesDb);
activities.loadDatabase(handleError);
activities.ensureIndex({fieldName: "activityId", unique: true}, handleError);

// Authorization
export let accessRoles = new Datastore(accessRolesDb);
accessRoles.loadDatabase(handleError);
accessRoles.ensureIndex({fieldName: "accessRoleId", unique: true}, handleError);

export let accessRoleTypes = new Datastore(accessRoleTypesDb);
accessRoleTypes.loadDatabase(handleError);
accessRoleTypes.ensureIndex({fieldName: "accessRoleTypeId", unique: true}, handleError);

export let grants = new Datastore(grantsDb);
grants.loadDatabase(handleError);
grants.ensureIndex({fieldName: "grantId", unique: true}, handleError);

export let permissions = new Datastore(permissionsDb);
permissions.loadDatabase(handleError);
permissions.ensureIndex({fieldName: "permissionId", unique: true}, handleError);

export let resourcePermissions = new Datastore(resourcePermissionsDb);
resourcePermissions.loadDatabase(handleError);
resourcePermissions.ensureIndex({fieldName: "resourcePermissionId", unique: true}, handleError);

export let resources = new Datastore(resourcesDb);
resources.loadDatabase(handleError);
resources.ensureIndex({fieldName: "resourceId", unique: true}, handleError);

export let resourceTypes = new Datastore(resourceTypesDb);
resourceTypes.loadDatabase(handleError);
resourceTypes.ensureIndex({fieldName: "resourceTypeId", unique: true}, handleError);

export let partyAccessRoles = new Datastore(partyAccessRolesDb);
partyAccessRoles.loadDatabase(handleError);
partyAccessRoles.ensureIndex({fieldName: "partyAccessRoleId", unique: true}, handleError);

// LOBBY
export const subscriptions = new Datastore(subscriptionDb);
subscriptions.loadDatabase(handleError);
subscriptions.ensureIndex({fieldName: "subscriptionId", unique: true}, handleError);

// depreciation

export const bookDepreciation = new Datastore(bookDepreciationDb);
bookDepreciation.loadDatabase(handleError);
bookDepreciation.ensureIndex({fieldName: "depreciationId", unique: true}, handleError);

export const taxDepreciation = new Datastore(taxDepreciationDb);
taxDepreciation.loadDatabase(handleError);
taxDepreciation.ensureIndex({fieldName: "depreciationId", unique: true}, handleError);

export const depreciationMethod = new Datastore(depreciationMethodDb);
depreciationMethod.loadDatabase(handleError);
depreciationMethod.ensureIndex({fieldName: "methodId", unique: true}, handleError);

export const depreciationSystem = new Datastore(depreciationSystemDb);
depreciationSystem.loadDatabase(handleError);
depreciationSystem.ensureIndex({fieldName: "systemId", unique: true}, handleError);

export const propertyClasses = new Datastore(propertyClassesDb);
propertyClasses.loadDatabase(handleError);
propertyClasses.ensureIndex({fieldName: "propertyClassId", unique: true}, handleError);

// billings

export const billings = new Datastore(billingDb);
billings.loadDatabase(handleError);
billings.ensureIndex({ fieldName: "billingId", unique: true }, handleError);

export const paymentMethods = new Datastore(paymentMethodDb);
paymentMethods.loadDatabase(handleError);
paymentMethods.ensureIndex({fieldName: "paymentMethodId", unique: true}, handleError);

export const paymentInformation = new Datastore(paymentInformationDb);
paymentInformation.loadDatabase(handleError);
paymentInformation.ensureIndex( {fieldName: "paymentId", unique: true}, handleError);

function handleError(err: any) {
  if (err) {
    console.log(err);
  }
}
