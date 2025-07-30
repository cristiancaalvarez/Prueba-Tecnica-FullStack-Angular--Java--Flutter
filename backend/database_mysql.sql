-- ====================================
-- Script SQL para crear la base de datos en MySQL/phpMyAdmin
-- Prueba Técnica Backend - Cat API
-- Fecha: 30 de Julio 2025
-- ====================================

-- Eliminar base de datos si existe (opcional - descomenta si quieres empezar desde cero)
-- DROP DATABASE IF EXISTS cat_api_backend;

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS cat_api_backend 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos
USE cat_api_backend;

-- Mostrar que base de datos estamos usando
SELECT DATABASE() as 'Base de datos actual';

-- Tabla de usuarios
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Verificar que la tabla se creo correctamente
DESCRIBE users;

-- Insertar datos de prueba
-- Nota: Contraseña hasheada con BCrypt para "password"
INSERT INTO users (username, email, password, first_name, last_name) VALUES
('admin', 'admin@catapi.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrador', 'Sistema'),
('testuser', 'test@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Usuario', 'Prueba'),
('demo', 'demo@catapi.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Demo', 'User');

-- Verificar los datos insertados
SELECT 'Usuarios creados:' as 'Resultado';
SELECT id, username, email, first_name, last_name, created_at FROM users;

-- Estadísticas
SELECT COUNT(*) as 'Total de usuarios' FROM users;

-- ====================================
-- CONSULTAS ÚTILES PARA VERIFICACIÓN
-- ====================================

-- 1. Buscar usuario por username (para login)
-- SELECT id, username, email, first_name, last_name FROM users WHERE username = 'testuser';

-- 2. Buscar usuario por email (para registro)
-- SELECT id, username, email FROM users WHERE email = 'test@example.com';

-- 3. Listar todos los usuarios sin contraseñas
-- SELECT id, username, email, first_name, last_name, created_at FROM users ORDER BY created_at DESC;

-- 4. Verificar usuarios creados hoy
-- SELECT id, username, email, created_at FROM users WHERE DATE(created_at) = CURDATE();

-- ====================================
-- INFORMACIÓN IMPORTANTE
-- ====================================
SELECT '=== INFORMACIÓN IMPORTANTE ===' as 'INFO';
SELECT 'Base de datos: cat_api_backend' as 'INFO';
SELECT 'Tabla: users' as 'INFO';
SELECT 'Usuarios de prueba: admin, testuser, demo' as 'INFO';
SELECT 'Contraseña para todos: password' as 'INFO';
SELECT 'Listo para conectar con Spring Boot' as 'INFO';
