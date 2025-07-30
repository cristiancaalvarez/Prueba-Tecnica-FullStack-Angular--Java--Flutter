class CatBreed {
  final String id;
  final String name;
  final String? description;
  final String? origin;
  final String? lifeSpan;
  final int? intelligence;
  final String? wikipediaUrl;

  CatBreed({
    required this.id,
    required this.name,
    this.description,
    this.origin,
    this.lifeSpan,
    this.intelligence,
    this.wikipediaUrl,
  });

  factory CatBreed.fromJson(Map<String, dynamic> json) {
    return CatBreed(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      description: json['description'],
      origin: json['origin'],
      lifeSpan: json['life_span'],
      intelligence: json['intelligence'],
      wikipediaUrl: json['wikipedia_url'],
    );
  }
}

class CatImage {
  final String id;
  final String url;
  final List<CatBreed>? breeds;

  CatImage({
    required this.id,
    required this.url,
    this.breeds,
  });

  factory CatImage.fromJson(Map<String, dynamic> json) {
    return CatImage(
      id: json['id'] ?? '',
      url: json['url'] ?? '',
      breeds: json['breeds'] != null
          ? (json['breeds'] as List)
              .map((breed) => CatBreed.fromJson(breed))
              .toList()
          : null,
    );
  }
}
