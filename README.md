# Proyecto DevOps Completo - Aplicacion Web Simple

Este repositorio implementa un pipeline DevOps de extremo a extremo para una aplicacion web simple con:

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + Express
- Base de datos: SQLite
- CI/CD: GitHub Actions
- Contenedores: Docker + Docker Compose
- Pruebas: unitarias e integracion
- Monitoreo: Prometheus, Loki, Promtail, Alertmanager

## 1. Arquitectura

- `public/`: interfaz web.
- `src/`: API, logica de negocio y persistencia.
- `tests/`: pruebas unitarias e integracion.
- `.github/workflows/`: CI y CD.
- `monitoring/`: configuracion de Prometheus, alertas y logs.
- `scripts/`: tareas operativas y smoke tests.

## 2. Ejecucion local sin Docker

Requisitos:

- Node.js 20+
- npm 10+

Pasos:

1. Instalar dependencias:
   - `npm install`
2. Ejecutar aplicacion:
   - `npm start`
3. Abrir navegador en:
   - `http://localhost:3000`

## 3. Ejecucion con Docker Compose

1. Construir y levantar servicios:
   - `docker compose up -d --build`
2. Verificar aplicacion:
   - `http://localhost:3000`
3. Verificar metricas:
   - `http://localhost:3000/metrics`
4. Ver Prometheus:
   - `http://localhost:9090`
5. Ver Alertmanager:
   - `http://localhost:9093`
6. Ver logs en Loki (API):
   - `http://localhost:3100/ready`

## 4. Pruebas y calidad

- Lint:
  - `npm run lint`
- Tests completos:
  - `npm test`
- Tests unitarios:
  - `npm run test:unit`
- Tests integracion:
  - `npm run test:integration`
- Smoke test:
  - `sh scripts/smoke-test.sh`

## 5. CI/CD

- CI (`.github/workflows/ci.yml`):
  - checkout
  - install
  - lint
  - tests
  - docker build
- CD (`.github/workflows/cd.yml`):
  - dispara despues de CI exitoso en `main`
  - despliegue remoto via SSH + `docker compose up -d --build`

Secrets requeridos para CD:

- `DEPLOY_HOST`
- `DEPLOY_USER`
- `DEPLOY_KEY`

## 6. Monitoreo

- Metricas basicas con `prom-client`:
  - `http_requests_total`
  - metricas por defecto de Node.js
- Alertas simples:
  - `AppDown`: servicio caido por 1 minuto
  - `HighErrorRate`: tasa de errores 5xx alta
- Logs centralizados:
  - Promtail toma logs de contenedores Docker
  - Loki almacena y expone logs