import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/cat_models.dart';
import 'package:flutter/foundation.dart';

class CatApiService {
  static const String baseUrl = 'https://api.thecatapi.com/v1';
  static const String apiKey = 'live_JBT0Ah0Nt12iyl2IpjQVLDWjcLk0GQwf4zI9wBMfmfejKmcC31mOJp4yJz5TsOUP';

  static Map<String, String> get _headers => {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
        if (kIsWeb) ...{
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, x-api-key',
        }
      };

  static Future<List<CatBreed>> getBreeds() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/breeds'),
        headers: _headers,
      );

      if (response.statusCode == 200) {
        final List<dynamic> jsonData = json.decode(response.body);
        return jsonData.map((breed) => CatBreed.fromJson(breed)).toList();
      } else {
        throw Exception('Failed to load breeds: ${response.statusCode}');
      }
    } catch (e) {
      print('Error fetching breeds: $e');
      throw Exception('Error fetching breeds: $e');
    }
  }

  static Future<List<CatImage>> getBreedImages(String breedId, {int limit = 10}) async {
    try {
      // Para web, usamos un enfoque diferente para evitar CORS
      final url = kIsWeb 
          ? '$baseUrl/images/search?limit=$limit&breed_ids=$breedId&api_key=$apiKey&size=med'
          : '$baseUrl/images/search?limit=$limit&breed_ids=$breedId';
          
      final response = await http.get(
        Uri.parse(url),
        headers: _headers,
      );

      if (response.statusCode == 200) {
        final List<dynamic> jsonData = json.decode(response.body);
        return jsonData.map((image) => CatImage.fromJson(image)).toList();
      } else {
        throw Exception('Failed to load breed images: ${response.statusCode}');
      }
    } catch (e) {
      print('Error fetching breed images: $e');
      throw Exception('Error fetching breed images: $e');
    }
  }

  static Future<List<CatImage>> getRandomImages({int limit = 1}) async {
    try {
      // Para web, usamos un enfoque diferente para evitar CORS
      final url = kIsWeb 
          ? '$baseUrl/images/search?limit=$limit&has_breeds=1&api_key=$apiKey&size=med'
          : '$baseUrl/images/search?limit=$limit&has_breeds=1';
          
      final response = await http.get(
        Uri.parse(url),
        headers: _headers,
      );

      if (response.statusCode == 200) {
        final List<dynamic> jsonData = json.decode(response.body);
        return jsonData.map((image) => CatImage.fromJson(image)).toList();
      } else {
        throw Exception('Failed to load random images: ${response.statusCode}');
      }
    } catch (e) {
      print('Error fetching random images: $e');
      throw Exception('Error fetching random images: $e');
    }
  }

  static Future<void> voteImage(String imageId, bool isPositive) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/votes'),
        headers: _headers,
        body: json.encode({
          'image_id': imageId,
          'value': isPositive ? 1 : 0,
        }),
      );

      if (response.statusCode != 200 && response.statusCode != 201) {
        throw Exception('Failed to vote: ${response.statusCode}');
      }
    } catch (e) {
      print('Error voting: $e');
      throw Exception('Error voting: $e');
    }
  }
}
