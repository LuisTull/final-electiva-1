# Documentacion del Pipeline CI/CD

## Objetivo

Automatizar validacion, construccion y despliegue de la aplicacion mediante GitHub Actions.

## Flujo general

1. Developer hace push o pull request.
2. Workflow CI valida calidad y funcionalidad.
3. Si CI en `main` es exitoso, se ejecuta CD.
4. CD realiza despliegue remoto con Docker Compose.

## CI: `.github/workflows/ci.yml`

Triggers:

- push a `main` y `develop`
- pull request a `main`

Etapas:

1. Checkout del codigo
2. Setup de Node 20
3. Instalacion de dependencias
4. Analisis estatico (`npm run lint`)
5. Pruebas automatizadas (`npm test`)
6. Build de imagen Docker

## CD: `.github/workflows/cd.yml`

Trigger:

- `workflow_run` de CI en rama `main` cuando el resultado sea exitoso

Etapas:

1. Checkout
2. Build imagen release
3. Conexion SSH al servidor
4. `git pull`
5. Reinicio de stack (`docker compose down && up -d --build`)

## Estrategia de ramas recomendada

- `main`: produccion
- `develop`: integracion continua
- feature branches: trabajo por tarea (`feature/<nombre>`)

## Calidad y seguridad minima

- Ejecutar tests y lint en cada PR
- Revisiones de codigo obligatorias en GitHub
- Secrets solo en GitHub Secrets (nunca en codigo)

## Mejores practicas futuras

- agregar build/push de imagen a GHCR
- usar entornos protegidos (`environments`) en GitHub
- agregar escaneo de vulnerabilidades (`npm audit`, `trivy`)
- implementar despliegue blue/green o canary
