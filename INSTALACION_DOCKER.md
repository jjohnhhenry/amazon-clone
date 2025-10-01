# 🐳 Guía de Instalación con Docker - Multi-Plataforma

Esta guía te permitirá levantar el proyecto **EcuAmazon** en cualquier sistema operativo usando Docker.

## ✅ Compatibilidad

Este proyecto funciona en:
- ✅ **Windows 10/11** (con Docker Desktop)
- ✅ **macOS** (Intel y Apple Silicon M1/M2/M3)
- ✅ **Linux** (Ubuntu, Debian, Fedora, Arch, etc.)

---

## 📋 Prerrequisitos

### 1️⃣ Instalar Docker

#### 🪟 Windows
1. Descargar [Docker Desktop para Windows](https://www.docker.com/products/docker-desktop/)
2. Ejecutar el instalador
3. Reiniciar el sistema
4. Verificar instalación:
```powershell
docker --version
docker-compose --version
```

#### 🍎 macOS
1. Descargar [Docker Desktop para Mac](https://www.docker.com/products/docker-desktop/)
2. Arrastrar Docker.app a Aplicaciones
3. Abrir Docker desde Aplicaciones
4. Verificar instalación:
```bash
docker --version
docker-compose --version
```

#### 🐧 Linux (Ubuntu/Debian)
```bash
# Actualizar paquetes
sudo apt update

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Agregar usuario al grupo docker (no requiere sudo)
sudo usermod -aG docker $USER
newgrp docker

# Instalar Docker Compose
sudo apt install docker-compose

# Verificar instalación
docker --version
docker-compose --version
```

---

## 🚀 Instalación del Proyecto

### Paso 1: Clonar el repositorio

**Windows (PowerShell/CMD):**
```powershell
cd C:\Users\TuUsuario\Documents
git clone https://github.com/jjohnhhenry/amazon-clone.git
cd amazon-clone
```

**macOS/Linux (Terminal):**
```bash
cd ~/Documents
git clone https://github.com/jjohnhhenry/amazon-clone.git
cd amazon-clone
```

### Paso 2: Configurar variables de entorno (Opcional)

El proyecto viene con valores por defecto para desarrollo. Si quieres usar AWS S3:

**Windows:**
```powershell
copy .env.example .env
notepad .env
```

**macOS/Linux:**
```bash
cp .env.example .env
nano .env  # o vim .env
```

Edita las credenciales AWS si las tienes:
```env
AWS_ID=tu_aws_access_key
AWS_SECRET=tu_aws_secret_key
AWS_BUCKET_NAME=tu_bucket_s3
```

### Paso 3: Levantar el proyecto

**En todos los sistemas operativos (mismo comando):**

```bash
docker-compose -f docker-compose.dev.yml up --build
```

O en segundo plano (detached):
```bash
docker-compose -f docker-compose.dev.yml up --build -d
```

---

## 🌐 Acceder a la aplicación

Una vez levantado, abre tu navegador en:

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **Frontend** | http://localhost:3000 | Aplicación React |
| **Backend** | http://localhost:4000/graphql | API GraphQL |
| **API Info** | http://localhost:4000/api/info | Información del servidor |
| **MongoDB** | localhost:27017 | Base de datos (admin/password123) |

---

## 🛠️ Comandos Útiles

### Ver logs en tiempo real
```bash
docker-compose -f docker-compose.dev.yml logs -f
```

### Ver logs de un servicio específico
```bash
docker-compose -f docker-compose.dev.yml logs -f client
docker-compose -f docker-compose.dev.yml logs -f server
docker-compose -f docker-compose.dev.yml logs -f mongodb
```

### Ver estado de los servicios
```bash
docker-compose -f docker-compose.dev.yml ps
```

### Reiniciar servicios
```bash
docker-compose -f docker-compose.dev.yml restart
```

### Detener servicios
```bash
docker-compose -f docker-compose.dev.yml stop
```

### Detener y eliminar contenedores
```bash
docker-compose -f docker-compose.dev.yml down
```

### Limpiar todo (incluye volúmenes - borra BD)
```bash
docker-compose -f docker-compose.dev.yml down -v
```

### Reconstruir desde cero
```bash
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml build --no-cache
docker-compose -f docker-compose.dev.yml up
```

---

## 🐛 Solución de Problemas

### ❌ Error: "Port 3000 is already allocated"
**Causa:** Otro proceso está usando el puerto 3000.

**Solución Windows:**
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

**Solución macOS/Linux:**
```bash
lsof -i :3000
kill -9 <PID>
```

### ❌ Error: "Cannot connect to Docker daemon"
**Solución:**
- **Windows/Mac:** Asegúrate de que Docker Desktop está corriendo
- **Linux:** Ejecuta `sudo systemctl start docker`

### ❌ Error: "permission denied" (Linux)
```bash
sudo usermod -aG docker $USER
newgrp docker
# Cierra y vuelve a abrir la terminal
```

### ❌ Contenedores lentos en Windows/Mac
En Docker Desktop:
1. Ir a Settings → Resources
2. Aumentar CPU a 4 cores
3. Aumentar RAM a 4GB+
4. Aplicar y reiniciar

---

## 📊 Verificar que todo funciona

### 1. Verificar contenedores corriendo
```bash
docker ps
```
Deberías ver 3 contenedores:
- `ecuamazon-client-dev`
- `ecuamazon-server-dev`
- `ecuamazon-mongodb-dev`

### 2. Probar el backend
```bash
curl http://localhost:4000/api/info
```

### 3. Probar GraphQL
```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __typename }"}'
```

### 4. Abrir el frontend
Navega a http://localhost:3000 en tu navegador

---

## 🎯 Diferencias por Sistema Operativo

### Rutas de archivos

**Windows (PowerShell):**
```powershell
cd C:\Users\TuUsuario\proyecto
```

**macOS/Linux:**
```bash
cd ~/proyecto
```

### Variables de entorno en Docker Compose

El archivo `docker-compose.dev.yml` usa sintaxis estándar que funciona en todos los SO:
```yaml
volumes:
  - ./cliente:/app        # Funciona en Windows, Mac y Linux
  - /app/node_modules     # Named volume (multiplataforma)
```

### Permisos de archivos

- **Windows/Mac:** No hay problemas de permisos
- **Linux:** Los archivos creados por Docker pertenecen a root. Si tienes problemas:
```bash
sudo chown -R $USER:$USER .
```

---

## 💡 Notas Importantes

### Hot Reload
✅ Los cambios en el código se reflejan automáticamente en todos los SO.

### Persistencia de datos
✅ MongoDB usa un volume Docker que persiste entre reinicios.

### Performance
- **Linux:** Mejor performance (Docker nativo)
- **Mac:** Buena performance (Docker VM optimizada)
- **Windows:** Usa WSL2 para mejor rendimiento

### WSL2 en Windows (Recomendado)
Si usas Windows, Docker Desktop con WSL2 es más rápido:
1. Docker Desktop → Settings → General
2. Activar "Use WSL 2 based engine"

---

## ✅ Checklist Final

- [ ] Docker y Docker Compose instalados
- [ ] Repositorio clonado
- [ ] Puerto 3000 libre
- [ ] Puerto 4000 libre
- [ ] Puerto 27017 libre
- [ ] Ejecutar `docker-compose -f docker-compose.dev.yml up --build`
- [ ] Esperar que compile (puede tomar 2-5 minutos la primera vez)
- [ ] Abrir http://localhost:3000

---

## 🤝 Soporte

Si tienes problemas:
1. Revisa los logs: `docker-compose -f docker-compose.dev.yml logs`
2. Verifica que los puertos estén libres
3. Asegúrate de tener Docker actualizado
4. Reporta issues en: https://github.com/jjohnhhenry/amazon-clone/issues

---

**¡Listo! Tu aplicación debería estar corriendo en cualquier sistema operativo.** 🎉
