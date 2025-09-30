# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack Amazon clone e-commerce application with a React frontend and GraphQL Apollo Server backend. The architecture follows a client-server pattern with MongoDB for data persistence and AWS S3 for image storage.

## Architecture

### Client (`/cliente`)
- **Framework**: React 17 with Create React App
- **State Management**: Apollo Client for GraphQL state and local storage for auth tokens
- **UI Framework**: Material-UI (@material-ui/core)
- **Routing**: React Router DOM v5
- **GraphQL Client**: Apollo Client with upload support
- **Key Dependencies**: CKEditor for rich text editing, lodash for utilities

### Server (`/servidor`)
- **Framework**: Apollo Server (GraphQL)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcryptjs for password hashing
- **File Upload**: Apollo Server upload capabilities
- **Cloud Storage**: AWS SDK for S3 image storage
- **Environment**: Node.js with dotenv for configuration

## Development Commands

### Client Development
```bash
cd cliente
npm start          # Run development server (http://localhost:3000)
npm test           # Run test suite in watch mode
npm run build      # Build for production
```

### Server Development
```bash
cd servidor
npm run dev        # Run server with nodemon (auto-restart on changes)
npm start          # Run server in production mode
```

## Project Structure

### Client Structure (`/cliente/src/`)
- `pages/` - Main application pages (Login, SignUp, Product, Cart, etc.)
- `components/` - Reusable UI components (Header, Footer, Home)
- `context/` - React Context for global state management
- `config/client.js` - Apollo Client configuration with auth headers
- `hooks/` - Custom React hooks
- `helpers/` - Utility functions
- `routes/` - Route configuration
- `stylesComponents/` - Styled components

### Server Structure (`/servidor/`)
- `db/schema.js` - GraphQL type definitions and schema
- `db/resolvers.js` - GraphQL resolvers for queries and mutations
- `Models/` - Mongoose data models (UserSeller, UserClient, Products, Orders)
- `controllers/` - Business logic controllers
- `config/database.js` - MongoDB connection configuration
- `utils/` - Server utility functions
- `variables.env` - Environment variables (MongoDB URI, JWT secret, AWS credentials)

## GraphQL Schema Overview

### Core Types
- **UserSeller**: Store owners with authentication and store management
- **UserClient**: Customers with profile and address information
- **Product**: Items with pricing, inventory, categories, and image URLs
- **Order**: Purchase transactions with items, totals, and order states
- **UrlProduct**: Product image URLs stored in AWS S3

### Key Operations
- User authentication (sellers and clients)
- Product CRUD operations with image upload
- Order management with state tracking
- File uploads to AWS S3 for product images

## Database Models

The application uses MongoDB with Mongoose for:
- User management (sellers and clients with separate schemas)
- Product catalog with categories and inventory tracking
- Order processing with status management
- Image URL storage linked to AWS S3

## Authentication Flow

1. Client login generates JWT token via GraphQL mutation
2. Token stored in localStorage on frontend
3. Apollo Client automatically includes token in Authorization header
4. Server validates JWT and provides user context to resolvers
5. Protected routes require valid authentication

## Environment Configuration

The server requires environment variables in `servidor/variables.env`:
- `DB_MONGO`: MongoDB connection string
- `TOKEN_SECRET`: JWT signing secret
- `AWS_ID`, `AWS_SECRET`, `AWS_BUCKET_NAME`: AWS S3 credentials

## Development Notes

- GraphQL Playground available at http://localhost:4000 when server is running
- Client connects to server at http://localhost:4000/
- Image uploads are handled via GraphQL multipart requests to S3
- Material-UI theme and styling used throughout the frontend
- Order states: PENDIENTE, COMPLETADO, CANCELADO