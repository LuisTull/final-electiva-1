# Manual de Operaciones

## Operacion diaria

### Levantar stack

- `docker compose up -d --build`

### Detener stack

- `docker compose down`

### Ver estado de contenedores

- `docker compose ps`

### Ver logs

- Aplicacion: `docker compose logs -f app`
- Prometheus: `docker compose logs -f prometheus`
- Alertmanager: `docker compose logs -f alertmanager`

## Verificaciones operativas

- Salud de API: `sh scripts/local-healthcheck.sh`
- Smoke test: `sh scripts/smoke-test.sh`
- Metricas activas: abrir `http://localhost:9090`

## Respuesta a incidentes simples

1. Alerta `AppDown`
   - revisar estado del contenedor app
   - revisar logs app
   - reiniciar servicio: `docker compose restart app`
2. Alerta `HighErrorRate`
   - validar endpoint con errores
   - revisar cambios recientes
   - rollback con commit anterior estable

## Backups basicos de SQLite

- copiar volumen de datos o archivo `data/app.db`
- ejemplo manual:
  - `docker compose exec app cp /usr/src/app/data/app.db /usr/src/app/data/app-backup.db`

## Mantenimiento

- actualizar imagenes base mensualmente
- revisar dependencias Node periodicamente
- validar alertas y umbrales cada sprint
