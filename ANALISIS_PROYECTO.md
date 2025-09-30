# Análisis del Proyecto Clon de Amazon

## 🏗️ Arquitectura General

Este es un **clon de Amazon full-stack** desarrollado con tecnologías modernas:

- **Frontend**: React 17 con Create React App
- **Backend**: GraphQL Apollo Server con Node.js
- **Base de Datos**: MongoDB con Mongoose ODM
- **Almacenamiento**: AWS S3 para imágenes de productos
- **Autenticación**: JWT tokens con bcryptjs

## 📱 Frontend (Cliente)

### Tecnologías Principales
- React 17 con Material-UI (@material-ui/core v4.11.3)
- Apollo Client para GraphQL y estado global
- React Router DOM v5 para navegación
- CKEditor para edición de texto enriquecido
- Lodash para utilidades

### Estructura del Cliente (`/cliente/src/`)
```
src/
├── pages/              # Páginas principales
│   ├── SignClient/     # Autenticación de clientes
│   ├── addNewProduct/  # Agregar productos
│   ├── editProduct/    # Editar productos
│   ├── FrontPage.js    # Página principal
│   ├── DashboardSeller.js
│   └── index.js
├── components/         # Componentes reutilizables
├── context/           # Contexto de React
│   ├── AuthContext.js # Contexto de autenticación
│   └── Cart/          # Contexto del carrito
├── config/
│   └── client.js      # Configuración Apollo Client
├── routes/            # Configuración de rutas
├── helpers/           # Funciones auxiliares
├── hooks/             # Custom hooks
└── stylesComponents/  # Estilos
```

### Dependencias Clave
```json
{
  "@apollo/client": "^3.3.12",
  "@material-ui/core": "^4.11.3",
  "react": "^17.0.2",
  "react-router-dom": "^5.2.0",
  "apollo-upload-client": "^14.1.3",
  "graphql": "^15.5.0"
}
```

## 🔧 Backend (Servidor)

### Tecnologías Principales
- Apollo Server v2.21.0 para GraphQL
- MongoDB con Mongoose v5.11.17
- JWT para autenticación (jsonwebtoken v8.5.1)
- AWS SDK v2.879.0 para integración con S3
- bcryptjs v2.4.3 para hash de contraseñas

### Estructura del Servidor (`/servidor/`)
```
servidor/
├── db/
│   ├── schema.js      # Definiciones GraphQL
│   └── resolvers.js   # Resolvers GraphQL
├── Models/            # Modelos Mongoose
│   ├── UserSeller.js
│   ├── UserClient.js
│   ├── Products.js
│   └── Orders.js
├── config/
│   └── database.js    # Configuración MongoDB
├── controllers/       # Lógica de negocio
├── utils/            # Utilidades AWS S3
│   ├── aws-upload-img.js
│   └── aws-query-img.js
├── index.js          # Servidor principal
└── variables.env     # Variables de entorno
```

### Dependencias Clave
```json
{
  "apollo-server": "^2.21.0",
  "mongoose": "^5.11.17",
  "jsonwebtoken": "^8.5.1",
  "aws-sdk": "^2.879.0",
  "bcryptjs": "^2.4.3"
}
```

## 🗄️ Modelos de Base de Datos

### 1. UserSeller (Vendedores)
```javascript
{
  name: String,
  surname: String,
  identification: String (unique),
  email: String (unique),
  password: String (hashed),
  storeName: String,
  urlStore: String,
  createAt: Date
}
```

### 2. UserClient (Clientes)
```javascript
{
  name: String,
  surname: String,
  identification: String,
  email: String (unique),
  password: String (hashed),
  address: String,
  province: String,
  city: String,
  created: Date
}
```

### 3. Products (Productos)
```javascript
{
  name: String (required),
  price: String (required),
  ofert: String,
  stock: String,
  brand: String,
  category: String (required),
  subcategory: String,
  description: String (required),
  urls: [Object], // URLs de imágenes en S3
  seller: ObjectId (ref: UserSeller),
  created: Date
}
```

### 4. Orders (Órdenes)
```javascript
{
  order: [OrderGroup],
  total: Float,
  client: ObjectId,
  seller: ObjectId,
  date: String,
  state: OrderState (PENDIENTE|COMPLETADO|CANCELADO)
}
```

## 🔐 Sistema de Autenticación

### Flujo de Autenticación
1. **Login**: Cliente envía credenciales via GraphQL mutation
2. **Verificación**: Servidor valida con bcryptjs
3. **Token JWT**: Se genera y retorna al cliente
4. **Almacenamiento**: Token guardado en localStorage
5. **Autorización**: Apollo Client incluye token automáticamente
6. **Validación**: Middleware del servidor valida JWT en cada request

### Configuración Apollo Client
```javascript
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
});
```

## 📊 API GraphQL

### Queries Principales
- `getUserSeller(token)`: Obtener datos del vendedor
- `getProducts`: Listar todos los productos
- `getProduct(id)`: Obtener producto específico
- `getProductsBySeller`: Productos del vendedor autenticado
- `getOrders`: Obtener órdenes

### Mutations Principales
- **Usuarios**:
  - `newUserClient(input)`: Registro de cliente
  - `newUserSeller(input)`: Registro de vendedor
  - `authClient(input)`: Login cliente
  - `authSeller(input)`: Login vendedor

- **Productos**:
  - `newProduct(input)`: Crear producto
  - `updateProduct(id, input)`: Actualizar producto
  - `updateUrlProduct(files, id)`: Subir imágenes
  - `deleteProduct(id)`: Eliminar producto

- **Órdenes**:
  - `newOrder(input)`: Crear orden
  - `updateOrder(id, input)`: Actualizar estado de orden

## 🎨 Características Destacadas

### 1. Subida de Imágenes a AWS S3
- Integración completa con AWS SDK
- Upload multipart via GraphQL
- Gestión de URLs de imágenes en base de datos

### 2. Carritos de Compra
- Estado global con Context API y useReducer
- Persistencia entre sesiones
- Cálculo automático de totales

### 3. Sistema de Roles
- **Sellers**: Pueden crear/gestionar productos y ver sus órdenes
- **Clients**: Pueden comprar productos y gestionar perfil
- Rutas protegidas según rol

### 4. Interfaz Responsiva
- Material-UI components
- Diseño mobile-first
- Temas personalizables

## ⚙️ Configuración del Proyecto

### Variables de Entorno (`servidor/variables.env`)
```
DB_MONGO=mongodb://localhost:27017/amazon-clone
TOKEN_SECRET=your-jwt-secret
AWS_ID=your-aws-access-key
AWS_SECRET=your-aws-secret-key
AWS_BUCKET_NAME=your-s3-bucket
```

### Comandos de Desarrollo

#### Cliente
```bash
cd cliente
npm start          # Servidor de desarrollo (puerto 3000)
npm test           # Ejecutar tests
npm run build      # Build de producción
```

#### Servidor
```bash
cd servidor
npm run dev        # Servidor con nodemon (puerto 4000)
npm start          # Servidor de producción
```

## 🔍 Estado Actual del Proyecto

### ✅ Funcionalidades Implementadas
- Sistema de autenticación bifurcado (sellers/clients)
- CRUD completo de productos con imágenes
- Sistema de órdenes con estados
- Carritos de compra funcionales
- Integración con AWS S3
- Interfaz responsiva con Material-UI
- Rutas protegidas por autenticación
- GraphQL API completamente funcional

### 📝 Notas Técnicas
- Usa `--openssl-legacy-provider` en scripts de React (compatibilidad Node.js)
- Apollo Server v2 (considerar upgrade a v3/v4)
- Material-UI v4 (considerar upgrade a MUI v5)
- MongoDB con Mongoose ODM
- JWT stateless authentication

### 🚀 Posibles Mejoras
- Upgrade de dependencias (Apollo Server, Material-UI)
- Implementar pagination en productos
- Agregar sistema de reviews/ratings
- Implementar notificaciones en tiempo real
- Agregar tests unitarios e integración
- Implementar cache de Apollo Client
- Optimizar imágenes y lazy loading

## 📁 Archivos Clave

### Cliente
- `/cliente/src/App.js` - Componente principal con providers
- `/cliente/src/config/client.js` - Configuración Apollo Client
- `/cliente/src/context/AuthContext.js` - Contexto de autenticación
- `/cliente/package.json` - Dependencias y scripts

### Servidor
- `/servidor/index.js` - Servidor Apollo principal
- `/servidor/db/schema.js` - Schema GraphQL
- `/servidor/db/resolvers.js` - Resolvers GraphQL
- `/servidor/Models/` - Modelos Mongoose
- `/servidor/package.json` - Dependencias del servidor

Este proyecto demuestra una implementación sólida de un e-commerce full-stack con tecnologías modernas y buenas prácticas de desarrollo.