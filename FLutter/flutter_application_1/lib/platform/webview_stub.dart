// Stub implementation para fallback
import 'package:flutter/material.dart';

class WebViewManager {
  static Widget createWebView(String url, String title) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
        backgroundColor: const Color(0xFF6B73FF),
      ),
      body: const Center(
        child: Text('WebView no disponible'),
      ),
    );
  }
}
