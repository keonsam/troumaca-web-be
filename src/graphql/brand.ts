import { gql} from "apollo-server-express";
import { getNumericValueOrDefault } from "../number.util";
import { getStringValueOrDefault } from "../string.util";
import { Direction } from "../util/direction";
import { Order } from "../util/order";
import { Sort } from "../util/sort";
import { BrandOrchestrator } from "../brand/brand.orchestrator";
import { Brand } from "../data/asset/brand";

const brandOrchestrator: BrandOrchestrator = new BrandOrchestrator();

export const typeDef = gql`
    extend type Mutation {
        addBrand(name: String!, abbreviation: String!, description: String!): Brand
        updateBrand(brandId: ID!, name: String!, abbreviation: String!, description: String!): Int
        deleteBrand(brandId: ID!): Int
    }
    extend type Query {
        getBrand(brandId: ID!): Brand
        getBrands(pageNumber: Int!, pageSize: Int!, sortOrder: String!): Brands
        findBrands(searchStr: String!, pageSize: Int!): [Brand]
    }
    type Brand {
        brandId: ID
        name: String
        abbreviation: String
        description: String
    }
    type Brands {
        assetNameTypes: [Brand]
        page: Page
    }
`;

export const resolvers = {
    Mutation: {
        addBrand: async (_: any, {name, abbreviation, description}: any) => {
            return await brandOrchestrator.saveBrand(new Brand(name, abbreviation, description)).toPromise();
        },
        updateBrand: async (_: any, {brandId, name, abbreviation, description}: any) => {
            return await brandOrchestrator.updateBrand(brandId, new Brand(name, abbreviation, description)).toPromise();
        },
        deleteBrand: async (_: any, {brandId}: any) => {
            return await brandOrchestrator.deleteBrand(brandId).toPromise();
        }
    },
    Query: {
        getBrand: async (_: any, {brandId}: any) => {
            return await brandOrchestrator.getBrandById(brandId).toPromise();
        },
        getBrands: async (_: any, {pageNumber, pageSize, sortOrder}: any) => {
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
            return await brandOrchestrator.getBrands(number, size, sort).toPromise();
        },
        findBrands: async (_: any, {searchStr, pageSize}: any) => {
            return await brandOrchestrator.findBrands(searchStr, undefined, pageSize).toPromise();
        },
    }
};
