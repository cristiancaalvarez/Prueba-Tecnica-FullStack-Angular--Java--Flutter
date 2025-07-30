# 🐱 CatBreeds Explorer App

Una aplicación web moderna desarrollada en Angular 19 que permite explorar diferentes razas de gatos utilizando la API de TheCatAPI. La aplicación cuenta con un diseño elegante, responsivo y temático felino.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Uso de la Aplicación](#-uso-de-la-aplicación)
- [Funcionalidades Principales](#-funcionalidades-principales)
- [Arquitectura](#-arquitectura)
- [Scripts Disponibles](#-scripts-disponibles)
- [Configuración de la API](#-configuración-de-la-api)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

## ✨ Características

- **Diseño Moderno**: Interfaz elegante con gradientes temáticos felinos (púrpura/azul)
- **Dual View System**: Dos vistas principales para explorar razas:
  - Vista Carrusel: Navegación visual con dropdown de razas
  - Vista Tabla: Búsqueda avanzada con paginación
- **Responsive Design**: Totalmente adaptativo para dispositivos móviles, tablets y desktop
- **Autenticación**: Sistema completo de login y registro de usuarios
- **Arquitectura Modular**: Componentes organizados y separados (HTML, CSS, TypeScript)
- **Hot Module Replacement**: Desarrollo eficiente con recarga automática
- **Lazy Loading**: Carga perezosa de módulos para mejor rendimiento
- **Animaciones Suaves**: Transiciones y efectos hover elegantes

## 🛠 Tecnologías Utilizadas

### Frontend
- **Angular 19** - Framework principal
- **TypeScript** - Lenguaje de programación
- **Bootstrap 5.3.7** - Framework CSS
- **Bootstrap Icons 1.13.1** - Iconografía
- **RxJS 7.8** - Programación reactiva
- **Angular Material 19** - Componentes UI adicionales

### Herramientas de Desarrollo
- **Angular CLI** - Herramientas de desarrollo
- **Express.js** - Servidor para SSR
- **Node.js** - Entorno de ejecución
- **npm** - Gestión de paquetes

### APIs Externas
- **TheCatAPI** - API para información de razas de gatos

## 📁 Estructura del Proyecto

```
cat-app/
├── src/
│   ├── app/
│   │   ├── core/                    # Servicios y modelos centrales
│   │   │   ├── models/              # Interfaces TypeScript
│   │   │   │   ├── cat.interface.ts
│   │   │   │   ├── user.interface.ts
│   │   │   │   ├── api.interface.ts
│   │   │   │   └── pagination.interface.ts
│   │   │   └── services/            # Servicios de la aplicación
│   │   │       ├── auth.service.ts
│   │   │       ├── cat.service.ts
│   │   │       └── pagination.service.ts
│   │   ├── features/                # Módulos de funcionalidades
│   │   │   ├── auth/               # Sistema de autenticación
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── cats/               # Explorador de razas (separado)
│   │   │   │   ├── cats.component.ts
│   │   │   │   ├── cats.component.html
│   │   │   │   └── cats.component.css
│   │   │   └── profile/            # Perfil de usuario
│   │   └── shared/                 # Componentes compartidos
│   │       └── components/
│   │           ├── loading.component.ts
│   │           └── navbar/         # Navbar organizado
│   │               ├── navbar.component.ts
│   │               ├── navbar.component.html
│   │               └── navbar.component.css
│   ├── assets/                     # Recursos estáticos
│   ├── environments/               # Configuraciones de entorno
│   └── styles.css                  # Estilos globales
├── package.json                    # Dependencias del proyecto
├── angular.json                    # Configuración de Angular
├── tsconfig.json                   # Configuración de TypeScript
└── README.md                       # Documentación del proyecto
```

## 📋 Requisitos Previos

Antes de ejecutar la aplicación, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior) - [Descargar](https://nodejs.org/)
- **npm** (incluido con Node.js)
- **Angular CLI** (opcional, pero recomendado)

```bash
# Verificar versiones instaladas
node --version
npm --version

# Instalar Angular CLI globalmente (opcional)
npm install -g @angular/cli
```

## 🚀 Instalación

Sigue estos pasos para configurar el proyecto localmente:

### 1. Clonar o descargar el proyecto
```bash
# Si tienes el proyecto en un repositorio
git clone [URL_DEL_REPOSITORIO]

# O extrae el archivo ZIP en tu directorio preferido
```

### 2. Navegar al directorio del proyecto
```bash
cd "PRUEBA TECNICA CRISTIAN CAMILO AYA/Frontend/cat-app"
```

### 3. Instalar dependencias
```bash
npm install
```

### 4. Iniciar el servidor de desarrollo
```bash
npm start
# o alternativamente
ng serve
```

### 5. Abrir la aplicación
Abre tu navegador y visita: `http://localhost:4200`

## 🎯 Uso de la Aplicación

### Primeros Pasos

1. **Registro de Usuario**: 
   - Haz clic en "Registrarse" en la navbar
   - Completa el formulario con tus datos
   - Confirma tu registro

2. **Iniciar Sesión**:
   - Usa las credenciales creadas para iniciar sesión
   - Una vez autenticado, tendrás acceso completo

3. **Explorar Razas**:
   - Navega a "Explorar Razas" en la navbar
   - Elige entre las dos vistas disponibles

### Vista Carrusel
- **Selector de Raza**: Dropdown con todas las razas disponibles
- **Imagen Principal**: Foto representativa de la raza seleccionada
- **Información Detallada**: Temperamento, origen, esperanza de vida, peso
- **Características**: Niveles de adaptabilidad, energía, inteligencia, etc.

### Vista Tabla
- **Búsqueda en Tiempo Real**: Campo de búsqueda que filtra instantáneamente
- **Tabla Paginada**: Lista organizada con información clave
- **Paginación**: Navegación entre páginas de resultados
- **Responsive**: Adaptación automática a diferentes tamaños de pantalla

## 🔧 Funcionalidades Principales

### Sistema de Autenticación
- Registro de nuevos usuarios
- Inicio de sesión seguro
- Gestión de sesiones
- Perfil de usuario
- Cierre de sesión

### Explorador de Razas
- Integración con TheCatAPI
- Dual view system (Carrusel/Tabla)
- Búsqueda y filtrado
- Paginación inteligente
- Información detallada de cada raza

### Experiencia de Usuario
- Diseño responsive
- Animaciones suaves
- Loading states
- Manejo de errores
- Navegación intuitiva

## 🏗 Arquitectura

### Patrones Utilizados
- **Standalone Components**: Componentes independientes de Angular 19
- **Lazy Loading**: Carga bajo demanda de módulos
- **Services Pattern**: Servicios para lógica de negocio
- **Reactive Programming**: RxJS para manejo de datos asíncronos
- **Separation of Concerns**: HTML, CSS y TypeScript separados

### Servicios Principales

#### AuthService
```typescript
// Gestión de autenticación
- login()
- register()
- logout()
- isAuthenticated()
- getCurrentUser()
```

#### CatService
```typescript
// Interacción con TheCatAPI
- getAllBreeds()
- getBreedImages()
- searchBreeds()
```

#### PaginationService
```typescript
// Gestión de paginación
- paginate()
- getCurrentPage()
- getTotalPages()
```

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm start          # Inicia servidor de desarrollo
npm run watch      # Build con watch mode

# Construcción
npm run build      # Build para producción

# Testing
npm test           # Ejecuta tests unitarios

# SSR (Server Side Rendering)
npm run serve:ssr:cat-app  # Sirve la aplicación con SSR
```

## 🔑 Configuración de la API

La aplicación utiliza TheCatAPI. Para configurar:

1. **Variables de Entorno** (opcional):
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  catApiUrl: 'https://api.thecatapi.com/v1',
  catApiKey: 'TU_API_KEY_AQUI' // Opcional para mayor límite de requests
};
```

2. **Sin API Key**: La aplicación funciona sin API key con límites básicos
3. **Con API Key**: Registra en [TheCatAPI](https://thecatapi.com/) para límites ampliados

## 🎨 Personalización

### Colores Temáticos
Los colores principales están definidos en `src/styles.css`:
```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --secondary-gradient: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  --accent-gradient: linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%);
}
```

### Responsive Breakpoints
- **Mobile**: < 576px
- **Tablet**: 576px - 991px
- **Desktop**: > 992px

## 📱 Compatibilidad

### Navegadores Soportados
- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Edge (últimas 2 versiones)

### Dispositivos
- 📱 Móviles (iOS/Android)
- 📱 Tablets
- 💻 Desktop/Laptop

## 🚨 Solución de Problemas

### Errores Comunes

1. **Error de compilación**:
```bash
# Limpiar caché y reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

2. **Puerto 4200 ocupado**:
```bash
# Usar puerto diferente
ng serve --port 4201
```

3. **Problemas con API**:
- Verificar conexión a internet
- Revisar consola del navegador para errores de CORS

## 📄 Licencia

Este proyecto es parte de una prueba técnica y está destinado únicamente para propósitos educativos y de evaluación.

---

## 👨‍💻 Desarrollado por
**Cristian Camilo Aya**

Para cualquier pregunta o sugerencia sobre la implementación, no dudes en contactar.

---

**¡Disfruta explorando el mundo felino! 🐱✨**
