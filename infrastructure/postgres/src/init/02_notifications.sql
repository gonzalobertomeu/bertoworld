-- Crear el rol solo si no existe
DO
$$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'notifications_service') THEN
      CREATE ROLE notifications_service LOGIN PASSWORD 'UYCpoTNACmNXcYHeREBb/hZP7DZ2pTe1fKtgwSwgcm0=';
   END IF;
END
$$;

-- Crear la base de datos solo si no existe
-- (CREATE DATABASE no puede ejecutarse dentro de un bloque DO/transacción,
--  por eso se genera y ejecuta condicionalmente con \gexec)
SELECT 'CREATE DATABASE notifications OWNER notifications_service'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'notifications')\gexec
