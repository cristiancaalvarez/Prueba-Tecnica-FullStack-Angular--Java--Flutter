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
import prueba.tecnica.com.example.backend.dto.CatImageDto;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ImageServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private CatApiProperties catApiProperties;

    @InjectMocks
    private ImageService imageService;

    private CatImageDto sampleImage;

    @BeforeEach
    void setUp() {
        sampleImage = CatImageDto.builder()
                .id("image123")
                .url("https://example.com/cat.jpg")
                .width(800)
                .height(600)
                .build();

        when(catApiProperties.getBaseUrl()).thenReturn("https://api.thecatapi.com/v1");
        when(catApiProperties.getKey()).thenReturn("test-api-key");
    }

    @Test
    void getImagesByBreedId_ShouldReturnImages_WhenBreedExists() {
        // Arrange
        String breedId = "abys";
        Integer limit = 5;
        CatImageDto[] imagesArray = {sampleImage};
        ResponseEntity<CatImageDto[]> responseEntity = new ResponseEntity<>(imagesArray, HttpStatus.OK);

        when(restTemplate.exchange(
                anyString(),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(CatImageDto[].class)
        )).thenReturn(responseEntity);

        // Act
        List<CatImageDto> result = imageService.getImagesByBreedId(breedId, limit);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("image123", result.get(0).getId());
        assertEquals("https://example.com/cat.jpg", result.get(0).getUrl());

        verify(restTemplate, times(1)).exchange(
                anyString(),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(CatImageDto[].class)
        );
    }

    @Test
    void getImagesByBreedId_ShouldUseDefaultLimit_WhenLimitIsNull() {
        // Arrange
        String breedId = "abys";
        CatImageDto[] imagesArray = {sampleImage};
        ResponseEntity<CatImageDto[]> responseEntity = new ResponseEntity<>(imagesArray, HttpStatus.OK);

        when(restTemplate.exchange(
                anyString(),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(CatImageDto[].class)
        )).thenReturn(responseEntity);

        // Act
        List<CatImageDto> result = imageService.getImagesByBreedId(breedId, null);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
    }

    @Test
    void getImagesByBreedId_ShouldThrowException_WhenApiCallFails() {
        // Arrange
        String breedId = "abys";
        Integer limit = 5;

        when(restTemplate.exchange(
                anyString(),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(CatImageDto[].class)
        )).thenThrow(new RuntimeException("API call failed"));

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            imageService.getImagesByBreedId(breedId, limit);
        });

        assertEquals("Error al obtener imágenes", exception.getMessage());
    }

    @Test
    void getRandomImages_ShouldReturnImages_WhenCalled() {
        // Arrange
        Integer limit = 3;
        CatImageDto[] imagesArray = {sampleImage};
        ResponseEntity<CatImageDto[]> responseEntity = new ResponseEntity<>(imagesArray, HttpStatus.OK);

        when(restTemplate.exchange(
                anyString(),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(CatImageDto[].class)
        )).thenReturn(responseEntity);

        // Act
        List<CatImageDto> result = imageService.getRandomImages(limit);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("image123", result.get(0).getId());
    }

    @Test
    void getRandomImages_ShouldUseDefaultLimit_WhenLimitIsNull() {
        // Arrange
        CatImageDto[] imagesArray = {sampleImage};
        ResponseEntity<CatImageDto[]> responseEntity = new ResponseEntity<>(imagesArray, HttpStatus.OK);

        when(restTemplate.exchange(
                anyString(),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(CatImageDto[].class)
        )).thenReturn(responseEntity);

        // Act
        List<CatImageDto> result = imageService.getRandomImages(null);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
    }

    @Test
    void getRandomImages_ShouldThrowException_WhenApiCallFails() {
        // Arrange
        Integer limit = 3;

        when(restTemplate.exchange(
                anyString(),
                eq(HttpMethod.GET),
                any(HttpEntity.class),
                eq(CatImageDto[].class)
        )).thenThrow(new RuntimeException("API call failed"));

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            imageService.getRandomImages(limit);
        });

        assertEquals("Error al obtener imágenes aleatorias", exception.getMessage());
    }
}
