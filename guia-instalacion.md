# Guia de Instalacion

## Requisitos

- Git
- Opcion A: Node.js 20+ y npm 10+
- Opcion B: Docker Engine + Docker Compose

## Instalacion desde GitHub

1. Clonar repositorio:
   - `git clone <URL_DEL_REPOSITORIO>`
2. Entrar al proyecto:
   - `cd devops-web-pipeline`

## Instalacion Opcion A (Node.js)

1. `npm install`
2. `npm start`
3. Abrir `http://localhost:3000`

## Instalacion Opcion B (Docker)

1. `docker compose up -d --build`
2. Abrir `http://localhost:3000`

## Verificacion

- Salud API: `curl http://localhost:3000/api/health`
- Items: `curl http://localhost:3000/api/items`
- Metricas: `curl http://localhost:3000/metrics`

## Solucion de problemas

- Puerto en uso:
  - cambiar mapeo en `docker-compose.yml`
- Permisos de Docker:
  - ejecutar con usuario autorizado o configurar grupo docker
- CD no despliega:
  - revisar secrets (`DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_KEY`)
