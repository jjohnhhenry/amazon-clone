const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");
require("dotenv").config({ path:"variables.env" });
const jwt = require("jsonwebtoken");

const conectDb = require("./config/database");
const uploadRoutes = require("./routes/upload");

//Conect to database
conectDb();

// Create Express app
const app = express();

// Apply middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// REST API routes
app.use('/api/upload', uploadRoutes);

// Server info endpoint
app.get('/api/info', (req, res) => {
    res.json({
        name: 'Amazon Clone API',
        version: '1.0.0',
        status: 'running',
        services: {
            graphql: {
                endpoint: '/graphql',
                status: 'active',
                description: 'GraphQL API for products, users, and orders'
            },
            upload: {
                endpoint: '/api/upload',
                status: 'active',
                description: 'REST API for file uploads'
            }
        },
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

//GraphQL server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    uploads: false, // Disable built-in upload to avoid fs-capacitor issues
    plugins: [
        {
            requestDidStart() {
                return {
                    willSendResponse(requestContext) {
                        console.log('=== DEBUG SERVER: Respuesta enviada ===');
                        console.log('Operation:', requestContext.request.operationName);
                        console.log('Query:', requestContext.request.query);
                    },
                    didResolveOperation(requestContext) {
                        console.log('=== DEBUG SERVER: Operación resuelta ===');
                        console.log('Operation name:', requestContext.request.operationName);
                        console.log('Variables:', requestContext.request.variables);
                    },
                    didEncounterErrors(requestContext) {
                        console.log('=== DEBUG SERVER: Error encontrado ===');
                        console.log('Errors:', requestContext.errors);
                    }
                };
            }
        }
    ],
    context: ({req}) => {
        console.log(req.headers);
        const token = req.headers.authorization || "";
        const newToken = token.replace("Bearer ", "");
        console.log('Token received:', newToken);

        if(newToken) {
            try {
                const decodedUser = jwt.verify(
                    newToken,
                    process.env.TOKEN_SECRET
                );
                console.log('Token decoded successfully:', decodedUser);

                // Determine if it's a client or seller based on token content
                // For this project, we'll use both userSeller and userClient
                return {
                    userSeller: decodedUser, // For seller queries
                    userClient: decodedUser   // For client queries
                }
            } catch (error) {
                console.log('JWT verification error:', error.message);
                return {}; // Return empty context on error
            }
        }

        console.log('No token provided');
        return {}; // Return empty context when no token
    }
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
        console.log(`Upload endpoint: http://localhost:${PORT}/api/upload`);
    });
}

startServer().catch(error => {
    console.error('Failed to start server:', error);
});