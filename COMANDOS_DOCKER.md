# Comandos útiles para Docker Compose

Esta guía resume los comandos principales para ejecutar Nexus IPN con Docker Compose en una sola máquina. La configuración actual levanta tres servicios:

- `nginx`: sirve el frontend compilado y redirige `/api` hacia el backend.
- `api`: ejecuta el backend Express/Node.js.
- `postgres`: ejecuta PostgreSQL 16 con un volumen persistente.

Los ejemplos usan `.env.production` porque es el archivo esperado por `docker-compose.yml`. Si usas otro archivo, reemplaza `--env-file .env.production` por el que corresponda.

## 1. Preparar variables de entorno

Crea el archivo local a partir del ejemplo:

```bash
cp .env.production.example .env.production
```

Para probar en tu máquina local, ajusta como mínimo:

```env
NGINX_PORT=8080
VITE_API_URL=/api

POSTGRES_DB=nexus_ipn
POSTGRES_USER=nexus_app
POSTGRES_PASSWORD=una-password-local-larga

FRONTEND_URL=http://localhost:8080
JWT_SECRET=un-secreto-local-largo

DB_HOST=postgres
DB_PORT=5432
DATABASE_SSL=false
DATABASE_SSL_REJECT_UNAUTHORIZED=false
```

Para Docker Compose, evita dejar `DATABASE_URL` activo si apunta a `localhost`. Dentro del contenedor `api`, `localhost` es el propio contenedor, no PostgreSQL. La conexión correcta entre contenedores usa `DB_HOST=postgres`.

No subas `.env.production` al repositorio. El archivo puede contener secretos reales.

## 2. Validar la configuración

Antes de levantar servicios, valida que Compose pueda leer el archivo y resolver variables:

```bash
docker compose --env-file .env.production config
```

Este comando no levanta contenedores. Solo imprime la configuración final que Docker Compose usará. Es útil para detectar variables faltantes, errores de sintaxis o interpolación incorrecta de secretos.

Si una contraseña contiene `$`, escríbela entre comillas simples en `.env.production` o escapa cada `$` como `$$`.

## 3. Construir y levantar la aplicación

Construye imágenes y levanta los servicios en segundo plano:

```bash
docker compose --env-file .env.production up -d --build
```

Qué hace:

- Construye la imagen del backend desde `server/Dockerfile`.
- Construye la imagen del frontend desde `client/Dockerfile`.
- Levanta PostgreSQL con volumen persistente.
- Levanta la API cuando PostgreSQL ya está saludable.
- Levanta Nginx y expone el puerto definido por `NGINX_PORT`.

Si usaste `NGINX_PORT=8080`, abre:

```text
http://localhost:8080
```

## 4. Ver estado de los servicios

```bash
docker compose --env-file .env.production ps
```

Úsalo para confirmar que `postgres`, `api` y `nginx` estén en ejecución. Si algún servicio se reinicia o aparece detenido, revisa sus logs.

## 5. Ver logs

Ver todos los logs:

```bash
docker compose --env-file .env.production logs -f
```

Ver logs solo del backend:

```bash
docker compose --env-file .env.production logs -f api
```

Ver logs solo de Nginx:

```bash
docker compose --env-file .env.production logs -f nginx
```

Ver logs solo de PostgreSQL:

```bash
docker compose --env-file .env.production logs -f postgres
```

Quita `-f` si solo quieres imprimir logs recientes sin seguirlos en tiempo real.

## 6. Entrar a la base de datos con psql

```bash
docker compose --env-file .env.production exec postgres \
  psql -U nexus_app -d nexus_ipn
```

Si cambiaste `POSTGRES_USER` o `POSTGRES_DB`, usa esos valores.

Comandos útiles dentro de `psql`:

```sql
\dt
SELECT * FROM users LIMIT 10;
SELECT * FROM academies;
SELECT * FROM subjects LIMIT 10;
\q
```

La base de datos vive dentro del contenedor `postgres`, pero los datos se guardan en el volumen Docker `postgres_data`.

## 7. Ver el volumen de PostgreSQL

Listar volúmenes:

```bash
docker volume ls
```

Inspeccionar el volumen del proyecto:

```bash
docker volume inspect nexus-ipn_postgres_data
```

No edites directamente los archivos internos del volumen. Para consultar o modificar datos usa `psql`, scripts o un cliente PostgreSQL.

## 8. Ejecutar scripts compilados

Los scripts deben ejecutarse dentro del contenedor `api`, porque ahí existe el código compilado en `dist` y la red interna hacia PostgreSQL.

Listar scripts disponibles:

```bash
docker compose --env-file .env.production run --rm api ls dist/scripts
```

Sembrar catálogos:

```bash
docker compose --env-file .env.production run --rm \
  api node dist/scripts/seedCatalog.js
```

Este script carga catálogos base como planes de estudio, academias y materias. Ejecútalo antes de cargar usuarios reales, porque los usuarios dependen de academias y materias.

## 9. Cargar usuarios reales o privados

Opción recomendada: pasar el archivo privado codificado en Base64 sin copiarlo al contenedor.

```bash
docker compose --env-file .env.production run --rm \
  -e SEED_USERS_JSON_BASE64="$(base64 -w 0 /ruta/privada/users.seed.json)" \
  api node dist/scripts/seedPrivateUsers.js
```

Qué hace:

- Lee usuarios desde `SEED_USERS_JSON_BASE64`.
- Crea o actualiza usuarios por correo.
- Hashea contraseñas antes de guardar.
- Marca las contraseñas como temporales para forzar el cambio inicial.
- Asigna materias configuradas en `subjectCodes`.

Si ya configuraste `SEED_USERS_JSON_BASE64` o `SEED_USERS_JSON` dentro de `.env.production`, puedes ejecutar:

```bash
docker compose --env-file .env.production run --rm \
  api node dist/scripts/seedPrivateUsers.js
```

No guardes archivos con usuarios reales dentro del repositorio público.

## 10. Ejecutar comandos dentro de contenedores

Abrir una shell en el backend:

```bash
docker compose --env-file .env.production exec api sh
```

Abrir una shell en PostgreSQL:

```bash
docker compose --env-file .env.production exec postgres sh
```

Abrir una shell en Nginx:

```bash
docker compose --env-file .env.production exec nginx sh
```

Esto sirve para inspeccionar archivos, variables de entorno o conectividad interna.

## 11. Reiniciar servicios

Reiniciar solo la API:

```bash
docker compose --env-file .env.production restart api
```

Reiniciar Nginx:

```bash
docker compose --env-file .env.production restart nginx
```

Reiniciar todos los servicios:

```bash
docker compose --env-file .env.production restart
```

## 12. Detener servicios sin borrar datos

```bash
docker compose --env-file .env.production down
```

Esto detiene y elimina contenedores y red, pero conserva el volumen de PostgreSQL. Al levantar de nuevo, los datos siguen ahí.

## 13. Borrar todo el entorno local

Advertencia: este comando elimina también el volumen de PostgreSQL y borra la base local.

```bash
docker compose --env-file .env.production down -v
```

Úsalo solo en desarrollo local cuando quieras empezar desde cero. No lo ejecutes en producción si ya tienes datos reales.

## 14. Actualizar despliegue

En servidor remoto, un flujo típico sería:

```bash
git pull
docker compose --env-file .env.production up -d --build
docker image prune -f
```

Qué hace:

- `git pull`: trae cambios recientes.
- `up -d --build`: reconstruye imágenes y recrea contenedores si cambió el código.
- `docker image prune -f`: elimina imágenes antiguas sin uso para liberar espacio.

Antes de actualizar producción, genera un respaldo de base de datos.

## 15. Respaldar base de datos

```bash
docker compose --env-file .env.production exec postgres \
  pg_dump -U nexus_app nexus_ipn > backup-nexus-ipn.sql
```

Si cambiaste usuario o base, reemplaza `nexus_app` y `nexus_ipn`.

También puedes usar variables del entorno de tu shell:

```bash
docker compose --env-file .env.production exec postgres \
  pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > backup-nexus-ipn.sql
```

Para este segundo ejemplo, `POSTGRES_USER` y `POSTGRES_DB` deben existir en tu shell local.

## 16. Restaurar respaldo

En una base vacía:

```bash
docker compose --env-file .env.production exec -T postgres \
  psql -U nexus_app -d nexus_ipn < backup-nexus-ipn.sql
```

Advertencia: restaurar sobre una base con datos existentes puede duplicar registros o fallar por llaves únicas. Para restauraciones reales, valida primero el estado de la base.

## 17. Probar conectividad interna

Desde el contenedor `api`, puedes verificar variables y resolución DNS:

```bash
docker compose --env-file .env.production run --rm api sh -lc 'env | sort | grep -E "POSTGRES|DB_HOST|DATABASE|NODE_ENV|PORT"'
```

Comprobar que el host `postgres` se resuelve dentro de la red Docker:

```bash
docker compose --env-file .env.production run --rm api sh -lc 'getent hosts postgres'
```

## 18. Probar endpoints básicos

Desde tu máquina:

```bash
curl -i http://localhost:8080
curl -i http://localhost:8080/api/academies
```

Si usas `NGINX_PORT=80`, cambia `localhost:8080` por `localhost`.

El primer comando valida que Nginx sirve el frontend. El segundo valida que Nginx redirige `/api` hacia el backend.

## 19. Exponer PostgreSQL para cliente gráfico local

Solo para desarrollo local, puedes exponer PostgreSQL agregando esto al servicio `postgres` en `docker-compose.yml`:

```yaml
ports:
  - "5432:5432"
```

Después:

```bash
docker compose --env-file .env.production up -d
```

Conecta DBeaver, TablePlus o pgAdmin con:

```text
Host: localhost
Port: 5432
Database: nexus_ipn
User: nexus_app
Password: valor de POSTGRES_PASSWORD
```

No expongas PostgreSQL públicamente en producción. En servidor remoto usa `docker compose exec postgres psql` o un túnel SSH.

## 20. Comandos que debes evitar en producción

Evita ejecutar scripts destructivos contra datos reales:

```bash
docker compose --env-file .env.production run --rm api node dist/scripts/resetDatabase.js
docker compose --env-file .env.production run --rm api pnpm seed:fresh
docker compose --env-file .env.production down -v
```

Motivo:

- `resetDatabase` borra y recrea tablas.
- `seed:fresh` suele resetear y sembrar datos de prueba.
- `down -v` elimina el volumen persistente de PostgreSQL.

Si necesitas una operación destructiva, primero genera respaldo y confirma que estás en el entorno correcto.
