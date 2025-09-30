# 🛒 EcuAmazon - E-commerce Full Stack Application

Un clon completo de Amazon desarrollado con tecnologías modernas. Sistema de comercio electrónico robusto que incluye gestión de usuarios, catálogo de productos, carrito de compras, procesamiento de pedidos y dashboard de vendedores.

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Apollo](https://img.shields.io/badge/Apollo%20GraphQL-311C87?style=for-the-badge&logo=apollo-graphql&logoColor=white)

## 🏗️ Arquitectura del Sistema

### Patrón: Cliente-Servidor con API GraphQL
```
┌─────────────────┐    GraphQL/HTTP    ┌─────────────────┐    Mongoose    ┌─────────────────┐
│   React Client  │ ←─────────────────→ │  Apollo Server  │ ←────────────→ │    MongoDB      │
│  (Frontend)     │                    │   (Backend)     │                │   (Database)    │
└─────────────────┘                    └─────────────────┘                └─────────────────┘
         │                                       │
         │                                       │
    ┌─────────┐                           ┌─────────────┐
    │ Context │                           │  Resolvers  │
    │  State  │                           │ Controllers │
    └─────────┘                           └─────────────┘
```

### 🎯 Patrones de Diseño Implementados

- **MVC (Model-View-Controller)**: Separación clara de responsabilidades
- **Repository Pattern**: Acceso a datos a través de Mongoose ODM
- **Observer Pattern**: React Context para manejo de estado global
- **Strategy Pattern**: Diferentes estrategias de autenticación (Cliente/Vendedor)
- **Command Pattern**: Mutations de GraphQL como comandos encapsulados

## 🚀 Características Principales

### 👥 Gestión de Usuarios
- ✅ Registro y autenticación de clientes
- ✅ Registro y autenticación de vendedores
- ✅ Autenticación JWT con roles diferenciados
- ✅ Dropdown de login con opciones Cliente/Vendedor
- ✅ Auto-login después del registro

### 🛍️ Catálogo de Productos
- ✅ CRUD completo de productos (vendedores)
- ✅ Categorización de productos
- ✅ Gestión de inventario automática
- ✅ Upload de imágenes a AWS S3
- ✅ Vista pública del catálogo

### 🛒 Carrito de Compras
- ✅ Agregar productos al carrito
- ✅ Modificar cantidades
- ✅ Eliminar productos del carrito
- ✅ Cálculo automático de totales
- ✅ Persistencia del carrito en contexto

### 💳 Procesamiento de Pedidos
- ✅ Checkout con auto-fill de datos del usuario
- ✅ Creación y gestión de pedidos
- ✅ Estados de pedidos (PENDIENTE → COMPLETADO → CANCELADO)
- ✅ Historial de pedidos para clientes
- ✅ Cola de pedidos para vendedores

### 📊 Dashboard de Vendedores
- ✅ Métricas de ventas y revenue
- ✅ Gestión de productos
- ✅ Administración de pedidos
- ✅ Analytics de rendimiento
- ✅ Actividad reciente

## 🛠️ Stack Tecnológico

### Frontend
- **React 17**: Biblioteca de UI con hooks y context
- **Apollo Client**: Cliente GraphQL con cache inteligente
- **React Router DOM v5**: Navegación SPA
- **Material-UI**: Componentes de interfaz de usuario
- **CKEditor**: Editor de texto enriquecido

### Backend
- **Apollo Server**: Servidor GraphQL
- **Node.js**: Runtime de JavaScript
- **Express**: Framework web (integrado con Apollo)
- **JWT**: Autenticación basada en tokens
- **bcryptjs**: Hashing seguro de contraseñas

### Base de Datos
- **MongoDB**: Base de datos NoSQL
- **Mongoose**: ODM para MongoDB con esquemas tipados

### Infraestructura
- **AWS S3**: Almacenamiento de imágenes
- **dotenv**: Gestión de variables de entorno

## 📁 Estructura del Proyecto

```
clon-amazon/
├── cliente/                    # Frontend React
│   ├── public/
│   ├── src/
│   │   ├── components/         # Componentes reutilizables
│   │   │   ├── Header.js       # Navegación principal
│   │   │   ├── Footer.js       # Pie de página
│   │   │   └── layout/         # Componentes de layout
│   │   ├── pages/              # Páginas principales
│   │   │   ├── SignClient/     # Registro/Login clientes
│   │   │   ├── SignSeller/     # Registro/Login vendedores
│   │   │   ├── VendorDashboard.js  # Dashboard vendedores
│   │   │   └── ...
│   │   ├── context/            # Estado global
│   │   │   └── Cart/           # Contexto del carrito
│   │   ├── config/             # Configuración Apollo
│   │   ├── helpers/            # Funciones utilitarias
│   │   ├── hooks/              # Custom hooks
│   │   └── stylesComponents/   # Estilos CSS
│   └── package.json
├── servidor/                   # Backend GraphQL
│   ├── db/
│   │   ├── schema.js           # Esquema GraphQL
│   │   └── resolvers.js        # Resolvers GraphQL
│   ├── Models/                 # Modelos Mongoose
│   │   ├── UserClient.js       # Modelo de clientes
│   │   ├── UserSeller.js       # Modelo de vendedores
│   │   ├── Products.js         # Modelo de productos
│   │   └── Orders.js           # Modelo de pedidos
│   ├── controllers/            # Lógica de negocio
│   ├── config/                 # Configuración BD
│   ├── utils/                  # Utilidades AWS
│   ├── variables.env           # Variables de entorno
│   └── package.json
├── ANALISIS_PROYECTO.md        # Análisis técnico
├── CLAUDE.md                   # Instrucciones del proyecto
└── README.md                   # Este archivo
```

## ⚙️ Instalación y Configuración

### Prerrequisitos
- Node.js v21.5.0 o superior
- MongoDB instalado y ejecutándose
- Cuenta de AWS con S3 configurado

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/ecuamazon.git
cd ecuamazon
```

### 2. Configurar el Backend
```bash
cd servidor
npm install

# Crear archivo de variables de entorno
cp variables.env.example variables.env
```

Editar `variables.env` con tus credenciales:
```env
DB_MONGO=mongodb://localhost:27017/ecuamazon
TOKEN_SECRET=tu_secret_jwt_muy_seguro
AWS_ID=tu_aws_access_key
AWS_SECRET=tu_aws_secret_key
AWS_BUCKET_NAME=tu-bucket-s3
```

### 3. Configurar el Frontend
```bash
cd ../cliente
npm install
```

### 4. Iniciar los servicios

**Terminal 1 - Backend:**
```bash
cd servidor
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd cliente
npm start
```

## 🌐 URLs de Acceso

- **Frontend**: http://localhost:3000
- **GraphQL Playground**: http://localhost:4000
- **API GraphQL**: http://localhost:4000/graphql

## 📋 Funcionalidades por Rol

### 👤 Cliente
- Registro y login de cuenta
- Navegación del catálogo de productos
- Agregar productos al carrito
- Checkout con auto-fill de datos
- Historial de pedidos
- Gestión de perfil

### 🏪 Vendedor
- Registro y login de cuenta de vendedor
- Dashboard con métricas de ventas
- CRUD de productos con imágenes
- Gestión de inventario
- Administración de pedidos
- Analytics de rendimiento

## 🔐 Autenticación y Seguridad

- **JWT Tokens**: Autenticación stateless
- **Bcrypt**: Hashing seguro de contraseñas
- **Roles**: Separación Cliente/Vendedor
- **Middleware**: Validación automática de tokens
- **CORS**: Configurado para desarrollo

## 📊 Base de Datos

### Modelos Principales

**UserClient**
```javascript
{
  name: String,
  surname: String,
  email: String (unique),
  password: String (hashed),
  address: String,
  province: String,
  city: String,
  phone: String
}
```

**UserSeller**
```javascript
{
  name: String,
  surname: String,
  email: String (unique),
  password: String (hashed),
  company: String
}
```

**Product**
```javascript
{
  name: String,
  price: Float,
  stock: Int,
  description: String,
  category: String,
  seller: ObjectId (ref: UserSeller),
  urls: [String], // AWS S3 URLs
  status: String (draft/complete)
}
```

**Order**
```javascript
{
  order: [OrderItem],
  total: Float,
  client: ObjectId (ref: UserClient),
  seller: ObjectId (ref: UserSeller),
  state: OrderState (PENDIENTE/COMPLETADO/CANCELADO),
  createdAt: Date
}
```

## 🧪 Testing

```bash
# Frontend
cd cliente
npm test

# Backend (si se implementan tests)
cd servidor
npm test
```

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
cd cliente
npm run build
# Subir carpeta build/ a tu servicio de hosting
```

### Backend (Heroku/Railway)
```bash
cd servidor
# Configurar variables de entorno en el servicio
# Deployear según la plataforma elegida
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es para fines educativos. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu.email@ejemplo.com

## 🤖 Herramientas de Desarrollo

Este proyecto fue desarrollado utilizando herramientas modernas de desarrollo:
- **Claude Code**: Asistencia de IA para pair programming y arquitectura
- **GitHub Copilot**: Autocompletado inteligente de código
- **Material-UI**: Biblioteca de componentes React
- **Apollo DevTools**: Debugging de GraphQL

## 🙏 Reconocimientos

- Diseño inspirado en Amazon.com
- Icons por Material-UI
- Deployment tools: Netlify, Vercel, Heroku
- Database: MongoDB Atlas
- AI assistance: Claude Code para desarrollo colaborativo

---

⭐ **¡Dale una estrella al proyecto si te ha sido útil!**