import 'package:flutter/material.dart';
import '../models/cat_models.dart';
import '../services/cat_api_service.dart';
import '../widgets/cors_image_widget.dart';

class VotingScreen extends StatefulWidget {
  const VotingScreen({super.key});

  @override
  State<VotingScreen> createState() => _VotingScreenState();
}

class _VotingScreenState extends State<VotingScreen> {
  List<CatImage> _images = [];
  int _currentIndex = 0;
  bool _isLoading = true;
  bool _isVoting = false;

  @override
  void initState() {
    super.initState();
    _loadInitialImages();
  }

  Future<void> _loadInitialImages() async {
    try {
      final images = await CatApiService.getRandomImages(limit: 5);
      setState(() {
        _images = images;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _isLoading = false;
      });
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error cargando imágenes: $e')),
        );
      }
    }
  }

  Future<void> _loadMoreImages() async {
    try {
      final newImages = await CatApiService.getRandomImages(limit: 3);
      setState(() {
        _images.addAll(newImages);
      });
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error cargando más imágenes: $e')),
        );
      }
    }
  }

  Future<void> _vote(bool isPositive) async {
    if (_currentIndex >= _images.length || _isVoting) return;

    setState(() {
      _isVoting = true;
    });

    try {
      await CatApiService.voteImage(_images[_currentIndex].id, isPositive);
      _nextImage();
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error al votar: $e')),
        );
      }
    } finally {
      setState(() {
        _isVoting = false;
      });
    }
  }

  void _nextImage() {
    setState(() {
      _currentIndex++;
    });

    // Cargar más imágenes si estamos cerca del final
    if (_currentIndex >= _images.length - 2) {
      _loadMoreImages();
    }

    // Si no hay más imágenes, volver a cargar
    if (_currentIndex >= _images.length) {
      _currentIndex = 0;
      _loadInitialImages();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Votar Gatos',
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: const Color(0xFF6B73FF),
        elevation: 0,
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _images.isEmpty
              ? const Center(child: Text('No hay imágenes disponibles'))
              : GestureDetector(
                  onHorizontalDragEnd: (details) {
                    // Solo permitir deslizar hacia la izquierda (velocidad negativa)
                    if (details.primaryVelocity! < -200) {
                      _nextImage();
                    }
                    // No hacer nada si desliza hacia la derecha (velocidad positiva)
                  },
                  child: Container(
                    width: double.infinity,
                    height: double.infinity,
                    decoration: const BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [
                          Color(0xFF6B73FF),
                          Color(0xFF9B59B6),
                        ],
                      ),
                    ),
                    child: Column(
                      children: [
                        // Indicador de progreso
                        Container(
                          padding: const EdgeInsets.all(16),
                          child: Text(
                            'Imagen ${_currentIndex + 1} de ${_images.length}',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),

                        // Imagen principal
                        Expanded(
                          child: Container(
                            margin: const EdgeInsets.all(20),
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(20),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withOpacity(0.3),
                                  blurRadius: 20,
                                  offset: const Offset(0, 10),
                                ),
                              ],
                            ),
                            child: ClipRRect(
                              borderRadius: BorderRadius.circular(20),
                              child: Stack(
                                children: [
                                  // Imagen
                                  Container(
                                    width: double.infinity,
                                    height: double.infinity,
                                    child: CorsImageWidget(
                                      imageUrl: _images[_currentIndex].url,
                                      width: double.infinity,
                                      height: double.infinity,
                                      fit: BoxFit.cover,
                                    ),
                                  ),

                                  // Overlay con información de la raza (si está disponible)
                                  if (_images[_currentIndex].breeds != null &&
                                      _images[_currentIndex].breeds!.isNotEmpty)
                                    Positioned(
                                      bottom: 0,
                                      left: 0,
                                      right: 0,
                                      child: Container(
                                        padding: const EdgeInsets.all(16),
                                        decoration: BoxDecoration(
                                          gradient: LinearGradient(
                                            begin: Alignment.bottomCenter,
                                            end: Alignment.topCenter,
                                            colors: [
                                              Colors.black.withOpacity(0.8),
                                              Colors.transparent,
                                            ],
                                          ),
                                        ),
                                        child: Text(
                                          _images[_currentIndex].breeds!.first.name,
                                          style: const TextStyle(
                                            color: Colors.white,
                                            fontSize: 24,
                                            fontWeight: FontWeight.bold,
                                          ),
                                          textAlign: TextAlign.center,
                                        ),
                                      ),
                                    ),
                                ],
                              ),
                            ),
                          ),
                        ),

                        // Botones de votación
                        Container(
                          padding: const EdgeInsets.all(20),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: [
                              // Botón No me gusta
                              GestureDetector(
                                onTap: _isVoting ? null : () => _vote(false),
                                child: Container(
                                  width: 70,
                                  height: 70,
                                  decoration: BoxDecoration(
                                    color: Colors.red,
                                    shape: BoxShape.circle,
                                    boxShadow: [
                                      BoxShadow(
                                        color: Colors.red.withOpacity(0.3),
                                        blurRadius: 10,
                                        offset: const Offset(0, 5),
                                      ),
                                    ],
                                  ),
                                  child: _isVoting
                                      ? const CircularProgressIndicator(
                                          valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                                        )
                                      : const Icon(
                                          Icons.close,
                                          color: Colors.white,
                                          size: 30,
                                        ),
                                ),
                              ),

                              // Botón Me gusta
                              GestureDetector(
                                onTap: _isVoting ? null : () => _vote(true),
                                child: Container(
                                  width: 70,
                                  height: 70,
                                  decoration: BoxDecoration(
                                    color: Colors.green,
                                    shape: BoxShape.circle,
                                    boxShadow: [
                                      BoxShadow(
                                        color: Colors.green.withOpacity(0.3),
                                        blurRadius: 10,
                                        offset: const Offset(0, 5),
                                      ),
                                    ],
                                  ),
                                  child: _isVoting
                                      ? const CircularProgressIndicator(
                                          valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                                        )
                                      : const Icon(
                                          Icons.favorite,
                                          color: Colors.white,
                                          size: 30,
                                        ),
                                ),
                              ),
                            ],
                          ),
                        ),

                        // Instrucciones
                        Container(
                          padding: const EdgeInsets.only(bottom: 20),
                          child: const Text(
                            'Desliza hacia la izquierda para la siguiente imagen',
                            style: TextStyle(
                              color: Colors.white70,
                              fontSize: 14,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
    );
  }
}
