# Backend de Prueba Técnica - API de Gatos

Este es un backend desarrollado en Java con Spring Boot que proporciona una API REST para gestionar información sobre razas de gatos e imágenes, conectándose a la API pública de [The Cat API](https://thecatapi.com/).

## Características

### Controladores Implementados:

#### 1. Controlador de Gatos (`/api/gatos`)
- **GET /api/gatos/breeds**: Retorna una lista de todas las razas de gatos
- **GET /api/gatos/breeds/{breed_id}**: Retorna únicamente la raza de gato solicitada
- **GET /api/gatos/breeds/search?q={query}**: Retorna la información asociada a la consulta realizada

#### 2. Controlador de Imágenes (`/api/imagenes`)
- **GET /api/imagenes/imagesbybreedid?breedId={breed_id}&limit={limit}**: Retorna las imágenes asociadas a una raza específica de gato
- **GET /api/imagenes/random?limit={limit}**: Retorna imágenes aleatorias de gatos

#### 3. Controlador de Usuarios (`/api/usuarios`)
- **POST /api/usuarios/login**: Permite verificar en la base de datos la existencia de un usuario y validar su contraseña
- **POST /api/usuarios/register**: Permite registrar en la base de datos un usuario con los datos básicos de registro
- **GET /api/usuarios/{username}**: Obtiene la información de un usuario por username

## Tecnologías Utilizadas

- **Java 21**
- **Spring Boot 3.5.4**
- **Spring Data JPA**
- **Spring Security**
- **H2 Database** (Base de datos en memoria)
- **Maven** (Gestión de dependencias)
- **Lombok** (Reducción de código boilerplate)
- **JUnit 5** y **Mockito** (Pruebas unitarias)

## Arquitectura y Buenas Prácticas

### Principios SOLID Aplicados:
- **S** - Single Responsibility: Cada clase tiene una única responsabilidad
- **O** - Open/Closed: Código abierto para extensión, cerrado para modificación
- **L** - Liskov Substitution: Las implementaciones pueden sustituir sus abstracciones
- **I** - Interface Segregation: Interfaces específicas mejor que interfaces generales
- **D** - Dependency Inversion: Dependencia de abstracciones, no de concreciones

### Clean Architecture:
- **Separación por capas**: Controllers, Services, Repositories, Entities, DTOs
- **Inyección de dependencias** con Spring
- **Manejo centralizado de excepciones**
- **Validación de datos** con Bean Validation
- **Configuración externalizada**

## Requisitos del Sistema

- Java 21 o superior
- Maven 3.6 o superior
- Puerto 8080 disponible

## Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd backend
```

### 2. Compilar el proyecto
```bash
mvn clean compile
```

### 3. Ejecutar las pruebas
```bash
mvn test
```

### 4. Ejecutar la aplicación
```bash
mvn spring-boot:run
```

O alternativamente:
```bash
mvn clean package
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

### 5. Verificar que la aplicación esté funcionando
La aplicación estará disponible en: `http://localhost:8080`

## Configuración

### Base de datos H2
- **URL**: `http://localhost:8080/h2-console`
- **JDBC URL**: `jdbc:h2:mem:catdb`
- **Username**: `sa`
- **Password**: `password`

### API Key de The Cat API
La aplicación usa la API key proporcionada en los requisitos. Si necesitas cambiarla, modifica el archivo `application.properties`:

```properties
cat.api.key=tu_nueva_api_key_aqui
```

## Endpoints de la API

### Gatos
```http
GET /api/gatos/breeds
GET /api/gatos/breeds/abys
GET /api/gatos/breeds/search?q=siamese
```

### Imágenes
```http
GET /api/imagenes/imagesbybreedid?breedId=abys&limit=5
GET /api/imagenes/random?limit=3
```

### Usuarios
```http
POST /api/usuarios/register
Content-Type: application/json
{
    "username": "usuario1",
    "email": "usuario1@example.com",
    "password": "password123",
    "firstName": "Juan",
    "lastName": "Pérez"
}

POST /api/usuarios/login
Content-Type: application/json
{
    "username": "usuario1",
    "password": "password123"
}

GET /api/usuarios/usuario1
```

## Pruebas

El proyecto incluye pruebas unitarias completas para:
- **Servicios**: Lógica de negocio
- **Controladores**: Endpoints de la API
- **Integración**: Flujos completos

### Ejecutar todas las pruebas:
```bash
mvn test
```

### Ejecutar pruebas con reporte de cobertura:
```bash
mvn test jacoco:report
```

## Estructura del Proyecto

```
src/
├── main/
│   ├── java/
│   │   └── prueba/tecnica/com/example/backend/
│   │       ├── BackendApplication.java
│   │       ├── config/           # Configuraciones
│   │       ├── controller/       # Controladores REST
│   │       ├── dto/             # Data Transfer Objects
│   │       ├── entity/          # Entidades JPA
│   │       ├── exception/       # Manejo de excepciones
│   │       ├── repository/      # Repositorios JPA
│   │       └── service/         # Lógica de negocio
│   └── resources/
│       └── application.properties
└── test/
    └── java/                    # Pruebas unitarias
```

## Seguridad

- **CORS** configurado para permitir requests desde frontend
- **Spring Security** configurado con endpoints públicos
- **Cifrado de contraseñas** con BCrypt
- **Validación de datos** en DTOs

## Logging

La aplicación incluye logging estructurado con SLF4J y Logback para:
- Peticiones de entrada
- Llamadas a APIs externas
- Errores y excepciones
- Operaciones de base de datos

## Notas Adicionales

- La base de datos H2 se resetea en cada reinicio (configuración para desarrollo)
- Los tokens de autenticación son simplificados (en producción se recomienda JWT)
- La aplicación está configurada para desarrollo local
- Todos los endpoints están documentados y probados

## Autor

Desarrollado como parte de la prueba técnica para el puesto de desarrollador.
