import { gql} from "apollo-server-express";
import { getNumericValueOrDefault } from "../number.util";
import { getStringValueOrDefault } from "../string.util";
import { Direction } from "../util/direction";
import { Order } from "../util/order";
import { Sort } from "../util/sort";
import { AssetTypeOrchestrator } from "../asset/asset-type/asset.type.orchestrator";
import { AssetSpecification } from "../data/asset/asset.specification";
import { BrandOrchestrator } from "../brand/brand.orchestrator";
import { AssignedCharacteristic } from "../data/asset/assigned.characteristic";
import { AssetCharacteristicOrchestrator } from "../asset-characteristic/asset.characteristic.orchestrator";
import { AssetName } from "../data/asset/asset.name";
import { AssetNameTypeOrchestrator } from "../asset/asset-name-type/asset.name.type.orchestrator";
import { AssetIdentifierType } from "../data/asset/asset.identifier.type";
import { AssetIdentifierTypeOrchestrator } from "../asset-identifier-type/asset.identifier.type.orchestrator";
import { AssetRoleType } from "../data/asset/asset.role.type";
import { AssetRoleTypeOrchestrator } from "../asset-role-type/asset.role.type.orchestrator";

const assetTypeOrchestrator: AssetTypeOrchestrator = new AssetTypeOrchestrator();
const brandOrchestrator: BrandOrchestrator = new BrandOrchestrator();
const assetCharacteristicOrchestrator: AssetCharacteristicOrchestrator = new AssetCharacteristicOrchestrator();
const assetNameTypeOrchestrator: AssetNameTypeOrchestrator = new AssetNameTypeOrchestrator();
const assetIdentifierTypeOrchestrator: AssetIdentifierTypeOrchestrator = new AssetIdentifierTypeOrchestrator();
const assetRoleTypeOrchestrator: AssetRoleTypeOrchestrator = new AssetRoleTypeOrchestrator();

export const typeDef = gql`
    extend type Mutation {
        addAssetType(assetType: AssetTypeInput): AssetType
        updateAssetType(assetTypeId: ID!, assetType: AssetTypeInput): Int
        deleteAssetType(assetTypeId: ID!): Int
    }
    extend type Query {
        getAssetType(assetTypeId: ID!): AssetType
        getAssetTypes(pageNumber: Int!, pageSize: Int!, sortOrder: String!): AssetTypes
        findAssetTypes(searchStr: String!, pageSize: Int!): [AssetType]
    }
    type AssetType {
        assetTypeId: ID!
        instanceId: ID!
        parentId: ID!
        name: String!
        description: String!
        specification: AssetSpecification
        assignedCharacteristics: [AssignedCharacteristic]
        assetNames: [AssetName]
        identifiers: [AssetIdentifier]
        roles: [AssetRole]
    }
    type AssetTypes {
        assetTypes: [AssetType]
        page: Page
    }
    type AssetSpecification {
        brandId: ID
        modelNumber: String
        standardPrice: String
        effectiveDate: String
        totalSalesValue: String
        brand: Brand
    }
    type AssignedCharacteristic {
        assetCharacteristicId: ID
        assetCharacteristic: AssetCharacteristic
        value: String
    }
    type AssetName {
        assetNameTypeId: ID
        assetNameType: AssetNameType
        value: String
    }
    type AssetIdentifier {
        assetIdentifierTypeId: ID
        assetIdentifierType: AssetIdentifierType
        value: String
    }
    type AssetRole {
        assetRoleTypeId: ID
        assetRoleType: AssetRoleType
        value: String
    }
    input AssetTypeInput {
        instanceId: ID!
        parentId: ID!
        name: String!
        description: String!
        specification: AssetSpecificationInput
        assignedCharacteristics: [AssignedCharacteristicInput]
        assetNames: [AssetNameInput]
        identifiers: [AssetIdentifierInput]
        roles: [AssetRoleInput]
    }
    input AssetSpecificationInput {
        brandId: ID
        modelNumber: String
        standardPrice: String
        effectiveDate: String
        totalSalesValue: String
    }
    input AssignedCharacteristicInput {
        assetCharacteristicId: ID
        value: String
    }
    input AssetNameInput {
        assetNameTypeId: ID
        value: String
    }
    input AssetIdentifierInput {
        assetIdentifierTypeId: ID
        value: String
    }
    input AssetRoleInput {
        assetRoleTypeId: ID
        value: String
    }
`;

export const resolvers = {
    AssetSpecification: {
        async brand(assetSpecification: AssetSpecification) {
            return await brandOrchestrator.getBrandById(assetSpecification.brandId);
        }
    },
    AssignedCharacteristic: {
        async assetCharacteristic(assignedCharacteristic: AssignedCharacteristic) {
            return await assetCharacteristicOrchestrator.getAssetCharacteristicById(assignedCharacteristic.assetCharacteristicId);
        }
    },
    AssetName: {
        async assetNameType(assetName: AssetName) {
            return await assetNameTypeOrchestrator.getAssetNameTypeById(assetName.assetNameTypeId);
        }
    },
    AssetIdentifier: {
        async assetIdentifierType(assetIdentifierType: AssetIdentifierType) {
            return await assetIdentifierTypeOrchestrator.getAssetIdentifierTypeById(assetIdentifierType.assetIdentifierTypeId);
        }
    },
    AssetRole: {
        async assetRoleType(assetRoleType: AssetRoleType) {
            return await assetRoleTypeOrchestrator.getAssetRoleTypeById(assetRoleType.assetRoleTypeId);
        }
    },
    Mutation: {
        addAssetType: async (_: any, {assetType}: any) => {
            return await assetTypeOrchestrator.addAssetType(assetType).toPromise();
        },
        updateAssetType: async (_: any, {assetTypeId, assetType}: any) => {
            return await assetTypeOrchestrator.updateAssetType(assetTypeId, assetType).toPromise();
        },
        deleteAssetType: async (_: any, {assetTypeId}: any) => {
            return await assetTypeOrchestrator.deleteAssetType(assetTypeId).toPromise();
        }
    },
    Query: {
        getAssetType: async (_: any, {assetTypeId}: any) => {
            return await assetTypeOrchestrator.getAssetTypeById(assetTypeId).toPromise();
        },
        getAssetTypes: async (_: any, {pageNumber, pageSize, sortOrder}: any) => {
            const number = getNumericValueOrDefault(pageNumber, 1);
            const size = getNumericValueOrDefault(pageSize, 10);
            const field = getStringValueOrDefault(undefined, "");
            const direction = getStringValueOrDefault(sortOrder, "");

            const asc: string = Direction[Direction.ASC];
            const desc: string = Direction[Direction.DESC];

            const order = new Order();
            if (direction == asc) {
                order.property = field;
                order.direction = Direction.ASC;
            } else if (direction == desc) {
                order.property = field;
                order.direction = Direction.DESC;
            } else {
                order.property = field;
                order.direction = Direction.ASC;
            }

            const sort = new Sort();
            sort.add(order);
            return await assetTypeOrchestrator.getAssetTypes(number, size, sort).toPromise();
        },
        findAssetTypes: async (_: any, {searchStr, pageSize}: any) => {
            return await assetTypeOrchestrator.findAssetTypes(searchStr, undefined, pageSize).toPromise();
        },
    }
};
