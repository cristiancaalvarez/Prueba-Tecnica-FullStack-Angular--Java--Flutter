// Archivo para importaciones condicionales de WebView
library webview_imports;

// Exportamos solo lo que necesitamos según la plataforma
export 'webview_stub.dart'
    if (dart.library.io) 'webview_mobile.dart'
    if (dart.library.html) 'webview_web.dart';
