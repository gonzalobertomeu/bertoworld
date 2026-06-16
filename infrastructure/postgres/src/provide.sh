#!/bin/bash

set -euo pipefail

SQL_DIR="${1:-./init}"
DB_HOST="${DB_HOST:-database}"
DB_PORT="${DB_PORT:-5432}"
DB_NAME="${DB_NAME:-postgres}"
DB_USER="${DB_USER:-postgres}"
DB_PASS="${DB_PASS:-postgres}"

if [[ ! -d "$SQL_DIR" ]]; then
  echo "Error: directorio '$SQL_DIR' no existe"
  exit 1
fi

mapfile -t sql_files < <(find "$SQL_DIR" -maxdepth 1 -name "*.sql" | sort)

if [[ ${#sql_files[@]} -eq 0 ]]; then
  echo "No se encontraron archivos .sql en '$SQL_DIR'"
  exit 0
fi

echo "Encontrados ${#sql_files[@]} archivos SQL en '$SQL_DIR'"
echo "---"

for file in "${sql_files[@]}"; do
  echo "Ejecutando: $(basename "$file")..."

  PGPASSWORD="${DB_PASSWORD:-}" psql \
    -h "$DB_HOST" \
    -p "$DB_PORT" \
    -U "$DB_USER" \
    -d "$DB_NAME" \
    -f "$file" \
    -v ON_ERROR_STOP=1

  echo "✓ $(basename "$file") OK"
done

echo "---"
echo "Todos los archivos ejecutados correctamente"
