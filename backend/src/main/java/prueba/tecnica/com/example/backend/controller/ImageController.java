package prueba.tecnica.com.example.backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import prueba.tecnica.com.example.backend.dto.CatImageDto;
import prueba.tecnica.com.example.backend.service.ImageService;

import java.util.List;

@RestController
@RequestMapping("/api/imagenes")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
public class ImageController {
    
    private final ImageService imageService;
    
    /**
     * GET /api/imagenes/imagesbybreedid
     * Retorna las imágenes asociadas a una raza específica de gato
     */
    @GetMapping("/imagesbybreedid")
    public ResponseEntity<List<CatImageDto>> getImagesByBreedId(
            @RequestParam String breedId,
            @RequestParam(required = false, defaultValue = "10") Integer limit) {
        try {
            log.info("Obteniendo imágenes para la raza: {} con límite: {}", breedId, limit);
            
            if (breedId == null || breedId.trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            
            List<CatImageDto> images = imageService.getImagesByBreedId(breedId, limit);
            return ResponseEntity.ok(images);
        } catch (Exception e) {
            log.error("Error al obtener imágenes para la raza {}: {}", breedId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * GET /api/imagenes/random
     * Retorna imágenes aleatorias de gatos
     */
    @GetMapping("/random")
    public ResponseEntity<List<CatImageDto>> getRandomImages(
            @RequestParam(required = false, defaultValue = "5") Integer limit) {
        try {
            log.info("Obteniendo {} imágenes aleatorias", limit);
            List<CatImageDto> images = imageService.getRandomImages(limit);
            return ResponseEntity.ok(images);
        } catch (Exception e) {
            log.error("Error al obtener imágenes aleatorias: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
