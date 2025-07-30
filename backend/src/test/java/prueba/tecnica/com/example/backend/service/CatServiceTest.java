package prueba.tecnica.com.example.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import prueba.tecnica.com.example.backend.config.CatApiProperties;
import prueba.tecnica.com.example.backend.dto.BreedDto;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CatServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private CatApiProperties catApiProperties;

    @InjectMocks
    private CatService catService;

    private BreedDto sampleBreed;

    @BeforeEach
    void setUp() {
        sampleBreed = BreedDto.builder()
                .id("abys")
                .name("Abyssinian")
                .description("The Abyssinian is easy to care for...")
                .temperament("Active, Energetic, Independent")
                .origin("Egypt")
                .build();

        when(catApiProperties.getBaseUrl()).thenReturn("https://api.thecatapi.com/v1");
        when(catApiProperties.getKey()).thenReturn("test-api-key");
    }

    @Test
    void getAllBreeds_ShouldReturnListOfBreeds_WhenApiCallSuccessful() {
        // Arrange
        BreedDto[] breedsArray = {sampleBreed};
        ResponseEntity<BreedDto[]> responseEntity = new ResponseEntity<>(breedsArray, HttpStatus.OK);

        when(restTemplate.exchange(
                anyString(),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(BreedDto[].class)
        )).thenReturn(responseEntity);

        // Act
        List<BreedDto> result = catService.getAllBreeds();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("abys", result.get(0).getId());
        assertEquals("Abyssinian", result.get(0).getName());

        verify(restTemplate, times(1)).exchange(
                anyString(),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(BreedDto[].class)
        );
    }

    @Test
    void getAllBreeds_ShouldThrowException_WhenApiCallFails() {
        // Arrange
        when(restTemplate.exchange(
                anyString(),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(BreedDto[].class)
        )).thenThrow(new RuntimeException("API call failed"));

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            catService.getAllBreeds();
        });

        assertEquals("Error al conectar con la API de gatos", exception.getMessage());
    }

    @Test
    void getBreedById_ShouldReturnBreed_WhenBreedExists() {
        // Arrange
        String breedId = "abys";
        ResponseEntity<BreedDto> responseEntity = new ResponseEntity<>(sampleBreed, HttpStatus.OK);

        when(restTemplate.exchange(
                anyString(),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(BreedDto.class)
        )).thenReturn(responseEntity);

        // Act
        Optional<BreedDto> result = catService.getBreedById(breedId);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("abys", result.get().getId());
        assertEquals("Abyssinian", result.get().getName());
    }

    @Test
    void getBreedById_ShouldReturnEmpty_WhenBreedNotFound() {
        // Arrange
        String breedId = "nonexistent";
        when(restTemplate.exchange(
                anyString(),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(BreedDto.class)
        )).thenThrow(new RuntimeException("404 Not Found"));

        // Act
        Optional<BreedDto> result = catService.getBreedById(breedId);

        // Assert
        assertFalse(result.isPresent());
    }

    @Test
    void searchBreeds_ShouldReturnMatchingBreeds_WhenQueryProvided() {
        // Arrange
        String query = "aby";
        BreedDto[] breedsArray = {sampleBreed};
        ResponseEntity<BreedDto[]> responseEntity = new ResponseEntity<>(breedsArray, HttpStatus.OK);

        when(restTemplate.exchange(
                anyString(),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(BreedDto[].class)
        )).thenReturn(responseEntity);

        // Act
        List<BreedDto> result = catService.searchBreeds(query);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("abys", result.get(0).getId());
    }

    @Test
    void searchBreeds_ShouldThrowException_WhenApiCallFails() {
        // Arrange
        String query = "test";
        when(restTemplate.exchange(
                anyString(),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(BreedDto[].class)
        )).thenThrow(new RuntimeException("API call failed"));

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            catService.searchBreeds(query);
        });

        assertEquals("Error al buscar razas", exception.getMessage());
    }
}
