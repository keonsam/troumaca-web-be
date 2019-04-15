import { gql, ApolloError } from "apollo-server-express";
import { getNumericValueOrDefault } from "../../number.util";
import { getStringValueOrDefault } from "../../string.util";
import { Direction } from "../../util/direction";
import { Order } from "../../util/order";
import { Sort } from "../../util/sort";
import { BrandOrchestrator } from "../../asset/brand/brand.orchestrator";
import { HeaderBaseOptions } from "../../header.base.options";

const brandOrchestrator: BrandOrchestrator = new BrandOrchestrator();

export const typeDef = gql`
    extend type Mutation {
        addBrand(brand: BrandInput): Brand @requireAuth
        updateBrand(brandId: ID!, brand: BrandInput): Int @requireAuth
        deleteBrand(brandId: ID!): Int @requireAuth
    }
    extend type Query {
        getBrand(brandId: ID!): Brand @requireAuth
        getBrands(pageNumber: Int!, pageSize: Int!, sortOrder: String!): Brands @requireAuth
        findBrands(searchStr: String!, pageSize: Int!): [Brand] @requireAuth
    }
    type Brand {
        brandId: ID
        name: String
        abbreviation: String
        description: String
    }
    type Brands {
        brands: [Brand]
        page: Page
    }
    input BrandInput {
        name: String!
        abbreviation: String
        description: String
        version: String!
    }
`;

export const resolvers = {
    Mutation: {
        addBrand: async (_: any, {brand}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await brandOrchestrator
                .saveBrand(brand, headerOptions)
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error);
                });
        },
        updateBrand: async (_: any, {brandId, brand}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await brandOrchestrator
                .updateBrand(brandId, brand, headerOptions)
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error);
                });
        },
        deleteBrand: async (_: any, {brandId}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await brandOrchestrator
                .deleteBrand(brandId, headerOptions)
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error);
                });
        }
    },
    Query: {
        getBrand: async (_: any, {brandId}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await brandOrchestrator
                .getBrandById(brandId, headerOptions)
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error);
                });
        },
        getBrands: async (_: any, {pageNumber, pageSize, sortOrder}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
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
            return await brandOrchestrator
                .getBrands(number, size, sort, headerOptions)
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error);
                });
        },
        findBrands: async (_: any, {searchStr, pageSize}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await brandOrchestrator
                .findBrands(searchStr, pageSize, headerOptions)
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error);
                });
        },
    }
};
