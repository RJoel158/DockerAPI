# DockerAPI - LG9 Práctica con Docker

Proyecto desarrollado para la práctica **LG9 - Práctica con Docker** (Universidad del Valle).
Consiste en una API REST construida con **Node.js (Express)** y persistencia en **PostgreSQL**, orquestada completamente mediante **Docker** y **Docker Compose**.

---

## Estructura del Proyecto

```text
docker-ejercicio/
├── api/
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── .env
├── .env.example
├── .gitignore
├── docker-compose.yml
├── GUIA_PRACTICA_DOCKER.md
└── README.md
```

---

## Variables de Entorno

El archivo `.env` contiene la configuración requerida:

```env
POSTGRES_USER=appuser
POSTGRES_PASSWORD=secret123
POSTGRES_DB=appdb
POSTGRES_PORT=5432
API_PORT=3000
POSTGRES_HOST=postgres
```

---

## Puesta en Marcha

### 1. Construir e Iniciar Contenedores
```bash
docker compose up --build
```
*(O en segundo plano con `docker compose up --build -d`)*

### 2. Comprobar Estado de Contenedores y Healthcheck
```bash
docker ps
```
Se observarán dos contenedores:
- `node_api`: Ejecutándose en el puerto `3000`.
- `postgres_db`: Ejecutándose en el puerto `5432` con estado `(healthy)`.

### 3. Consultar Logs
```bash
# Todos los logs
docker compose logs

# Logs de un servicio específico
docker compose logs api
docker compose logs postgres
```

---

## Endpoints de la API

| Método | Endpoint | Descripción | Ejemplo de Respuesta / Body |
|---|---|---|---|
| `GET` | `/health` | Comprueba estado de la API | `{"status": "ok"}` |
| `GET` | `/users` | Obtiene lista de usuarios desde PostgreSQL | `[{"id":1,"name":"Juan","email":"juan@example.com"}]` |
| `POST` | `/users` | Registra un nuevo usuario en PostgreSQL | Body: `{"name":"Juan","email":"juan@example.com"}` |

---

## 🧪 Pruebas de Persistencia de Datos

1. **Detener servicios manteniendo los datos:**
   ```bash
   docker compose down
   ```
   Al volver a iniciar con `docker compose up`, los usuarios registrados previamente se mantienen intactos en el volumen `postgres_data`.

2. **Eliminación completa de datos y volúmenes:**
   ```bash
   docker compose down -v
   ```
   Al volver a iniciar con `docker compose up`, la base de datos se recrea limpia sin los datos anteriores.