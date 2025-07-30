# Migración de H2 a MySQL - Instrucciones

## 🎯 Pasos para migrar de H2 a MySQL

### 1. **Instalar MySQL y phpMyAdmin**
- Instala XAMPP, WAMP, o MAMP que incluye MySQL y phpMyAdmin
- O instala MySQL Server por separado

### 2. **Ejecutar el script SQL**
1. Abre phpMyAdmin en tu navegador: `http://localhost/phpmyadmin`
2. Ve a la pestaña "SQL"
3. Copia y pega el contenido completo del archivo `database_mysql.sql`
4. Haz clic en "Continuar" para ejecutar el script

### 3. **Verificar la base de datos**
- Deberías ver la base de datos `cat_api_backend` creada
- La tabla `users` con 3 registros de prueba

### 4. **Configurar Spring Boot**

#### Opción A: Reemplazar application.properties
Reemplaza el contenido de `src/main/resources/application.properties` con el contenido de `application-mysql.properties`

#### Opción B: Usar perfiles (recomendado)
1. Mantén tu `application.properties` actual para desarrollo con H2
2. Crea `application-prod.properties` con la configuración de MySQL
3. Ejecuta con: `mvn spring-boot:run -Dspring.profiles.active=prod`

### 5. **Actualizar dependencias**
El `pom.xml` ya incluye el driver de MySQL. Si no lo tienes, agrega:
```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
</dependency>
```

### 6. **Configuración de MySQL recomendada**
```properties
# Cambia estas configuraciones según tu entorno:

# URL de la base de datos (ajusta puerto si es necesario)
spring.datasource.url=jdbc:mysql://localhost:3306/cat_api_backend

# Credenciales (ajusta según tu configuración)
spring.datasource.username=root
spring.datasource.password=tu_password

# Para XAMPP/WAMP el usuario por defecto es 'root' sin contraseña
```

### 7. **Ejecutar la aplicación**
```bash
mvn clean compile
mvn spring-boot:run
```

## 🔐 Usuarios de prueba creados

| Username | Email | Password | Rol |
|----------|-------|----------|-----|
| admin | admin@catapi.com | password | Administrador |
| testuser | test@example.com | password | Usuario |
| demo | demo@catapi.com | password | Demo |

## 🧪 Probar la conexión

### Verificar que la aplicación se conecta:
1. Ejecuta la aplicación
2. Verifica en los logs que dice "MySQL" en lugar de "H2"
3. Prueba el login con cualquiera de los usuarios:

```bash
curl -X POST http://localhost:8080/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password"
  }'
```

### Verificar en phpMyAdmin:
- Ve a la tabla `users` en phpMyAdmin
- Deberías ver los registros de los usuarios
- Cualquier nuevo usuario registrado aparecerá aquí

## ⚠️ Solución de problemas comunes

### Error: "Access denied for user"
- Verifica usuario y contraseña en `application.properties`
- En XAMPP por defecto: usuario=`root`, password=``(vacío)

### Error: "Unknown database"
- Ejecuta primero el script SQL en phpMyAdmin
- Verifica que la base de datos `cat_api_backend` existe

### Error: "Driver class not found"
- Ejecuta `mvn clean compile` para descargar dependencias
- Verifica que el driver MySQL está en el `pom.xml`

### Puerto MySQL diferente:
- Si MySQL usa puerto diferente a 3306, cambia la URL:
```properties
spring.datasource.url=jdbc:mysql://localhost:PUERTO/cat_api_backend
```

## 📊 Consultas útiles para phpMyAdmin

```sql
-- Ver todos los usuarios
SELECT id, username, email, first_name, last_name, created_at FROM users;

-- Contar usuarios
SELECT COUNT(*) as total FROM users;

-- Buscar por username
SELECT * FROM users WHERE username = 'testuser';

-- Ver usuarios registrados hoy
SELECT * FROM users WHERE DATE(created_at) = CURDATE();
```
