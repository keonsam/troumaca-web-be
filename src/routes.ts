import { Router } from "express";

import * as confirmationController from "./authentication/credential/confirmation/confirmation.controller";
import * as credentialController from "./authentication/credential/credential.controller";
import * as permissionController from "./authorization/permission/permission.controller";
import * as resourceController from "./authorization/resource/resource.controller";
import * as accessRoleController from "./authorization/access-role/access.role.controller";
import * as accessRoleTypeController from "./authorization/access-role-type/access.role.type.controller";
import * as resourceTypeController from "./authorization/resource-type/resource.type.controller";

import * as assetController from "./asset/asset.controller";
import * as phoneController from "./site/phone/phone.controller";
import * as photoController from "./party/photo/photo.controller";
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
import * as brandController from "./brand/brand.controller";
import * as assetCharacteristicController from "./asset-characteristic/asset.characteristic.controller";
import * as assetNameTypeController from "./asset-name-type/asset.name.type.controller";
import * as assetIdentifierTypeController from "./asset-identifier-type/asset.identifier.type.controller";
import * as assetRoleTypeController from "./asset-role-type/asset.role.type.controller";
import * as unitOfMeasureController from "./unit-of-measure/unit.of.measure.controller";
import upload from "./middleware/multer.config";

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

// BRANDS
router.get("/brands", checkSession, brandController.getBrands);
router.get("/brands/find", checkSession, brandController.findBrands);
router.get("/brands/:brandId", checkSession, brandController.getBrandById);
router.post("/brands", checkSession, brandController.saveBrand);
router.put("/brands/:brandId", checkSession, brandController.updateBrand);
router.delete("/brands/:brandId", checkSession, brandController.deleteBrand);

// ASSET CHARACTERISTICS
router.get("/asset-characteristics", checkSession, assetCharacteristicController.getAssetCharacteristics);
router.get("/asset-characteristics/types", checkSession, assetCharacteristicController.getTypes);
router.get("/asset-characteristics/find", checkSession, assetCharacteristicController.findAssetCharacteristics);
router.get("/asset-characteristics/:assetCharacteristicId", checkSession, assetCharacteristicController.getAssetCharacteristicById);
router.post("/asset-characteristics", checkSession, assetCharacteristicController.saveAssetCharacteristic);
router.put("/asset-characteristics/:assetCharacteristicId", checkSession, assetCharacteristicController.updateAssetCharacteristic);
router.delete("/asset-characteristics/:assetCharacteristicId", checkSession, assetCharacteristicController.deleteAssetCharacteristic);

// ASSET TYPES
router.get("/asset-types", checkSession, assetTypeController.getAssetTypes);
router.get("/asset-types/find", checkSession, assetTypeController.findAssetTypes);
router.get("/asset-types/instances", checkSession, assetTypeController.findInstances);
router.get("/asset-types/:assetTypeId", checkSession, assetTypeController.getAssetTypeById);
router.post("/asset-types", checkSession, assetTypeController.saveAssetType);
router.put("/asset-types/:assetTypeId", checkSession, checkSession, assetTypeController.updateAssetType);
router.delete("/asset-types/:assetTypeId", checkSession, assetTypeController.deleteAssetType);

// ASSET NAME TYPES
router.get("/asset-name-types", checkSession, assetNameTypeController.getAssetNameTypes);
router.get("/asset-name-types/find", checkSession, assetNameTypeController.findAssetNameTypes);
router.get("/asset-name-types/:assetNameTypeId", checkSession, assetNameTypeController.getAssetNameTypeById);
router.post("/asset-name-types", checkSession, assetNameTypeController.saveAssetNameType);
router.put("/asset-name-types/:assetNameTypeId", checkSession, assetNameTypeController.updateAssetNameType);
router.delete("/asset-name-types/:assetNameTypeId", checkSession, assetNameTypeController.deleteAssetNameType);

// ASSET IDENTIFIER TYPES
router.get("/asset-identifier-types", checkSession, assetIdentifierTypeController.getAssetIdentifierTypes);
router.get("/asset-identifier-types/find", checkSession, assetIdentifierTypeController.findAssetIdentifierTypes);
router.get("/asset-identifier-types/:assetIdentifierTypeId", checkSession, assetIdentifierTypeController.getAssetIdentifierTypeById);
router.post("/asset-identifier-types", checkSession, assetIdentifierTypeController.saveAssetIdentifierType);
router.put("/asset-identifier-types/:assetIdentifierTypeId", checkSession, assetIdentifierTypeController.updateAssetIdentifierType);
router.delete("/asset-identifier-types/:assetIdentifierTypeId", checkSession, assetIdentifierTypeController.deleteAssetIdentifierType);

// ASSET ROLE TYPES
router.get("/asset-role-types", checkSession, assetRoleTypeController.getAssetRoleTypes);
router.get("/asset-role-types/find", checkSession, assetRoleTypeController.findAssetRoleTypes);
router.get("/asset-role-types/:assetRoleTypeId", checkSession, assetRoleTypeController.getAssetRoleTypeById);
router.post("/asset-role-types", checkSession, assetRoleTypeController.saveAssetRoleType);
router.put("/asset-role-types/:assetRoleTypeId", checkSession, assetRoleTypeController.updateAssetRoleType);
router.delete("/asset-role-types/:assetRoleTypeId", checkSession, assetRoleTypeController.deleteAssetRoleType);

// UNIT OF MEASURES
router.get("/unit-of-measures", checkSession, unitOfMeasureController.getUnitOfMeasures);
router.get("/unit-of-measures/find", checkSession, unitOfMeasureController.findUnitOfMeasures);
router.get("/unit-of-measures/:unitOfMeasureId", checkSession, unitOfMeasureController.getUnitOfMeasureById);
router.post("/unit-of-measures", checkSession, unitOfMeasureController.saveUnitOfMeasure);
router.put("/unit-of-measures/:unitOfMeasureId", checkSession, unitOfMeasureController.updateUnitOfMeasure);
router.delete("/unit-of-measures/:unitOfMeasureId", checkSession, unitOfMeasureController.deleteUnitOfMeasure);

// ASSETS
router.get("/assets/find", checkSession, assetController.findAssets);
router.get("/assets", checkSession, assetController.getAssets);
router.get("/assets/:assetId", checkSession, assetController.getAssetById);
router.post("/assets", checkSession, assetController.saveAsset);
router.put("/assets/:assetId", checkSession, assetController.updateAsset);
router.delete("/assets/:assetId", checkSession, assetController.deleteAsset);

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
router.put("/parties/contact-info/:type", checkSession, partyController.updateContactInfo);
router.get("/parties/address", checkSession, partyController.getAddress);
router.put("/parties/address/:type", checkSession, partyController.updateAddress);

// USER
router.get("/users/find", checkSession, userController.findUser);
router.get("/users/:partyId", checkSession, userController.getUser);
router.get("/users", checkSession, userController.getUsers);
router.post("/users", checkSession, userController.saveUser);
router.put("/users/:partyId", checkSession, userController.updateUser);
router.delete("/users/:partyId", checkSession, userController.deleteUser);

router.get("/users-menu", checkSession, userController.getUserMenu);
router.get("/users-me", checkSession, userController.getUserMe);
router.put("/users-me", checkSession, userController.updateUserMe);

// organizations
router.get("/organizations/find", checkSession, organizationController.findOrganizations);
router.get("/organizations/:partyId", checkSession, organizationController.getOrganization);
router.get("/organizations", checkSession, organizationController.getOrganizations);
router.post("/organizations", checkSession, organizationController.saveOrganization);
// router.post("/organizations/request-access", checkSession, organizationController.saveAccessRequest);
router.put("/organizations/profile", checkSession, organizationController.updateOrganizationCompany);
router.put("/organizations/:partyId", checkSession, organizationController.updateOrganization);
router.delete("/organizations/:partyId", checkSession, organizationController.deleteOrganization);

// COMPANY
router.get("/company", checkSession, organizationController.getCompany);
router.post("/company", checkSession, organizationController.addCustomer);

// photos
router.get("/photos", checkSession, photoController.getPhotos);
router.post("/photos/user", checkSession, upload.single("image"), photoController.savePhotoUser);
router.post("/photos/organization", checkSession, upload.single("image"), photoController.savePhotoOrganization);
router.put("/photos/user/:photoId", checkSession, upload.single("image"), photoController.updatePhotoUser);
router.put("/photos/organization/:photoId", checkSession, upload.single("image"), photoController.updatePhotoOrganization);

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
