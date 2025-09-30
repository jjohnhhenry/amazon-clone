const UserSeller = require("../Models/UserSeller");
const Products = require("../Models/Products");
const UserClient = require("../Models/UserClient");
const bcryptjs = require("bcryptjs");
require("dotenv").config({ path:"variables.env" });
const jsonwebtoken = require("jsonwebtoken");
const Orders = require("../Models/Orders");
const awsUploadImage = require("../utils/aws-upload-img");
const awsQueryImg = require("../utils/aws-query-img");

const userSellerController = require("../controllers/userSellers");

// Import createToken function
const jwt = require("jsonwebtoken");
const createToken = (user, secret, expiresIn) => {
    const { id, email, name } = user;
    const payload = { id, name, email };
    return jwt.sign(payload, secret, { expiresIn });
};


const resolvers = {
    Query: {
        getUserSeller: async (_, {token}) => {
            const userId = await jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
            console.log(userId);
            return userId
        },
        getUserClient: async (_, {}, ctx) => {
            try {
                console.log('getUserClient called, context:', ctx);

                // Check if user is authenticated via context
                if (!ctx.user) {
                    throw new Error("No tienes autorización");
                }

                // Find the client by the authenticated user's ID
                const client = await UserClient.findById(ctx.user.id);

                if (!client) {
                    throw new Error("Cliente no encontrado");
                }

                return client;
            } catch (error) {
                console.log('Error in getUserClient:', error);
                throw error;
            }
        },
        getProducts: async () => {
            try {
                // Return products that are either explicitly complete OR have images (backward compatibility)
                const products = await Products.find({
                    $or: [
                        { status: 'complete' },
                        { urls: { $exists: true, $ne: [], $not: { $size: 0 } } }
                    ]
                });

                return products;
            } catch (error) {
                console.log(error);
            }
        },
        getProduct: async (_, {id} ) => {
            //check if product exist
            const product = await Products.findById(id);

            if(!product) {
                throw new Error("Producto no existe");
            }

            return product;
        },
        getProductsBySeller: async (_, {}, ctx) => {
            try {
                const productsBySeller = await Products.find({ seller: ctx.userSeller.id.toString()});
                return productsBySeller;
            } catch (error) {
                console.log(error);
            }
        },
        getProductBySeller: async (_, {id}, ctx) => {
            //check if product exist
            const product = await Products.findById(id);

            if(!product) {
                throw new Error("Producto no encontrado");
            }

            if(product.seller.toString() !== ctx.userSeller.id) {
                throw new Error("Producto no existe en tus registros");
            }

            return product;
        },
        getOrders: async (_, {}, ctx) => {

            try {
                const orders = await Orders.find({seller: ctx.userSeller.id.toString()});
                return orders;
            } catch (error) {
                console.log(error)
            }
        },
        getClientOrders: async (_, {}, ctx) => {
            console.log('getClientOrders called, context:', ctx);

            if (!ctx || !ctx.userClient) {
                console.log('No user client in context');
                throw new Error('Authentication required');
            }

            try {
                console.log('Searching orders for client:', ctx.userClient.id);
                const orders = await Orders.find({client: ctx.userClient.id.toString()}).populate('seller');
                console.log('Found orders:', orders.length);
                return orders;
            } catch (error) {
                console.log('Error in getClientOrders:', error);
                throw new Error('Failed to fetch orders');
            }
        }
    },
    Mutation: {
        newUserSeller: (_, {input} ) => userSellerController.registerSeller(input),

        authSeller: async (_, {input} ) => userSellerController.loginSeller(input),

        newProduct: async (_, {input}, ctx ) => {

            try {
                console.log('=== DEBUG SERVER: newProduct mutation iniciada ===');
                console.log('DEBUG: Input recibido:', JSON.stringify(input, null, 2));
                console.log('DEBUG: Context userSeller:', ctx.userSeller ? ctx.userSeller.id : 'NO AUTHENTICADO');

                if( !ctx.userSeller ){
                    console.log('DEBUG: Error - Usuario no autenticado');
                    throw new Error("Debe Iniciar Sesión")
                }

                console.log('DEBUG: Creando nuevo producto con input:', input);
                let product = new Products(input);
                product.seller = ctx.userSeller.id;

                console.log('DEBUG: Producto antes de guardar:', JSON.stringify(product, null, 2));
                const productSave = await product.save();
                console.log('DEBUG: Producto guardado exitosamente:', JSON.stringify(productSave, null, 2));

                return productSave;
            } catch (error) {
                console.log('DEBUG: Error en newProduct:', error);
                console.log('DEBUG: Error message:', error.message);
                console.log('DEBUG: Error stack:', error.stack);
                throw error;
            }
        },
        updateProduct: async (_, {id, input}, ctx ) => {
            try {
                 //check if product exist
                let product = await Products.findById(id);

                console.log("este es la variable" + product)

                if(!product) {
                    throw new Error("Producto no existe");
                }

                if(product.seller.toString() !== ctx.userSeller.id) {
                    throw new Error("Producto no existe en tus registros");
                }

                product = await Products.findOneAndUpdate({_id : id}, input, {new:true});
                
                return product;
            } catch (error) {
                console.log(error);
            }
        },
        deleteProduct: async (_, {id}, ctx ) => {
            try {
                //check if product exist
                let product = await Products.findById(id);

                if(!product) {
                throw new Error("Producto no existe");
                }

                if(product.seller.toString() !== ctx.userSeller.id) {
                    throw new Error("Producto no existe en tus registros");
                }

                await Products.findOneAndDelete({_id : id});

                return "Producto Eliminado";
                
            } catch (error) {
                console.log(error);
            }
        },
        newUserClient: async (_, {input}) => {
            const { email, password } = input;

            //Check that user exist
            const existUserC = await UserClient.findOne({email});
            if (existUserC) {
                throw new Error("El usuario ya está registrado");
            }

            //hashear password
            const salt = await bcryptjs.genSalt(10);
            input.password = await bcryptjs.hash(password, salt);

            try {
                const userClient = new UserClient(input);
                await userClient.save();
                return userClient;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },authClientEmail: async (_, {email}) => {
            const existUser = await UserClient.findOne({email});
            if(!existUser) {
                throw new Error("El usuario no está registrado")
            }

            return email;
        },
        authClient: async (_, {input}) => {
            const { email, password} = input;
            //check that user exist
            const existUser = await UserClient.findOne({email});
            if (!existUser) {
                throw new Error("El usuario no está registrado");
            }

            //check if exist password
            const successPassword = await bcryptjs.compare(password, existUser.password);
            if(!successPassword) {
                throw new Error("La contraseña es incorrecta");
            }

            return {
                token: createToken(existUser, process.env.TOKEN_SECRET, "24h") 
            }
        },
        newOrder: async (_, {input}, ctx) => {

            try {
                //check login client
                if( !ctx.userClient ){
                    throw new Error("Debe Iniciar Sesión")
                }

                let sellerId = null;

                for await ( const item of input.order ) {
                    const { id } = item;

                    const product = await Products.findById(id);

                    if(!product){
                        throw new Error("Producto no encontrado")
                    }else{
                        // Assign seller from the first product (assuming single seller per order)
                        if (!sellerId) {
                            sellerId = product.seller;
                        }

                        product.stock = product.stock - item.quantity;
                        await product.save();
                    }
                }

                const newOrder = new Orders(input);

                newOrder.client = ctx.userClient.id;
                newOrder.seller = sellerId; // Assign seller based on products

                const order = await newOrder.save();

                return order;

            } catch (error) {
                console.log(error)
                throw error;
            }
        },
        updateOrder: async (_, {id, input}, ctx) => {
            //check if order exist
            const existOrder = await Orders.findById(id);

            if(!existOrder) {
                throw new Error("Pedido no encontrado");
            }

            if(existOrder.seller.toString() !== ctx.userSeller.id) {
                throw new Error("No hallado en sus registros")
            }

            for await ( const item of input.order ) {
                const { id } = item;

                const product = await Products.findById(id);

                if(!product){
                    throw new Error("Producto no encontrado")
                }else{
                    product.stock = product.stock - item.quantity;

                    await product.save();
                }
            }

            const setOrder = await Orders.findOneAndUpdate({_id : id}, input, {new:true});

            return setOrder;


        },
        updateOrderStatus: async (_, {id, state}, ctx) => {
            try {
                // Check if seller is authenticated
                if (!ctx.userSeller) {
                    throw new Error("Debe Iniciar Sesión");
                }

                // Check if order exists
                const existOrder = await Orders.findById(id);
                if (!existOrder) {
                    throw new Error("Pedido no encontrado");
                }

                // Check if order belongs to this seller
                if (existOrder.seller.toString() !== ctx.userSeller.id) {
                    throw new Error("No hallado en sus registros");
                }

                // Update only the state
                const updatedOrder = await Orders.findOneAndUpdate(
                    {_id: id},
                    {state: state},
                    {new: true}
                ).populate('seller');

                return updatedOrder;

            } catch (error) {
                console.log('Error updating order status:', error);
                throw error;
            }
        }
    }
};

module.exports = resolvers;