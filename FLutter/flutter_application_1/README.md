# Cat Explorer - Aplicación Flutter

Una aplicación Flutter completa que permite explorar razas de gatos usando la API de TheCatAPI.

## Características

### 🎬 Splash Screen con Lottie
- Animación personalizada de gatos creada con Lottie
- Transición automática después de 3 segundos
- Diseño atractivo con gradientes y animaciones

### 🐱 Pantalla de Razas
- **Dropdown de razas**: Lista desplegable con todas las razas disponibles
- **Carrusel de imágenes**: Visualización automática de fotos de la raza seleccionada
- **Información detallada**:
  - Nombre de la raza
  - Origen
  - Expectativa de vida
  - Nivel de inteligencia
  - Descripción completa
- **WebView integrado**: Acceso a Wikipedia (nueva pestaña en web, integrado en móvil)

### ❤️ Pantalla de Votación
- **Carrusel interactivo**: Desliza hacia la izquierda para ver más gatos
- **Sistema de votación**: Botones de "Me gusta" y "No me gusta"
- **Navegación intuitiva**: Solo permite deslizar hacia la izquierda
- **Carga automática**: Obtiene nuevas imágenes automáticamente

### 🔄 Navegación
- **Bottom Navigation Bar**: Navegación entre las dos pantallas principales
- **Diseño consistente**: Colores y estilos unificados
- **Iconos intuitivos**: Pets para razas, corazón para votación

## Tecnologías Utilizadas

- **Flutter**: Framework principal
- **Lottie**: Animaciones del splash screen
- **HTTP**: Comunicación con la API
- **URL Launcher**: Apertura de enlaces externos (Wikipedia)
- **Carousel Slider**: Carruseles de imágenes
- **TheCatAPI**: API pública para datos e imágenes de gatos

## API Key
La aplicación utiliza la siguiente API key de TheCatAPI:
```
live_JBT0Ah0Nt12iyl2IpjQVLDWjcLk0GQwf4zI9wBMfmfejKmcC31mOJp4yJz5TsOUP
```

## Instalación y Ejecución

### Prerrequisitos
- Flutter SDK instalado (versión 3.4.1 o superior)
- Dart SDK
- Editor compatible (VS Code, Android Studio, etc.)
- Navegador web (Chrome recomendado para web)

### Pasos para ejecutar
1. **Clonar o descargar el proyecto**

2. **Navegar al directorio del proyecto:**
   ```bash
   cd "c:\Users\jhomy\Downloads\PRUEBA TECNICA CRISTIAN CAMILO AYA\FLutter\flutter_application_1"
   ```

3. **Instalar dependencias:**
   ```bash
   flutter clean
   flutter pub get
   ```

4. **Ejecutar la aplicación:**

   **Para Web (recomendado):**
   ```bash
   flutter run -d chrome --web-renderer html --web-browser-flag --disable-web-security
   ```

   **Para Windows Desktop:**
   ```bash
   flutter run -d windows
   ```

   **Para dispositivos móviles:**
   ```bash
   flutter run -d android
   # o
   flutter run -d ios
   ```

5. **Seleccionar dispositivo si hay múltiples opciones:**
   - [1] Windows (desktop)
   - [2] Chrome (web)
   - [3] Edge (web)

## Estructura del Proyecto

```
lib/
├── main.dart                 # Punto de entrada de la aplicación
├── models/
│   └── cat_models.dart      # Modelos de datos para razas e imágenes
├── services/
│   ├── cat_api_service.dart # Servicio para comunicación con la API
│   ├── image_proxy_service.dart # Servicio para manejo de imágenes CORS
│   └── url_launcher_service.dart # Servicio para URLs externas
├── widgets/
│   └── cors_image_widget.dart # Widget personalizado para imágenes
├── platform/                # Implementaciones específicas por plataforma
│   ├── webview_imports.dart
│   ├── webview_web.dart
│   ├── webview_mobile.dart
│   └── webview_stub.dart
└── screens/
    ├── splash_screen.dart    # Pantalla de splash con Lottie
    ├── main_navigation.dart  # Navegación principal con bottom bar
    ├── breeds_screen.dart    # Pantalla de razas con dropdown y carrusel
    ├── voting_screen.dart    # Pantalla de votación con gestos
    └── webview_screen.dart   # WebView para Wikipedia

assets/
└── animations/
    └── lovely_cats.json     # Animación Lottie personalizada

web/
├── index.html              # Configuración web con headers CORS
├── cors_setup.js          # Script para manejo de CORS
└── manifest.json          # Manifest de la aplicación web
```

## Funcionalidades Implementadas

### ✅ Requisitos Cumplidos
1. **Splash Screen con Lottie** ✅
   - Animación personalizada de gatos
   - Transición automática a la aplicación

2. **Navegación entre pantallas** ✅
   - Bottom Navigation Bar
   - 2 pantallas principales

3. **Integración con TheCatAPI** ✅
   - Uso de la API key proporcionada
   - Endpoint GET /breeds implementado
   - Búsqueda de imágenes por raza

4. **Pantalla de Razas** ✅
   - Dropdown con lista de razas
   - Carrusel automático de imágenes
   - Información completa (nombre, vida, inteligencia, origen)
   - Descripción y enlace a Wikipedia
   - Apertura de Wikipedia según plataforma

5. **Pantalla de Votación** ✅
   - Formato carrusel con foto y nombre
   - Botones de like/dislike
   - Deslizamiento SOLO hacia la izquierda (validado)
   - Votación automática en la API

## Características Adicionales

- **Manejo de errores**: Mensajes informativos para el usuario
- **Loading states**: Indicadores de carga en todas las operaciones
- **Diseño responsive**: Adaptable a diferentes tamaños de pantalla
- **Animaciones fluidas**: Transiciones suaves entre estados
- **Gestión de imágenes CORS**: Widget personalizado para manejo de CORS en web
- **Compatibilidad multi-plataforma**: Funciona en web, desktop y móvil
- **Gestión de estados**: Estado reactivo con setState

## Soluciones Implementadas

### 🌐 **Problema CORS en Web**
- Widget personalizado `CorsImageWidget` para manejo de imágenes
- Headers HTTP específicos para web
- Placeholders elegantes cuando las imágenes fallan
- Configuración CSP en el HTML

### 📱 **WebView Multi-plataforma**
- **En Web**: Abre Wikipedia en nueva pestaña del navegador
- **En Móvil**: Preparado para WebView nativo (futuras implementaciones)
- Implementación condicional según la plataforma

### 👆 **Validación de Gestos**
- **Deslizar izquierda**: ✅ Permitido (cambia imagen)
- **Deslizar derecha**: ❌ Bloqueado completamente
- Velocidad mínima de 200px/s para activar

## Comandos Útiles

### Para desarrollo web:
```bash
flutter run -d chrome --web-renderer html --web-browser-flag --disable-web-security
```

### Para limpiar y reinstalar:
```bash
flutter clean
flutter pub get
flutter run
```

### Para construir para producción:
```bash
flutter build web --web-renderer html
flutter build windows
flutter build apk
```

## Documentación Adicional

- `CORS_SOLUTION.md` - Solución detallada al problema de CORS
- `WEBVIEW_SOLUTION.md` - Implementación multi-plataforma de WebView

¡Disfruta explorando el mundo de los gatos! 🐱
