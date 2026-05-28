# Despliegue en Azure

Esta guia describe como desplegar Nexus IPN en Azure manteniendo la estructura actual del repositorio y el flujo de Docker Compose.

## Opcion recomendada: Azure VM con Docker Compose

Usa una maquina virtual Linux cuando quieras migrar desde Render sin reestructurar la aplicacion. Esta opcion conserva los tres servicios definidos en `docker-compose.yml`:

- `nginx`: sirve el frontend compilado y redirige `/api` al backend.
- `api`: ejecuta Express en Node.js sobre el puerto interno `4000`.
- `postgres`: ejecuta PostgreSQL con el volumen persistente `postgres_data`.

### 1. Crear recursos en Azure

Recursos sugeridos para una primera version:

- Resource group dedicado, por ejemplo `nexus-ipn-prod`.
- VM Ubuntu LTS x86-64. Un tamano `B2s` es un punto de partida razonable para baja carga.
- Disco administrado con espacio suficiente para PostgreSQL y respaldos.
- IP publica estatica si vas a usar dominio propio.
- Network Security Group con:
  - `22/tcp` restringido a tu IP.
  - `80/tcp` publico.
  - `443/tcp` publico si configuras TLS.

No expongas PostgreSQL a internet. En esta arquitectura PostgreSQL solo debe estar disponible dentro de la red Docker de la VM.

Ejemplo con Azure CLI:

```bash
az login

RESOURCE_GROUP=nexus-ipn-prod
LOCATION=eastus
VM_NAME=nexus-ipn-vm
ADMIN_USER=azureuser

az group create \
  --name "$RESOURCE_GROUP" \
  --location "$LOCATION"

az vm create \
  --resource-group "$RESOURCE_GROUP" \
  --name "$VM_NAME" \
  --image Ubuntu2204 \
  --size Standard_B2s \
  --admin-username "$ADMIN_USER" \
  --generate-ssh-keys \
  --public-ip-sku Standard

az vm open-port \
  --resource-group "$RESOURCE_GROUP" \
  --name "$VM_NAME" \
  --port 80

az vm open-port \
  --resource-group "$RESOURCE_GROUP" \
  --name "$VM_NAME" \
  --port 443
```

Despues de crear la VM, restringe SSH a tu IP desde el Network Security Group en el portal de Azure o con una regla especifica de `az network nsg rule create`.

### 2. Preparar la VM

Instala Docker Engine y el plugin de Compose en la VM. Despues, agrega tu usuario al grupo `docker` o ejecuta los comandos con privilegios administrativos.

Verifica la instalacion:

```bash
docker --version
docker compose version
```

Clona el repositorio en la VM y entra al directorio del proyecto:

```bash
git clone <repo-url> nexus-ipn
cd nexus-ipn
```

### 3. Configurar variables de entorno

Crea `.env.production` en la VM. No lo subas al repositorio.

Valores minimos:

```env
POSTGRES_DB=nexus_ipn
POSTGRES_USER=nexus_app
POSTGRES_PASSWORD=<password-largo>
JWT_SECRET=<secreto-largo>
FRONTEND_URL=https://<tu-dominio>
VITE_API_URL=/api
EMAIL_HOST=<smtp-host>
EMAIL_PORT=<smtp-port>
EMAIL_USER=<smtp-user>
EMAIL_PASSWORD=<smtp-password>
NGINX_PORT=80
```

Para Compose, deja que la API use el host interno `postgres`. No configures `DATABASE_URL` para este modo, salvo que decidas usar una base externa.

Si algun secreto contiene `$`, escribelo entre comillas simples en `.env.production` o escapa el signo como `$$`, porque Docker Compose interpola variables.

### 4. Levantar Nexus IPN

Construye y arranca los servicios:

```bash
docker compose --env-file .env.production up -d --build
```

Verifica que los contenedores esten activos:

```bash
docker compose --env-file .env.production ps
docker compose --env-file .env.production logs -f api nginx postgres
```

Si el dominio ya apunta a la IP publica, abre `FRONTEND_URL` y confirma que el login no marque errores de CORS.

### 5. Sembrar datos iniciales

Despues de confirmar que la API conecta con PostgreSQL, ejecuta:

```bash
docker compose --env-file .env.production run --rm api node dist/scripts/seedCatalog.js
```

Para cargar usuarios reales, usa una fuente privada no versionada como se describe en `docs/DEPLOYMENT_DOCKER.md`.

Evita ejecutar `seed:fresh` o `db:reset` contra produccion.

### 6. Configurar HTTPS

Para produccion, publica el sitio por HTTPS. Hay dos caminos compatibles con la estructura actual:

- Poner un proxy TLS en la VM, por ejemplo Caddy, Traefik o Nginx con Certbot, y reenviar al puerto local donde escucha el servicio `nginx`.
- Extender la configuracion del contenedor `nginx` para manejar certificados, manteniendo el proxy `/api` al servicio `api`.

Al activar HTTPS, actualiza:

```env
FRONTEND_URL=https://<tu-dominio>
```

Luego recrea los contenedores:

```bash
docker compose --env-file .env.production up -d --build
```

### 7. Actualizar despliegue

Para publicar cambios:

```bash
git pull
docker compose --env-file .env.production up -d --build
docker image prune -f
```

Antes de cambios sensibles, crea un respaldo de PostgreSQL:

```bash
docker compose --env-file .env.production exec postgres \
  pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > backup-nexus-ipn.sql
```

## Alternativa administrada: App Service + PostgreSQL Flexible Server

Usa esta opcion si prefieres reducir la administracion de la VM. Es mas administrada, pero ya no ejecuta el `docker-compose.yml` completo en Azure.

Arquitectura:

- Backend: Azure App Service for Linux con la imagen generada por `server/Dockerfile`.
- Base de datos: Azure Database for PostgreSQL Flexible Server.
- Frontend: Azure Static Web Apps, App Service estatico o Storage Static Website.
- Imagenes: Azure Container Registry.

Configuracion clave del backend en App Service:

```env
WEBSITES_PORT=4000
NODE_ENV=production
PORT=4000
JWT_SECRET=<secreto-largo>
FRONTEND_URL=https://<url-frontend>
DATABASE_URL=postgresql://<user>:<password>@<server>.postgres.database.azure.com:5432/<db>
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=false
EMAIL_HOST=<smtp-host>
EMAIL_PORT=<smtp-port>
EMAIL_USER=<smtp-user>
EMAIL_PASSWORD=<smtp-password>
```

Azure Database for PostgreSQL Flexible Server exige conexiones TLS de forma predeterminada. El backend ya soporta `DATABASE_SSL=true`, por lo que no requiere cambios de codigo para conectarse con TLS.

Al usar App Service, configura el contenedor como una sola imagen del backend y publica el frontend por separado con `VITE_API_URL` apuntando a la URL publica de la API.

## Notas de decision

- No se recomienda desplegar el `docker-compose.yml` completo en Azure App Service para una instalacion nueva. Microsoft esta moviendo esa ruta hacia sidecars y la caracteristica Docker Compose en App Service tiene retiro anunciado para el 31 de marzo de 2027.
- Si el objetivo es preservar exactamente el flujo actual y mover el sistema rapido desde Render, usa Azure VM + Docker Compose.
- Si mas adelante necesitas alta disponibilidad, respaldos gestionados y menos riesgo operativo, migra PostgreSQL a Azure Database for PostgreSQL Flexible Server y deja los contenedores solo para aplicacion.
