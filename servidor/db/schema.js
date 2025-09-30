const { gql } = require("apollo-server");


const typeDefs = gql`
    type UserSeller {
        id: ID
        name: String
        surname: String
        identification: String
        email: String
        storeName: String
        urlStore: String
        created: String
    }

    type UserClient {
        id: ID
        name: String
        surname: String
        identification: String
        email: String
        address: String
        province: String
        city: String
        created: String
    }

    type Token {
        token: String
    }

    type Product {
        id: ID
        name: String!
        price: String!
        ofert: String
        stock: String
        brand: String
        category: String!
        subcategory: String
        description: String
        status: String
        urls: [UrlProduct]
        seller: ID
        created: String
    }

    
    type UrlProduct {
        urlsProduct: String
    }

    type Order {
        id: ID
        order: [OrderGroup]
        total: Float
        client: ID
        seller: UserSeller
        created: String
        state: OrderState
    }

    type OrderGroup {
        id: ID
        quantity: Int
    }

    input UserSellerInput {
        name: String!
        surname: String!
        identification: String!
        email: String!
        storeName: String!
        urlStore: String!
        password: String!
    }

    input userClientInput {
        name: String!
        surname: String
        identification: String
        email: String!
        password: String!
        address: String
        province: String
        city: String
    }

    input AuthInput {
        email: String!
        password: String!
    }

    input ProductInput {
        name: String!
        price: String!
        ofert: String
        stock: String
        brand: String
        category: String!
        subcategory: String
        description: String
    }

    input OrderProductInput {
        id: ID
        quantity: Int
    }

    input OrderInput {
        order: [OrderProductInput]
        total: Float!
        seller: ID!
        state: OrderState
    }

    enum OrderState {
        PENDIENTE
        COMPLETADO
        CANCELADO
    }

    type Query {
        getUserSeller(token: String!) : UserSeller
        getUserClient : UserClient

        getProducts : [Product]
        getProduct(id: ID!) : Product
        getProductsBySeller : [Product]
        getProductBySeller(id: ID!) : Product

        getOrders : [Order]
        getClientOrders : [Order]
    }

    type Mutation {
       #Clients
       newUserClient(input: userClientInput) : UserClient
       authClient(input: AuthInput) : Token
       authClientEmail(email: String) : String

        #Sellers
        newUserSeller(input: UserSellerInput) : UserSeller
        authSeller(input: AuthInput) : Token

        #Products
        newProduct(input: ProductInput) : Product
        updateProduct(id: ID!, input: ProductInput): Product
        deleteProduct(id: ID!) : String

        #Orders
        newOrder(input: OrderInput) : Order
        updateOrder(id: ID!, input: OrderInput ): Order
        updateOrderStatus(id: ID!, state: OrderState!) : Order
    }
`;

module.exports = typeDefs;