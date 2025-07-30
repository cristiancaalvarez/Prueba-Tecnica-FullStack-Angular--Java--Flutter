# Instrucciones para Probar el Backend

## URLs de la Aplicación

La aplicación está ejecutándose en: `http://localhost:8080`

### Endpoints Disponibles:

#### 1. Controlador de Gatos (`/api/gatos`)

- **GET** `http://localhost:8080/api/gatos/breeds`
  - Obtiene todas las razas de gatos
  - **Método**: GET
  - **Body**: No requiere

- **GET** `http://localhost:8080/api/gatos/breeds/{breed_id}`
  - Ejemplo: `http://localhost:8080/api/gatos/breeds/abys`
  - Obtiene una raza específica por ID
  - **Método**: GET
  - **Body**: No requiere

- **GET** `http://localhost:8080/api/gatos/breeds/search?q={query}`
  - Ejemplo: `http://localhost:8080/api/gatos/breeds/search?q=siamese`
  - Busca razas por nombre
  - **Método**: GET
  - **Body**: No requiere

#### 2. Controlador de Imágenes (`/api/imagenes`)

- **GET** `http://localhost:8080/api/imagenes/imagesbybreedid?breedId={breed_id}&limit={limit}`
  - Ejemplo: `http://localhost:8080/api/imagenes/imagesbybreedid?breedId=abys&limit=5`
  - Obtiene imágenes de una raza específica
  - **Método**: GET
  - **Body**: No requiere
  - **Parámetros**: 
    - `breedId` (obligatorio): ID de la raza
    - `limit` (opcional): Número de imágenes (por defecto 10)

- **GET** `http://localhost:8080/api/imagenes/random?limit={limit}`
  - Ejemplo: `http://localhost:8080/api/imagenes/random?limit=3`
  - Obtiene imágenes aleatorias de gatos
  - **Método**: GET
  - **Body**: No requiere
  - **Parámetros**: 
    - `limit` (opcional): Número de imágenes (por defecto 10)

#### 3. Controlador de Usuarios (`/api/usuarios`)

- **POST** `http://localhost:8080/api/usuarios/register`
  - Registra un nuevo usuario
  - **Método**: POST
  - **Headers**: `Content-Type: application/json`
  - **Body (JSON)**:
    ```json
    {
        "username": "usuario1",
        "email": "usuario1@example.com",
        "password": "password123",
        "firstName": "Juan",
        "lastName": "Pérez"
    }
    ```

- **POST** `http://localhost:8080/api/usuarios/login`
  - Autentica un usuario
  - **Método**: POST
  - **Headers**: `Content-Type: application/json`
  - **Body (JSON)**:
    ```json
    {
        "username": "usuario1",
        "password": "password123"
    }
    ```

- **GET** `http://localhost:8080/api/usuarios/{username}`
  - Ejemplo: `http://localhost:8080/api/usuarios/usuario1`
  - Obtiene información de un usuario
  - **Método**: GET
  - **Body**: No requiere

### Base de Datos H2

- **URL de Consola**: `http://localhost:8080/h2-console`
- **JDBC URL**: `jdbc:h2:mem:testdb`
- **Username**: `sa`
- **Password**: `password`

## Comandos para Ejecutar el Proyecto

### Compilar
```bash
mvn clean compile
```

### Ejecutar Pruebas
```bash
mvn test
```

### Ejecutar la Aplicación
```bash
mvn spring-boot:run
```

### Empaquetar
```bash
mvn clean package
```

### Ejecutar JAR
```bash
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

## Pruebas con curl

### 🔐 Endpoints de Usuarios

#### Registrar un usuario:
```bash
# Método: POST
# Headers: Content-Type: application/json
curl -X POST http://localhost:8080/api/usuarios/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

#### Hacer login:
```bash
# Método: POST  
# Headers: Content-Type: application/json
curl -X POST http://localhost:8080/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

#### Obtener información de un usuario:
```bash
# Método: GET
# Body: No requiere
curl -X GET http://localhost:8080/api/usuarios/testuser
```

### 🐱 Endpoints de Gatos

#### Obtener todas las razas:
```bash
# Método: GET
# Body: No requiere
curl -X GET http://localhost:8080/api/gatos/breeds
```

#### Buscar raza específica:
```bash
# Método: GET
# Body: No requiere
curl -X GET http://localhost:8080/api/gatos/breeds/abys
```

#### Buscar razas por nombre:
```bash
# Método: GET
# Body: No requiere
# Parámetros: q (query de búsqueda)
curl -X GET "http://localhost:8080/api/gatos/breeds/search?q=siamese"
```

### 🖼️ Endpoints de Imágenes

#### Obtener imágenes de una raza:
```bash
# Método: GET
# Body: No requiere
# Parámetros: breedId (obligatorio), limit (opcional)
curl -X GET "http://localhost:8080/api/imagenes/imagesbybreedid?breedId=abys&limit=5"
```

#### Obtener imágenes aleatorias:
```bash
# Método: GET
# Body: No requiere
# Parámetros: limit (opcional)
curl -X GET "http://localhost:8080/api/imagenes/random?limit=3"
```

## 🚀 Pruebas con Postman/Thunder Client

### Configuración de Requests:

#### 1. Registro de Usuario
- **URL**: `http://localhost:8080/api/usuarios/register`
- **Método**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body** (raw JSON):
```json
{
  "username": "testuser",
  "email": "test@example.com", 
  "password": "password123",
  "firstName": "Test",
  "lastName": "User"
}
```

#### 2. Login de Usuario
- **URL**: `http://localhost:8080/api/usuarios/login`
- **Método**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body** (raw JSON):
```json
{
  "username": "testuser",
  "password": "password123"
}
```

#### 3. Obtener Todas las Razas
- **URL**: `http://localhost:8080/api/gatos/breeds`
- **Método**: `GET`
- **Headers**: Ninguno requerido
- **Body**: Ninguno

#### 4. Obtener Raza Específica
- **URL**: `http://localhost:8080/api/gatos/breeds/abys`
- **Método**: `GET`
- **Headers**: Ninguno requerido
- **Body**: Ninguno

#### 5. Buscar Razas por Nombre
- **URL**: `http://localhost:8080/api/gatos/breeds/search`
- **Método**: `GET`
- **Headers**: Ninguno requerido
- **Query Parameters**: 
  - `q`: `siamese`
- **Body**: Ninguno

#### 6. Obtener Imágenes por Raza
- **URL**: `http://localhost:8080/api/imagenes/imagesbybreedid`
- **Método**: `GET`
- **Headers**: Ninguno requerido
- **Query Parameters**: 
  - `breedId`: `abys`
  - `limit`: `5`
- **Body**: Ninguno

#### 7. Obtener Imágenes Aleatorias
- **URL**: `http://localhost:8080/api/imagenes/random`
- **Método**: `GET`
- **Headers**: Ninguno requerido
- **Query Parameters**: 
  - `limit`: `3`
- **Body**: Ninguno

## 📋 Resumen de Métodos HTTP

| Endpoint | Método | Requiere Body | Headers Requeridos |
|----------|--------|---------------|-------------------|
| `/api/usuarios/register` | POST | ✅ JSON | Content-Type: application/json |
| `/api/usuarios/login` | POST | ✅ JSON | Content-Type: application/json |
| `/api/usuarios/{username}` | GET | ❌ | Ninguno |
| `/api/gatos/breeds` | GET | ❌ | Ninguno |
| `/api/gatos/breeds/{id}` | GET | ❌ | Ninguno |
| `/api/gatos/breeds/search` | GET | ❌ | Ninguno |
| `/api/imagenes/imagesbybreedid` | GET | ❌ | Ninguno |
| `/api/imagenes/random` | GET | ❌ | Ninguno |
