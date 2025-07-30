package prueba.tecnica.com.example.backend.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import prueba.tecnica.com.example.backend.dto.BreedDto;
import prueba.tecnica.com.example.backend.service.CatService;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CatControllerTest {

    @Mock
    private CatService catService;

    @InjectMocks
    private CatController catController;

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
    }

    @Test
    void getAllBreeds_ShouldReturnListOfBreeds() {
        // Arrange
        List<BreedDto> breeds = Arrays.asList(sampleBreed);
        when(catService.getAllBreeds()).thenReturn(breeds);

        // Act
        ResponseEntity<List<BreedDto>> response = catController.getAllBreeds();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
        assertEquals("abys", response.getBody().get(0).getId());
    }

    @Test
    void getBreedById_ShouldReturnBreed_WhenBreedExists() {
        // Arrange
        String breedId = "abys";
        when(catService.getBreedById(breedId)).thenReturn(Optional.of(sampleBreed));

        // Act
        ResponseEntity<BreedDto> response = catController.getBreedById(breedId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("abys", response.getBody().getId());
    }

    @Test
    void getBreedById_ShouldReturnNotFound_WhenBreedDoesNotExist() {
        // Arrange
        String breedId = "nonexistent";
        when(catService.getBreedById(breedId)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<BreedDto> response = catController.getBreedById(breedId);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void searchBreeds_ShouldReturnMatchingBreeds() {
        // Arrange
        String query = "aby";
        List<BreedDto> breeds = Arrays.asList(sampleBreed);
        when(catService.searchBreeds(query)).thenReturn(breeds);

        // Act
        ResponseEntity<List<BreedDto>> response = catController.searchBreeds(query);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
    }

    @Test
    void searchBreeds_ShouldReturnBadRequest_WhenQueryIsEmpty() {
        // Act
        ResponseEntity<List<BreedDto>> response = catController.searchBreeds("");

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void searchBreeds_ShouldReturnBadRequest_WhenQueryIsNull() {
        // Act
        ResponseEntity<List<BreedDto>> response = catController.searchBreeds(null);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }
}
