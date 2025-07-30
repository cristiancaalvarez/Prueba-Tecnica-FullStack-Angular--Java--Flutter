package prueba.tecnica.com.example.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import prueba.tecnica.com.example.backend.config.CatApiProperties;
import prueba.tecnica.com.example.backend.dto.CatImageDto;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ImageService {
    
    private final RestTemplate restTemplate;
    private final CatApiProperties catApiProperties;
    
    /**
     * Obtiene imágenes por ID de raza
     */
    public List<CatImageDto> getImagesByBreedId(String breedId, Integer limit) {
        try {
            UriComponentsBuilder builder = UriComponentsBuilder
                .fromUriString(catApiProperties.getBaseUrl() + "/images/search")
                .queryParam("breed_ids", breedId)
                .queryParam("has_breeds", 1);
            
            if (limit != null && limit > 0) {
                builder.queryParam("limit", limit);
            } else {
                builder.queryParam("limit", 10); // Límite por defecto
            }
            
            String url = builder.toUriString();
            
            HttpHeaders headers = createHeaders();
            HttpEntity<String> entity = new HttpEntity<>(headers);
            
            ResponseEntity<CatImageDto[]> response = restTemplate.exchange(
                url, HttpMethod.GET, entity, CatImageDto[].class);
            
            if (response.getBody() != null) {
                return Arrays.asList(response.getBody());
            }
            return Collections.emptyList();
            
        } catch (Exception e) {
            log.error("Error al obtener imágenes para la raza {}: {}", breedId, e.getMessage());
            throw new RuntimeException("Error al obtener imágenes", e);
        }
    }
    
    /**
     * Obtiene una imagen aleatoria
     */
    public List<CatImageDto> getRandomImages(Integer limit) {
        try {
            UriComponentsBuilder builder = UriComponentsBuilder
                .fromUriString(catApiProperties.getBaseUrl() + "/images/search");
            
            if (limit != null && limit > 0) {
                builder.queryParam("limit", limit);
            } else {
                builder.queryParam("limit", 1);
            }
            
            String url = builder.toUriString();
            
            HttpHeaders headers = createHeaders();
            HttpEntity<String> entity = new HttpEntity<>(headers);
            
            ResponseEntity<CatImageDto[]> response = restTemplate.exchange(
                url, HttpMethod.GET, entity, CatImageDto[].class);
            
            if (response.getBody() != null) {
                return Arrays.asList(response.getBody());
            }
            return Collections.emptyList();
            
        } catch (Exception e) {
            log.error("Error al obtener imágenes aleatorias: {}", e.getMessage());
            throw new RuntimeException("Error al obtener imágenes aleatorias", e);
        }
    }
    
    /**
     * Crea los headers necesarios para las peticiones a la API
     */
    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-api-key", catApiProperties.getKey());
        headers.set("Content-Type", "application/json");
        return headers;
    }
}
