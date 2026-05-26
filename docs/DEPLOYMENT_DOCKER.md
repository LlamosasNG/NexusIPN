# Despliegue con Docker Compose y Nginx

Esta configuración despliega Nexus IPN con dos contenedores:

- `nginx`: sirve el frontend compilado y redirige `/api` al backend.
- `api`: ejecuta Express sobre Node.js.
- `postgres`: ejecuta PostgreSQL local en la misma máquina con volumen persistente.

Todos los servicios quedan en una red interna de Docker. Solo Nginx expone un puerto público.

## 1. Preparar variables de entorno

Copia el archivo de ejemplo y completa los valores reales fuera del repositorio público:

```bash
cp .env.production.example .env.production
```

Valores mínimos:

- `POSTGRES_DB`: nombre de la base de datos.
- `POSTGRES_USER`: usuario de aplicación para PostgreSQL.
- `POSTGRES_PASSWORD`: contraseña larga para PostgreSQL.
- `JWT_SECRET`: secreto largo y aleatorio.
- `FRONTEND_URL`: URL pública donde responderá Nginx, por ejemplo `https://nexus.example.com`.
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD`: credenciales SMTP.

No subas `.env.production` al repositorio.

En Compose, la API se conecta a PostgreSQL con el host interno `postgres` usando `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `DB_HOST` y `DB_PORT`. No uses `localhost` como host de BD dentro de contenedores, porque apuntaría al propio contenedor de la API.

Si una contraseña o secreto contiene `$`, escríbelo entre comillas simples en `.env.production`, por ejemplo `POSTGRES_PASSWORD='abc$123'`, o escapa cada signo como `$$`. Si no lo haces, Docker Compose intentará interpretar lo que sigue al `$` como otra variable.

Para el despliegue con Compose no configures `DATABASE_URL` en `.env.production`; la API construye la conexión con `POSTGRES_*`, `DB_HOST` y `DB_PORT`. Si dejas `DATABASE_URL` con caracteres especiales, Compose puede mostrar advertencias o interpolar partes del valor durante la validación.

## 2. Construir y levantar servicios

```bash
docker compose --env-file .env.production up -d --build
```

Por defecto Nginx expone el puerto `80`. Para cambiarlo, ajusta `NGINX_PORT` en `.env.production`.

Si quieres usar otro nombre de archivo para las variables, ejecuta Compose con `APP_ENV_FILE`:

```bash
APP_ENV_FILE=.env.staging docker compose --env-file .env.staging up -d --build
```

## 3. Sembrar catálogos

Después de levantar los servicios y verificar que la API se conecta a PostgreSQL:

```bash
docker compose --env-file .env.production run --rm api node dist/scripts/seedCatalog.js
```

Evita ejecutar scripts destructivos como `seed:fresh` o `db:reset` contra producción.

## 4. Cargar usuarios reales de forma privada

Para pilotos con usuarios reales, usa una fuente privada no versionada:

```bash
SEED_USERS_JSON_BASE64="$(base64 -w 0 users.seed.json)" \
docker compose --env-file .env.production run --rm api node dist/scripts/seedPrivateUsers.js
```

También puedes configurar `SEED_USERS_JSON_BASE64` directamente en `.env.production` o en el gestor de secretos del servidor.

El formato esperado es:

```json
{
  "users": [
    {
      "name": "Docente Demo",
      "email": "docente.demo@ipn.mx",
      "password": "contraseña-temporal-larga",
      "academyId": 1,
      "role": "Docente",
      "confirmed": true,
      "subjectCodes": ["M-101"]
    }
  ]
}
```

El backend hashea las contraseñas antes de guardarlas. Aun así, no publiques archivos con usuarios reales ni contraseñas temporales.

## 5. Actualizar despliegue

```bash
git pull
docker compose --env-file .env.production up -d --build
docker image prune -f
```

## 6. Respaldos de base de datos

Antes de actualizar o manipular datos reales, genera un respaldo:

```bash
docker compose --env-file .env.production exec postgres \
  pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > backup-nexus-ipn.sql
```

Para restaurar un respaldo en una instalación vacía:

```bash
docker compose --env-file .env.production exec -T postgres \
  psql -U "$POSTGRES_USER" "$POSTGRES_DB" < backup-nexus-ipn.sql
```

## 7. Verificación básica

- Abre la URL pública configurada en `FRONTEND_URL`.
- Confirma que el login responde sin errores CORS.
- Revisa logs con:

```bash
docker compose logs -f api
docker compose logs -f nginx
docker compose logs -f postgres
```
