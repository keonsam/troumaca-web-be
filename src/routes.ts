import { Router } from "express";


import * as confirmationController from "./authentication/credential/confirmation/confirmation.controller";
import * as credentialController from "./authentication/credential/credential.controller";
import * as permissionController from "./authorization/permission/permission.controller";
import * as resourceController from "./authorization/resource/resource.controller";
import * as accessRoleController from "./authorization/access-role/access.role.controller";
import * as accessRoleTypeController from "./authorization/access-role-type/access.role.type.controller";
import * as resourceTypeController from "./authorization/resource-type/resource.type.controller";

import * as assetController from "./asset/asset.controller";
import * as assetRoleTypeController from "./asset/asset-role-type/asset.role.type.controller";
import * as assetIdentifierTypeController from "./asset/asset-identifier-type/asset.identifier.type.controller";
import * as assetCharacteristicTypeController from "./asset/asset-characteristic-type/asset.characteristic.type.controller";
import * as assetCharacteristicController from "./asset/asset-characteristic/asset.characteristic.controller";
import * as assetBrandController from "./asset/asset-brand/asset.brand.controller";
import * as assetCategoryLegalValueController from "./asset/asset-category-legal-value/asset.category.legal.value.controller";
import * as assetNameTypeController from "./asset/asset-name-type/asset.name.type.controller";
import * as phoneController from "./site/phone/phone.controller";
import * as photoController from "./party/photo/photo.controller";
import * as unitOfMeasurementController from "./unit-of-measurement/unit.of.measurement.controller";
import * as unitOfMeasurementSystemController from "./unit-of-measurement/unit-of-measurement-system/unit.of.measurement.system.controller";
import * as unitOfMeasurementDimensionController from "./unit-of-measurement/unit-of-measruement-dimension/unit.of.measurement.dimension.controller";
import * as dataTypeController from "./data-type/data.type.controller";
import * as emailController from "./site/email/email.controller";
import * as siteController from "./site/site.controller";
import * as webSiteController from "./site/web-site/web.site.controller";
import * as postOfficeBoxController from "./site/post-office-box/post.office.box.controller";
import * as streetAddressController from "./site/street-address/street.address.controller";
import * as sessionController from "./session/session.controller";
import * as userController from "./party/user/user.controller";
import * as assetTypeController from "./asset/asset-type/asset.type.controller";
import * as organizationController from "./party/organization/organization.controller";
import * as subscriptionController from "./subscription/subscription.controller";
import * as billingController from "./billing/billing.controller";
import * as depreciationController from "./depreciation/depreciation.controller";
import * as organizationProfileController from "./profile/organization/create/organization.profile.controller";
import * as personProfileController from "./profile/person/create/person.profile.controller";
import * as searchController from "./search/search.controller";
import * as partyController from "./party/party.controller";

import { upload } from "./middleware/multer.config";

import checkSession from "./middleware/check-session";

const router: Router = Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Troumaka API"
    });
});


// ##### SECURITY START #####
// authentication
router.post("/authentication/validate-password", credentialController.isValidPassword);
router.post("/authentication/validate-username", credentialController.isValidUsername);
router.post("/authentication/credentials", credentialController.addCredential);
router.post("/authentication/authenticate", credentialController.authenticate);
// router.post("/authentication/forgot-password", credentialController.forgetPassword);
router.post("/authentication/change-password", credentialController.changePassword);

// confirmation
router.post("/authentication/confirmations/resend", confirmationController.resendConfirmCode);
router.post("/authentication/confirmations/resend-by-username", confirmationController.resendConfirmCodeByUsername);
router.post("/authentication/confirmations/verify", confirmationController.confirmCode);
router.post("/authentication/confirmations/validate-code", confirmationController.validateCode);

// session
router.get("/sessions/is-valid-session", sessionController.isValidSession);
router.get("/sessions/logout", checkSession, sessionController.handleSessionLogOut);
// router.get("/sessions/partyId", checkSession, sessionController.getPartyId);

// permissions
router.get("/permissions", checkSession, permissionController.getPermissions);
router.get("/permissions/permissions", checkSession, permissionController.getPermissionsByArray);
router.get("/permissions/:permissionId", checkSession, permissionController.getPermissionById);
router.post("/permissions", checkSession, permissionController.savePermission);
router.put("/permissions/:permissionId", checkSession, permissionController.updatePermission);
router.delete("/permissions/:permissionId", checkSession, permissionController.deletePermission);
router.get("/permissions", permissionController.getPermissions);
router.post("/permissions/available", permissionController.getPermissionsByArray);
router.post("/permissions/assignable", permissionController.getAssignablePermissions);

router.get("/permissions/:permissionId", permissionController.getPermissionById);
router.post("/permissions", permissionController.savePermission);
router.delete("/permissions/:permissionId", permissionController.deletePermission);

// resources
router.get("/resources", checkSession, resourceController.getResources);
router.get("/resources/resources", checkSession, resourceController.getResourcesByArray);
router.get("/resources/assigned-resources", checkSession, resourceController.getAssignedResourcesByArray);
router.get("/resources/:resourceId", checkSession, resourceController.getResourceById);
router.post("/resources", checkSession, resourceController.saveResource);
router.put("/resources/:resourceId", checkSession, resourceController.updateResource);
router.delete("/resources/:resourceId", checkSession, resourceController.deleteResource);
router.get("/resources", checkSession, resourceController.getResources);
router.post("/available-resources", checkSession, resourceController.getResourcesByArray);
router.get("/resources/:resourceId", checkSession, resourceController.getResourceById);
router.post("/resources", checkSession, resourceController.saveResource);
router.put("/resources/:resourceId", checkSession, resourceController.updateResource);
router.delete("/resources/:resourceId", checkSession, resourceController.deleteResource);

// resource-types
router.get("/resource-types/find", checkSession, resourceTypeController.findResourceTypes);
router.get("/resource-types", checkSession, resourceTypeController.getResourceTypes);
router.get("/resource-types/:resourceTypeId", checkSession, resourceTypeController.getResourceTypeById);
router.post("/resource-types", checkSession, resourceTypeController.saveResourceType);
router.put("/resource-types/:resourceTypeId", checkSession, resourceTypeController.updateResourceType);
router.delete("/resource-types/:resourceTypeId", checkSession, resourceTypeController.deleteResourceType);
// resource-permissions

// access-roles
router.get("/access-roles/find", checkSession, accessRoleController.findAccessRoles);
router.get("/access-roles", checkSession, accessRoleController.getAccessRoles);
router.get("/access-roles/:accessRoleId", checkSession, accessRoleController.getAccessRoleById);
router.post("/access-roles", checkSession, accessRoleController.saveAccessRole);
router.put("/access-roles/:accessRoleId", checkSession, accessRoleController.updateAccessRole);
router.delete("/access-roles/:accessRoleId", checkSession, accessRoleController.deleteAccessRole);

// access-role-types
router.get("/access-role-types/find", checkSession, accessRoleTypeController.findAccessRoleTypes);
router.get("/access-role-types", checkSession, accessRoleTypeController.getAccessRoleTypes);
router.get("/access-role-types/:accessRoleTypeId", checkSession, accessRoleTypeController.getAccessRoleTypeById);
router.post("/access-role-types", checkSession, accessRoleTypeController.saveAccessRoleType);
router.put("/access-role-types/:accessRoleTypeId", checkSession, accessRoleTypeController.updateAccessRoleType);
router.delete("/access-role-types/:accessRoleTypeId", checkSession, accessRoleTypeController.deleteAccessRoleType);

// ##### SECURITY END #####



// Asset Type

// asset-kind
// router.get("/asset-kinds", checkSession, assetKindController.getAssetKinds);
// data-type
router.get("/data-types", checkSession, dataTypeController.getDataTypes);

// asset
router.get("/assets/find", checkSession, assetController.findAssets);
router.get("/assets", checkSession, assetController.getAssets);
router.get("/assets/:assetId", checkSession, assetController.getAssetById);
router.post("/assets", checkSession, assetController.saveAsset);
router.put("/assets/:assetId", checkSession, assetController.updateAsset);
router.delete("/assets/:assetId", checkSession, assetController.deleteAsset);

router.get("/asset-specifications/:assetId", checkSession, assetController.getAssetSpecById);
router.get("/asset-brands/:assetId", checkSession, assetController.getAssetBrandById);
router.get("/asset-characteristics/:assetId", checkSession, assetController.getAssetCharacteristicsById);

router.post("/asset-specifications", checkSession, assetController.addAssetSpec);
router.post("/asset-brands", checkSession, assetController.addAssetBrand);
router.post("/asset-characteristics", checkSession, assetController.addAssetCharacteristics);

router.put("/asset-specifications/:assetId", checkSession, assetController.updateAssetSpec);
router.put("/asset-brands/:assetId", checkSession, assetController.updateAssetBrand);
router.put("/asset-characteristics/:assetId", checkSession, assetController.updateAssetChars);


// MW New Work: From Here
// unit-of-measure
router.get("/unit-of-measurements", checkSession, unitOfMeasurementController.findUnitOfMeasurements);
router.get('/unit-of-measurements/c', checkSession, unitOfMeasurementController.getUnitOfMeasurements);
router.get('/unit-of-measurements/search', checkSession, unitOfMeasurementController.findUnitOfMeasurements);
router.get('/unit-of-measurements/:unitOfMeasurementId', checkSession, unitOfMeasurementController.getUnitOfMeasurementById);
router.post('/unit-of-measurements', checkSession, unitOfMeasurementController.addUnitOfMeasurement);
router.put('/unit-of-measurements/:unitOfMeasurementId', checkSession, unitOfMeasurementController.updateUnitOfMeasurement);
router.delete('/unit-of-measurements/:unitOfMeasurementId', checkSession, unitOfMeasurementController.deleteUnitOfMeasurement);

router.get("/unit-of-measurements/unit-of-measurement-systems", checkSession, unitOfMeasurementSystemController.findUnitOfMeasurementSystems);
router.get('/unit-of-measurements/unit-of-measurement-systems/c', checkSession, unitOfMeasurementSystemController.getUnitOfMeasurementSystems);
router.get('/unit-of-measurements/unit-of-measurement-systems/search', checkSession, unitOfMeasurementSystemController.findUnitOfMeasurementSystems);
router.get('/unit-of-measurements/unit-of-measurement-systems/:unitOfMeasurementSystemId', checkSession, unitOfMeasurementSystemController.getUnitOfMeasurementSystemById);
router.post('/unit-of-measurements/unit-of-measurement-systems', checkSession, unitOfMeasurementSystemController.addUnitOfMeasurementSystem);
router.put('/unit-of-measurements/unit-of-measurement-systems/:unitOfMeasurementSystemId', checkSession, unitOfMeasurementSystemController.updateUnitOfMeasurementSystem);
router.delete('/unit-of-measurements/unit-of-measurement-systems/:unitOfMeasurementSystemId', checkSession, unitOfMeasurementSystemController.deleteUnitOfMeasurementSystem);


router.get("/unit-of-measurements/unit-of-measurement-dimensions", checkSession, unitOfMeasurementDimensionController.findUnitOfMeasurementDimensions);
router.get('/unit-of-measurements/unit-of-measurement-dimensions/c', checkSession, unitOfMeasurementDimensionController.getUnitOfMeasurementDimensions);
router.get('/unit-of-measurements/unit-of-measurement-dimensions/search', checkSession, unitOfMeasurementDimensionController.findUnitOfMeasurementDimensions);
router.get('/unit-of-measurements/unit-of-measurement-dimensions/:unitOfMeasurementDimensionId', checkSession, unitOfMeasurementDimensionController.getUnitOfMeasurementDimensionById);
router.post('/unit-of-measurements/unit-of-measurement-dimensions', checkSession, unitOfMeasurementDimensionController.addUnitOfMeasurementDimension);
router.put('/unit-of-measurements/unit-of-measurement-dimensions/:unitOfMeasurementDimensionId', checkSession, unitOfMeasurementDimensionController.updateUnitOfMeasurementDimension);
router.delete('/unit-of-measurements/unit-of-measurement-dimensions/:unitOfMeasurementDimensionId', checkSession, unitOfMeasurementDimensionController.deleteUnitOfMeasurementDimension);


// asset role type
// TODO: Figure out why GET '/assets/asset-role-types' returns a 404
router.get('/assets/asset-role-types/c', checkSession, assetRoleTypeController.getAssetRoleTypes);
router.get('/assets/asset-role-types/search', checkSession, assetRoleTypeController.findAssetRoleTypes);
router.get('/assets/asset-role-types/:assetRoleTypeId', checkSession, assetRoleTypeController.getAssetRoleTypeById);
router.post('/assets/asset-role-types', checkSession, assetRoleTypeController.addAssetRoleType);
router.put('/assets/asset-role-types/:assetRoleTypeId', checkSession, assetRoleTypeController.updateAssetRoleType);
router.delete('/assets/asset-role-types/:assetRoleTypeId', checkSession, assetRoleTypeController.deleteAssetRoleType);

router.get('/assets/asset-name-types/c', checkSession, assetNameTypeController.getAssetNameTypes);
router.get('/assets/asset-name-types/search', checkSession, assetNameTypeController.findAssetNameTypes);
router.get('/assets/asset-name-types/:assetNameTypeId', checkSession, assetNameTypeController.getAssetNameTypeById);
router.post('/assets/asset-name-types', checkSession, assetNameTypeController.addAssetNameType);
router.put('/assets/asset-name-types/:assetNameTypeId', checkSession, assetNameTypeController.updateAssetNameType);
router.delete('/assets/asset-name-types/:assetNameTypeId', checkSession, assetNameTypeController.deleteAssetNameType);

router.get('/assets/asset-identifier-types/c', checkSession, assetIdentifierTypeController.getAssetIdentifierTypes);
router.get('/assets/asset-identifier-types/search', checkSession, assetIdentifierTypeController.findAssetIdentifierTypes);
router.get('/assets/asset-identifier-types/:assetIdentifierTypeId', checkSession, assetIdentifierTypeController.getAssetIdentifierTypeById);
router.post('/assets/asset-identifier-types', checkSession, assetIdentifierTypeController.addAssetIdentifierType);
router.put('/assets/asset-identifier-types/:assetIdentifierTypeId', checkSession, assetIdentifierTypeController.updateAssetIdentifierType);
router.delete('/assets/asset-identifier-types/:assetIdentifierTypeId', checkSession, assetIdentifierTypeController.deleteAssetIdentifierType);

router.get('/assets/asset-characteristic-types/c', checkSession, assetCharacteristicTypeController.getAssetCharacteristicTypes);
router.get('/assets/asset-characteristic-types/search', checkSession, assetCharacteristicTypeController.findAssetCharacteristicTypes);
router.get('/assets/asset-characteristic-types/:assetCharacteristicTypeId', checkSession, assetCharacteristicTypeController.getAssetCharacteristicTypeById);
router.post('/assets/asset-characteristic-types', checkSession, assetCharacteristicTypeController.addAssetCharacteristicType);
router.put('/assets/asset-characteristic-types/:assetCharacteristicTypeId', checkSession, assetCharacteristicTypeController.updateAssetCharacteristicType);
router.delete('/assets/asset-characteristic-types/:assetCharacteristicTypeId', checkSession, assetCharacteristicTypeController.deleteAssetCharacteristicType);

router.get('/assets/asset-brands/c', checkSession, assetBrandController.getAssetBrands);
router.get('/assets/asset-brands/search', checkSession, assetBrandController.findAssetBrands);
router.get('/assets/asset-brands/:assetBrandId', checkSession, assetBrandController.getAssetBrandById);
router.post('/assets/asset-brands', checkSession, assetBrandController.addAssetBrand);
router.put('/assets/asset-brands/:assetBrandId', checkSession, assetBrandController.updateAssetBrand);
router.delete('/assets/asset-brands/:assetBrandId', checkSession, assetBrandController.deleteAssetBrand);

router.get('/assets/asset-category-legal-values/c', checkSession, assetCategoryLegalValueController.getAssetCategoryLegalValues);
router.get('/assets/asset-category-legal-values/search', checkSession, assetCategoryLegalValueController.findAssetCategoryLegalValues);
router.get('/assets/asset-category-legal-values/:assetCategoryLegalValueId', checkSession, assetCategoryLegalValueController.getAssetCategoryLegalValueById);
router.post('/assets/asset-category-legal-values', checkSession, assetCategoryLegalValueController.addAssetCategoryLegalValue);
router.put('/assets/asset-category-legal-values/:assetCategoryLegalValueId', checkSession, assetCategoryLegalValueController.updateAssetCategoryLegalValue);
router.delete('/assets/asset-category-legal-values/:assetCategoryLegalValueId', checkSession, assetCategoryLegalValueController.deleteAssetCategoryLegalValue);

router.get('/assets/asset-characteristics/c', checkSession, assetCharacteristicController.getAssetCharacteristics);
router.get('/assets/asset-characteristics/search', checkSession, assetCharacteristicController.findAssetCharacteristics);
router.get('/assets/asset-characteristics/:assetCharacteristicId', checkSession, assetCharacteristicController.getAssetCharacteristicById);
router.post('/assets/asset-characteristics', checkSession, assetCharacteristicController.addAssetCharacteristic);
router.put('/assets/asset-characteristics/:assetCharacteristicId', checkSession, assetCharacteristicController.updateAssetCharacteristic);
router.delete('/assets/asset-characteristics/:assetCharacteristicId', checkSession, assetCharacteristicController.deleteAssetCharacteristic);

router.get("/assets/asset-types/c", checkSession, assetTypeController.getAssetTypes);
router.get("/assets/asset-types/search", checkSession, assetTypeController.findAssetTypes);
router.get("/assets/asset-types/:assetTypeId", checkSession, assetTypeController.getAssetTypeById);
router.post('/assets/asset-types', checkSession, assetTypeController.addAssetTypes);
router.put("/assets/asset-types/:assetTypeId", checkSession, checkSession, assetTypeController.updateAssetType);
router.delete("/assets/asset-types/:assetTypeId", checkSession, assetTypeController.deleteAssetType);

// MW New Work: TO Here

// site
router.get("/sites/find", checkSession, siteController.findSite);

// street-address
router.get("/street-addresses", checkSession, streetAddressController.getStreetAddresses);
router.get("/street-addresses/:siteId", checkSession, streetAddressController.getStreetAddressById);
router.post("/street-addresses", checkSession, streetAddressController.saveStreetAddress);
router.put("/street-addresses/:siteId", checkSession, streetAddressController.updateStreetAddress);
router.delete("/street-addresses/:siteId", checkSession, streetAddressController.deleteStreetAddress);

// post office box
router.get("/post-office-boxes", checkSession, postOfficeBoxController.getPostOfficeBoxes);
router.get("/post-office-boxes/:siteId", checkSession, postOfficeBoxController.getPostOfficeBoxById);
router.post("/post-office-boxes", checkSession, postOfficeBoxController.savePostOfficeBox);
router.put("/post-office-boxes/:siteId", checkSession, postOfficeBoxController.updatePostOfficeBox);
router.delete("/post-office-boxes/:siteId", checkSession, postOfficeBoxController.deletePostOfficeBox);

// emails
router.get("/emails", checkSession, emailController.getEmails);
router.get("/emails/:siteId", checkSession, emailController.getEmailById);
router.post("/emails", checkSession, emailController.saveEmail);
router.put("/emails/:siteId", checkSession, emailController.updateEmail);
router.delete("/emails/:siteId", checkSession, emailController.deleteEmail);

// web-site
router.get("/web-sites", checkSession, webSiteController.getWebSites);
router.get("/web-sites/:siteId", checkSession, webSiteController.getWebSiteById);
router.post("/web-sites", checkSession, webSiteController.saveWebSite);
router.put("/web-sites/:siteId", checkSession, webSiteController.updateWebSite);
router.delete("/web-sites/:siteId", checkSession, webSiteController.deleteWebSite);

// phone
router.get("/phones", checkSession, phoneController.getPhones);
router.get("/phones/:siteId", checkSession, phoneController.getPhoneById);
router.post("/phones", checkSession, phoneController.savePhone);
router.put("/phones/:siteId", checkSession, phoneController.updatePhone);
router.delete("/phones/:siteId", checkSession, phoneController.deletePhone);

// PARTY
router.get("/parties/contact-info", checkSession, partyController.getContactInfo);
router.post("/parties/contact-info", checkSession, partyController.addContactInfo);
router.put("/parties/contact-info/:contactInfoId", checkSession, partyController.updateContactInfo);
router.get("/parties/address", checkSession, partyController.getAddress);
router.post("/parties/address", checkSession, partyController.addAddress);
router.put("/parties/address/:siteId", checkSession, partyController.updateAddress);
// user
router.get("/users/find", checkSession, userController.findUser);
router.get("/users/profile", checkSession, userController.getUserMe);
router.get("/users/:partyId", checkSession, userController.getUser);
router.get("/users", checkSession, userController.getUsers);
router.post("/users", checkSession, userController.saveUser);
router.put("/users/profile", checkSession, userController.updateUserMe);
router.put("/users/:partyId", checkSession, userController.updateUser);
router.delete("/users/:partyId", checkSession, userController.deleteUser);

// organizations
router.get("/organizations/find", checkSession, organizationController.findOrganizations);
router.get("/organizations/company", checkSession, organizationController.getOrganizationCompany);
router.get("/organizations/:partyId", checkSession, organizationController.getOrganization);
router.get("/organizations", checkSession, organizationController.getOrganizations);
router.post("/organizations", checkSession, organizationController.saveOrganization);
router.post("/organizations/customer", checkSession, organizationController.addCustomer);
// router.post("/organizations/profiles", checkSession, organizationController.saveOrganizationCompany);
router.post("/organizations/request-access", checkSession, organizationController.saveAccessRequest);
router.put("/organizations/profile", checkSession, organizationController.updateOrganizationCompany);
router.put("/organizations/:partyId", checkSession, organizationController.updateOrganization);
router.delete("/organizations/:partyId", checkSession, organizationController.deleteOrganization);

// photos
router.get("/photos", checkSession, photoController.getPhotos);
router.post("/photos/user", checkSession, upload, photoController.savePhoto);
router.put("/photos/user", checkSession, upload, photoController.updatePhoto);



// SUBSCRIPTION && BILLING

router.get("/apps", checkSession, subscriptionController.getApps);
router.get("/subscriptions", checkSession, subscriptionController.getSubscriptions);
router.post("/subscriptions", checkSession, subscriptionController.addSubscription);
router.delete("/subscriptions/:subscriptionId", checkSession, subscriptionController.deleteSubscription);

// billing
router.get("/billings/payment-methods", checkSession, billingController.getPaymentMethods);
router.get("/billings", checkSession, billingController.getBillings);
router.get("/billings/payment-methods/is-valid", checkSession, billingController.isValidPaymentMethod);
router.get( "/billings/payment-information", checkSession, billingController.getPaymentInformation);
router.post( "/billings/payment-information", checkSession, billingController.addPaymentInformation);
router.post( "/billings/validate/card-name", checkSession, billingController.cardName);
router.post( "/billings/validate/card-number", checkSession, billingController.cardNumber);
router.post( "/billings/validate/card-exp-date", checkSession, billingController.cardExpDate);
router.post( "/billings/validate/card-cvv", checkSession, billingController.cardCVV);
router.put( "/billings/payment-information/:paymentId", checkSession, billingController.updatePaymentInformation);
router.delete( "/billings/payment-information/:paymentId", checkSession, billingController.deletePaymentInformation);


// PROFILES
router.post("/profiles/organizations", organizationProfileController.createProfileOrganization);
router.post("/profiles/persons", personProfileController.createPersonProfile);

// DEPRECIATION

router.get("/depreciation-methods/:type/:system", checkSession, depreciationController.getDepreciationMethod);
router.get("/depreciation-systems", checkSession, depreciationController.getDepreciationSystems);
router.get("/depreciation-property-classes/:system", checkSession, depreciationController.getPropertyClasses);

router.get("/depreciation/assets/find", checkSession, depreciationController.getDepreciableAssets);
router.get("/book-depreciation", checkSession, depreciationController.getBookDepreciationArr);
router.get("/tax-depreciation", checkSession, depreciationController.getTaxDepreciationArr);
router.get("/depreciation/:depreciationId/:type", checkSession, depreciationController.getDepreciationById);
router.post("/depreciation", checkSession, depreciationController.saveDepreciation);
router.put("/depreciation/:depreciationId", checkSession, depreciationController.updateDepreciation);
router.delete("/depreciation/:depreciationId/:type", checkSession, depreciationController.deleteDepreciation);

// SEARCH
router.get("/search/:indexName", checkSession, searchController.search);

export default router;
