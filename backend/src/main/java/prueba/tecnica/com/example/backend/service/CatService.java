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
import prueba.tecnica.com.example.backend.dto.BreedDto;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CatService {
    
    private final RestTemplate restTemplate;
    private final CatApiProperties catApiProperties;
    
    /**
     * Obtiene todas las razas de gatos
     */
    public List<BreedDto> getAllBreeds() {
        try {
            String url = catApiProperties.getBaseUrl() + "/breeds";
            HttpHeaders headers = createHeaders();
            HttpEntity<String> entity = new HttpEntity<>(headers);
            
            ResponseEntity<BreedDto[]> response = restTemplate.exchange(
                url, HttpMethod.GET, entity, BreedDto[].class);
            
            if (response.getBody() != null) {
                return Arrays.asList(response.getBody());
            }
            return Collections.emptyList();
            
        } catch (Exception e) {
            log.error("Error al obtener todas las razas: {}", e.getMessage());
            throw new RuntimeException("Error al conectar con la API de gatos", e);
        }
    }
    
    /**
     * Obtiene una raza específica por ID
     */
    public Optional<BreedDto> getBreedById(String breedId) {
        try {
            String url = catApiProperties.getBaseUrl() + "/breeds/" + breedId;
            HttpHeaders headers = createHeaders();
            HttpEntity<String> entity = new HttpEntity<>(headers);
            
            ResponseEntity<BreedDto> response = restTemplate.exchange(
                url, HttpMethod.GET, entity, BreedDto.class);
            
            return Optional.ofNullable(response.getBody());
            
        } catch (Exception e) {
            log.error("Error al obtener la raza con ID {}: {}", breedId, e.getMessage());
            return Optional.empty();
        }
    }
    
    /**
     * Busca razas por query
     */
    public List<BreedDto> searchBreeds(String query) {
        try {
            String url = UriComponentsBuilder
                .fromUriString(catApiProperties.getBaseUrl() + "/breeds/search")
                .queryParam("q", query)
                .toUriString();
            
            HttpHeaders headers = createHeaders();
            HttpEntity<String> entity = new HttpEntity<>(headers);
            
            ResponseEntity<BreedDto[]> response = restTemplate.exchange(
                url, HttpMethod.GET, entity, BreedDto[].class);
            
            if (response.getBody() != null) {
                return Arrays.asList(response.getBody());
            }
            return Collections.emptyList();
            
        } catch (Exception e) {
            log.error("Error al buscar razas con query '{}': {}", query, e.getMessage());
            throw new RuntimeException("Error al buscar razas", e);
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
