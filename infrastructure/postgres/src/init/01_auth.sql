-- Crear el rol solo si no existe
DO
$$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'auth_service') THEN
      CREATE ROLE auth_service LOGIN PASSWORD 'jdHG6f09YXAP/0r1FWOUY71yacB3jDXubZ7EHsl9ewQ=';
   END IF;
END
$$;

-- Crear la base de datos solo si no existe
-- (CREATE DATABASE no puede ejecutarse dentro de un bloque DO/transacción,
--  por eso se genera y ejecuta condicionalmente con \gexec)
SELECT 'CREATE DATABASE auth OWNER auth_service'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'auth')\gexec
