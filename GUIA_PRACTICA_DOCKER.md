# 📋 Guía Paso a Paso: LG9 - Práctica con Docker (Univalle)

Esta guía desglosa la práctica en **fases progresivas**, explicando el **porqué** de cada configuración y recordando los puntos clave donde deberás tomar capturas de pantalla para tu informe final.

---

## 📌 Requisitos Clave del Laboratorio
1. **Estructura estricta**:
   ```text
   DockerAPI/ (o docker-ejercicio/)
   ├── api/
   │   ├── package.json
   │   ├── server.js
   │   └── Dockerfile
   ├── .env
   ├── .gitignore
   └── docker-compose.yml
   ```
2. **Servicios**:
   - `postgres`: Imagen oficial de PostgreSQL, volumen persistente, healthcheck con `pg_isready`.
   - `api`: Node.js + Express, conexión a PostgreSQL mediante el host `postgres` (¡nunca `localhost`!), reinicio automático, depende de `postgres` (esperando a que esté `healthy`).
3. **Endpoints requeridos**:
   - `GET /health` -> `{"status": "ok"}`
   - `GET /users` -> Consulta y retorna usuarios en JSON.
   - `POST /users` -> Recibe `{ "name": "...", "email": "..." }` y guarda en PostgreSQL.
4. **Condición para el informe**:
   - Cada captura debe mostrar la **hora del sistema operativo**.
   - Cada punto requerido debe estar identificado/resaltado en amarillo en tu informe.

---

## 🗺️ Mapa de Fases de Aprendizaje

- [ ] **Fase 1: Variables de Entorno y Configuración Base (`.env`)**
  - Definición de credenciales de PostgreSQL y puertos.
  - Asegurar que `.env` esté en `.gitignore` para buenas prácticas.
- [ ] **Fase 2: Desarrollo de la API Node.js + Express (`api/`)**
  - Inicializar `package.json` con dependencias: `express`, `pg`, `dotenv`.
  - Crear `server.js` con:
    - Conexión a PostgreSQL vía pool (`pg`).
    - Auto-creación de la tabla `users` (id autoincremental, name, email).
    - Endpoints: `/health`, `GET /users`, `POST /users`.
- [ ] **Fase 3: Contenerización de la API (`api/Dockerfile`)**
  - Uso de imagen oficial ligera (`node:18-alpine` o `node:20-alpine`).
  - Cache de capas (`COPY package*.json` antes de `npm install`).
  - Exposición de puerto y comando de arranque.
- [ ] **Fase 4: Orquestación con Docker Compose (`docker-compose.yml`)**
  - Configuración del servicio `postgres` (imagen, variables, volumen con nombre).
  - Configuración del **Healthcheck** para PostgreSQL (`pg_isready`).
  - Configuración del servicio `api` (`build`, `depends_on` con condición `service_healthy`, `restart: on-failure`).
  - Red Docker para que se comuniquen por nombre de host.
- [ ] **Fase 5: Pruebas, Verificación y Captura de Evidencias**
  - `docker compose up --build`
  - `docker ps` (verificar ambos contenedores y estado healthy)
  - `docker compose logs` y logs por servicio
  - Pruebas HTTP: `/health`, `POST /users`, `GET /users`
  - Prueba de Persistencia 1: `docker compose down` -> `docker compose up` -> `GET /users` (los datos siguen)
  - Prueba de Persistencia 2: `docker compose down -v` -> `docker compose up` -> `GET /users` (los datos se borran)
- [ ] **Fase 6: Preparación de Entrega (GitHub y Reporte)**
  - Repositorio público con acceso a `efrainf.luna@gmail.com`.
  - Documento informe con portada, evidencias resaltadas en amarillo y hora del sistema visible.
