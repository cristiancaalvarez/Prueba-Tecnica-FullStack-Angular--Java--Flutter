import 'package:flutter/foundation.dart';

class ImageProxyService {
  // Para desarrollo web, podemos usar un proxy para evitar CORS
  static String getProxiedImageUrl(String originalUrl) {
    if (kIsWeb && kDebugMode) {
      // En desarrollo, usamos un proxy CORS
      return 'https://cors-anywhere.herokuapp.com/$originalUrl';
    }
    // En producción o plataformas nativas, usamos la URL original
    return originalUrl;
  }
  
  // También podemos usar el servicio de AllOrigins como alternativa
  static String getAltProxiedImageUrl(String originalUrl) {
    if (kIsWeb && kDebugMode) {
      // Alternativa usando AllOrigins
      final encodedUrl = Uri.encodeComponent(originalUrl);
      return 'https://api.allorigins.win/raw?url=$encodedUrl';
    }
    return originalUrl;
  }
  
  // Función para obtener la mejor URL según el contexto
  static String getBestImageUrl(String originalUrl) {
    if (kIsWeb) {
      // Para web, intentamos diferentes estrategias
      if (originalUrl.contains('cdn2.thecatapi.com')) {
        // Las imágenes de TheCatAPI generalmente funcionan directamente
        return originalUrl;
      }
    }
    return originalUrl;
  }
}
