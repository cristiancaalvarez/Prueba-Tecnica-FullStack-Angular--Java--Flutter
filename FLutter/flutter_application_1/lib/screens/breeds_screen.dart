import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';
import '../models/cat_models.dart';
import '../services/cat_api_service.dart';
import '../widgets/cors_image_widget.dart';
import 'webview_screen.dart';

class BreedsScreen extends StatefulWidget {
  const BreedsScreen({super.key});

  @override
  State<BreedsScreen> createState() => _BreedsScreenState();
}

class _BreedsScreenState extends State<BreedsScreen> {
  List<CatBreed> _breeds = [];
  CatBreed? _selectedBreed;
  List<CatImage> _breedImages = [];
  bool _isLoadingBreeds = true;
  bool _isLoadingImages = false;

  @override
  void initState() {
    super.initState();
    _loadBreeds();
  }

  Future<void> _loadBreeds() async {
    try {
      final breeds = await CatApiService.getBreeds();
      setState(() {
        _breeds = breeds;
        _isLoadingBreeds = false;
        if (breeds.isNotEmpty) {
          _selectedBreed = breeds.first;
          _loadBreedImages();
        }
      });
    } catch (e) {
      setState(() {
        _isLoadingBreeds = false;
      });
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error cargando razas: $e')),
        );
      }
    }
  }

  Future<void> _loadBreedImages() async {
    if (_selectedBreed == null) return;

    setState(() {
      _isLoadingImages = true;
    });

    try {
      final images = await CatApiService.getBreedImages(_selectedBreed!.id);
      setState(() {
        _breedImages = images;
        _isLoadingImages = false;
      });
    } catch (e) {
      setState(() {
        _isLoadingImages = false;
      });
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error cargando imágenes: $e')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Razas de Gatos',
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: const Color(0xFF6B73FF),
        elevation: 0,
      ),
      body: _isLoadingBreeds
          ? const Center(child: CircularProgressIndicator())
          : _breeds.isEmpty
              ? const Center(child: Text('No se pudieron cargar las razas'))
              : SingleChildScrollView(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Dropdown para seleccionar raza
                      Container(
                        width: double.infinity,
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        decoration: BoxDecoration(
                          border: Border.all(color: const Color(0xFF6B73FF)),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: DropdownButtonHideUnderline(
                          child: DropdownButton<CatBreed>(
                            value: _selectedBreed,
                            hint: const Text('Selecciona una raza'),
                            isExpanded: true,
                            items: _breeds.map((breed) {
                              return DropdownMenuItem<CatBreed>(
                                value: breed,
                                child: Text(breed.name),
                              );
                            }).toList(),
                            onChanged: (CatBreed? newBreed) {
                              if (newBreed != null) {
                                setState(() {
                                  _selectedBreed = newBreed;
                                });
                                _loadBreedImages();
                              }
                            },
                          ),
                        ),
                      ),
                      const SizedBox(height: 20),

                      if (_selectedBreed != null) ...[
                        // Título con nombre de la raza
                        Text(
                          _selectedBreed!.name,
                          style: const TextStyle(
                            fontSize: 28,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF6B73FF),
                          ),
                        ),
                        const SizedBox(height: 16),

                        // Información básica
                        Card(
                          elevation: 4,
                          child: Padding(
                            padding: const EdgeInsets.all(16.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                _buildInfoRow('Origen:', _selectedBreed!.origin ?? 'No disponible'),
                                const SizedBox(height: 8),
                                _buildInfoRow('Expectativa de vida:', _selectedBreed!.lifeSpan ?? 'No disponible'),
                                const SizedBox(height: 8),
                                _buildInfoRow('Inteligencia:', _selectedBreed!.intelligence?.toString() ?? 'No disponible'),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(height: 20),

                        // Carrusel de imágenes
                        if (_isLoadingImages)
                          const Center(child: CircularProgressIndicator())
                        else if (_breedImages.isNotEmpty)
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'Galería de fotos',
                                style: TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              const SizedBox(height: 16),
                              CarouselSlider(
                                options: CarouselOptions(
                                  height: 300,
                                  autoPlay: true,
                                  enlargeCenterPage: true,
                                  aspectRatio: 16/9,
                                  autoPlayCurve: Curves.fastOutSlowIn,
                                  enableInfiniteScroll: true,
                                  autoPlayAnimationDuration: const Duration(milliseconds: 800),
                                  viewportFraction: 0.8,
                                ),
                                items: _breedImages.map((image) {
                                  return Builder(
                                    builder: (BuildContext context) {
                                      return Container(
                                        width: MediaQuery.of(context).size.width,
                                        margin: const EdgeInsets.symmetric(horizontal: 5.0),
                                        child: CorsImageWidget(
                                          imageUrl: image.url,
                                          width: double.infinity,
                                          height: 300,
                                          fit: BoxFit.cover,
                                        ),
                                      );
                                    },
                                  );
                                }).toList(),
                              ),
                            ],
                          )
                        else
                          const Center(
                            child: Text('No hay imágenes disponibles para esta raza'),
                          ),
                        const SizedBox(height: 20),

                        // Descripción
                        if (_selectedBreed!.description != null) ...[
                          const Text(
                            'Descripción',
                            style: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Card(
                            elevation: 4,
                            child: Padding(
                              padding: const EdgeInsets.all(16.0),
                              child: Text(
                                _selectedBreed!.description!,
                                style: const TextStyle(fontSize: 16),
                                textAlign: TextAlign.justify,
                              ),
                            ),
                          ),
                          const SizedBox(height: 16),
                        ],

                        // Botón de Wikipedia
                        if (_selectedBreed!.wikipediaUrl != null)
                          Center(
                            child: ElevatedButton.icon(
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => WebViewScreen(
                                      url: _selectedBreed!.wikipediaUrl!,
                                      title: 'Wikipedia - ${_selectedBreed!.name}',
                                    ),
                                  ),
                                );
                              },
                              icon: const Icon(Icons.public),
                              label: const Text('Ver en Wikipedia'),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color(0xFF6B73FF),
                                foregroundColor: Colors.white,
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 24,
                                  vertical: 12,
                                ),
                              ),
                            ),
                          ),
                      ],
                    ],
                  ),
                ),
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 16,
          ),
        ),
        const SizedBox(width: 8),
        Expanded(
          child: Text(
            value,
            style: const TextStyle(fontSize: 16),
          ),
        ),
      ],
    );
  }
}
