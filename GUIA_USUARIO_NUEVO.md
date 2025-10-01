# 🚀 GUÍA COMPLETA PARA NUEVO DESARROLLADOR - PROYECTO ECUAMAZON

## 📋 REQUISITOS PREVIOS

### ✅ Lo que NECESITAS tener instalado:
1. **Docker Desktop** (versión 20.10+)
2. **Docker Compose** (versión 1.25+)
3. **Git** (para clonar el repositorio)

### ❌ Lo que NO necesitas instalar:
- ❌ Node.js (se ejecuta en contenedor)
- ❌ MongoDB (se ejecuta en contenedor)
- ❌ npm/yarn global (se ejecuta en contenedor)

---

## 🔧 PASO 1: VERIFICAR PRERREQUISITOS

### Verificar Docker
```bash
docker --version
# Debe mostrar: Docker version 20.10+ o superior

docker-compose --version
# Debe mostrar: docker-compose version 1.25+ o superior
```

### Verificar que Docker esté ejecutándose
```bash
docker ps
# Si funciona, Docker está corriendo
```

---

## 📥 PASO 2: CLONAR EL REPOSITORIO

```bash
# Clonar el proyecto
git clone <URL_DEL_REPOSITORIO>
cd proyecto_uees/clon-amazon

# Verificar estructura del proyecto
ls -la
```

**Deberías ver estos archivos clave:**
- ✅ `docker-compose.dev.yml`
- ✅ `cliente/` (carpeta)
- ✅ `servidor/` (carpeta)
- ✅ `.env`

---

## ⚙️ PASO 3: CONFIGURAR VARIABLES DE ENTORNO

### 3.1 Verificar archivo .env
```bash
cat .env
```

### 3.2 El archivo .env debe contener:
```bash
# AWS S3 Configuration (para upload de imágenes)
AWS_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_BUCKET_NAME=ecuamazon-dev-bucket

# JWT Secret
JWT_SECRET=mi_clave_jwt_super_segura_para_desarrollo_2024_ecuamazon

# MongoDB Configuration (automática)
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=password123
MONGO_DATABASE=ecuamazon

# URLs de la aplicación
REACT_APP_GRAPHQL_URI=http://localhost:4000/graphql
REACT_APP_API_URL=http://localhost:4000

# Configuración de desarrollo
NODE_ENV=development
CHOKIDAR_USEPOLLING=true
```

**⚠️ IMPORTANTE**: Las credenciales AWS son de ejemplo para desarrollo. En producción debes usar credenciales reales.

---

## 🐳 PASO 4: LEVANTAR EL PROYECTO CON DOCKER

### 4.1 Comando único para levantar todo
```bash
docker-compose -f docker-compose.dev.yml up --build
```

### 4.2 ¿Qué hace este comando?
- 🗄️ **Descarga** imagen MongoDB
- 🔨 **Construye** imagen del servidor (GraphQL API)
- 🔨 **Construye** imagen del cliente (React)
- 🌐 **Crea** red interna para comunicación
- 📁 **Crea** volúmenes para persistencia de datos
- 🚀 **Inicia** todos los servicios

### 4.3 Tiempo esperado:
- **Primera vez**: 15-20 minutos
- **Siguientes veces**: 2-3 minutos (usa cache)

### 4.4 Progreso esperado:
```
1. Creating network "clon-amazon_ecuamazon-dev-network"
2. Building server... ✅ (1-2 min)
3. Building client... ⏳ (10-15 min - paso más lento)
4. Creating ecuamazon-mongodb-dev...
5. Creating ecuamazon-server-dev...
6. Creating ecuamazon-client-dev...
7. Attaching to containers...
```

---

## 🎯 PASO 5: VERIFICAR QUE TODO FUNCIONA

### 5.1 Verificar contenedores corriendo
```bash
# En otra terminal:
docker-compose -f docker-compose.dev.yml ps
```

**Estado esperado:**
```
Name                 Command             State               Ports
--------------------------------------------------------------------------------
ecuamazon-client-dev   npm start         Up                0.0.0.0:3000->3000/tcp
ecuamazon-mongodb-dev  mongod            Up                0.0.0.0:27017->27017/tcp
ecuamazon-server-dev   npm run dev       Up                0.0.0.0:4000->4000/tcp
```

### 5.2 Verificar logs (deben verse así):
```
✅ MongoDB: "waiting for connections on port 27017"
✅ Server: "Server running on http://localhost:4000"
✅ Client: "webpack compiled successfully"
```

### 5.3 Probar endpoints:

#### Cliente React (Frontend):
```bash
curl -I http://localhost:3000
# Debe responder: HTTP/1.1 200 OK
```
**Abrir en navegador**: http://localhost:3000

#### Servidor GraphQL (Backend):
```bash
curl -I http://localhost:4000/graphql
# Debe responder: HTTP/1.1 400 Bad Request (normal para GraphQL)
```
**GraphQL Playground**: http://localhost:4000/graphql

---

## 🛠️ COMANDOS ÚTILES PARA DESARROLLO

### Detener todo:
```bash
docker-compose -f docker-compose.dev.yml down
```

### Detener y eliminar volúmenes (datos):
```bash
docker-compose -f docker-compose.dev.yml down -v
```

### Ver logs de un servicio específico:
```bash
docker-compose -f docker-compose.dev.yml logs server
docker-compose -f docker-compose.dev.yml logs client
docker-compose -f docker-compose.dev.yml logs mongodb
```

### Reconstruir solo un servicio:
```bash
docker-compose -f docker-compose.dev.yml up --build client
```

---

## 🚨 SOLUCIÓN DE PROBLEMAS COMUNES

### ❌ Error: "port is already allocated"
```bash
# Verificar qué está usando el puerto
sudo netstat -tlnp | grep :3000
sudo netstat -tlnp | grep :4000

# Detener proceso o cambiar puerto en docker-compose.dev.yml
```

### ❌ Error: "network already exists"
```bash
# Limpiar redes Docker
docker network prune -f
```

### ❌ Error de permisos o cache
```bash
# Limpieza completa
docker-compose -f docker-compose.dev.yml down --remove-orphans -v
docker system prune -f
docker-compose -f docker-compose.dev.yml up --build
```

### ❌ Contenedor se reinicia constantemente
```bash
# Ver logs detallados
docker-compose -f docker-compose.dev.yml logs --follow [service-name]
```

---

## 🎯 VERIFICACIÓN FINAL - CHECKLIST

Marca cada punto cuando funcione:

- [ ] ✅ Docker y Docker Compose instalados
- [ ] ✅ Repositorio clonado
- [ ] ✅ Variables .env configuradas
- [ ] ✅ `docker-compose up --build` ejecutado sin errores
- [ ] ✅ 3 contenedores corriendo (client, server, mongodb)
- [ ] ✅ http://localhost:3000 carga la aplicación React
- [ ] ✅ http://localhost:4000/graphql carga GraphQL Playground
- [ ] ✅ Logs sin errores críticos

---

## 🎉 ¡LISTO!

**Si todos los puntos del checklist están ✅, el proyecto está funcionando correctamente.**

### Próximos pasos:
1. Explora la aplicación en http://localhost:3000
2. Revisa la API GraphQL en http://localhost:4000/graphql
3. Consulta la documentación del proyecto en `CLAUDE.md`

### Para desarrollo diario:
- **Iniciar**: `docker-compose -f docker-compose.dev.yml up`
- **Detener**: `Ctrl+C` o `docker-compose -f docker-compose.dev.yml down`

---

## 📞 ¿NECESITAS AYUDA?

Si tienes problemas:
1. Revisa la sección "Solución de problemas comunes"
2. Verifica los logs: `docker-compose -f docker-compose.dev.yml logs`
3. Consulta `DOCUMENTO_EXPERIENCIA_USUARIO_NUEVO.md` para troubleshooting avanzado