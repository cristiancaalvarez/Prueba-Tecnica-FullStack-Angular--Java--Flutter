import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'dart:html' as html;

class UrlLauncherService {
  /// Abre una URL de manera diferente según la plataforma
  static Future<void> openUrl(BuildContext context, String url, String title) async {
    if (kIsWeb) {
      // En web, abrimos en una nueva pestaña
      html.window.open(url, '_blank');
    } else {
      // En plataformas nativas, navegamos al WebView
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => NativeWebViewScreen(url: url, title: title),
        ),
      );
    }
  }
}

class NativeWebViewScreen extends StatefulWidget {
  final String url;
  final String title;

  const NativeWebViewScreen({
    super.key,
    required this.url,
    required this.title,
  });

  @override
  State<NativeWebViewScreen> createState() => _NativeWebViewScreenState();
}

class _NativeWebViewScreenState extends State<NativeWebViewScreen> {
  @override
  Widget build(BuildContext context) {
    // Solo importamos webview_flutter en plataformas nativas
    if (kIsWeb) {
      // En web, esta pantalla no debería mostrarse nunca
      return Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
          backgroundColor: const Color(0xFF6B73FF),
          iconTheme: const IconThemeData(color: Colors.white),
        ),
        body: const Center(
          child: Text('WebView no disponible en web'),
        ),
      );
    } else {
      // En plataformas nativas, usamos el WebView
      return _buildNativeWebView();
    }
  }

  Widget _buildNativeWebView() {
    // Solo importamos webview_flutter cuando no estamos en web
    return Scaffold(
      appBar: AppBar(
        title: Text(
          widget.title,
          style: const TextStyle(color: Colors.white),
        ),
        backgroundColor: const Color(0xFF6B73FF),
        iconTheme: const IconThemeData(color: Colors.white),
        actions: [
          IconButton(
            icon: const Icon(Icons.open_in_browser),
            onPressed: () {
              // En caso de que quieran abrir en navegador externo
              _openInExternalBrowser();
            },
          ),
        ],
      ),
      body: const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.public,
              size: 64,
              color: Color(0xFF6B73FF),
            ),
            SizedBox(height: 16),
            Text(
              'WebView nativo aquí',
              style: TextStyle(fontSize: 18),
            ),
            SizedBox(height: 8),
            Text(
              'En una implementación completa, aquí estaría el WebView',
              style: TextStyle(color: Colors.grey),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }

  void _openInExternalBrowser() {
    // Aquí podrías usar url_launcher para abrir en navegador externo
    // Por ahora solo mostramos un mensaje
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Abriendo: ${widget.url}'),
        action: SnackBarAction(
          label: 'OK',
          onPressed: () {},
        ),
      ),
    );
  }
}
