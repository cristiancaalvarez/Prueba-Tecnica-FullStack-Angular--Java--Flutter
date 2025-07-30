package prueba.tecnica.com.example.backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import prueba.tecnica.com.example.backend.dto.BreedDto;
import prueba.tecnica.com.example.backend.service.CatService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/gatos")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
public class CatController {
    
    private final CatService catService;
    
    /**
     * GET /api/gatos/breeds
     * Retorna una lista de todas las razas de gatos
     */
    @GetMapping("/breeds")
    public ResponseEntity<List<BreedDto>> getAllBreeds() {
        try {
            log.info("Obteniendo todas las razas de gatos");
            List<BreedDto> breeds = catService.getAllBreeds();
            return ResponseEntity.ok(breeds);
        } catch (Exception e) {
            log.error("Error al obtener razas: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * GET /api/gatos/breeds/{breedId}
     * Retorna únicamente la raza de gato solicitada
     */
    @GetMapping("/breeds/{breedId}")
    public ResponseEntity<BreedDto> getBreedById(@PathVariable String breedId) {
        try {
            log.info("Obteniendo raza con ID: {}", breedId);
            Optional<BreedDto> breed = catService.getBreedById(breedId);
            
            if (breed.isPresent()) {
                return ResponseEntity.ok(breed.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("Error al obtener raza con ID {}: {}", breedId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * GET /api/gatos/breeds/search
     * Retorna la información asociada a la consulta realizada de acuerdo a los parámetros
     */
    @GetMapping("/breeds/search")
    public ResponseEntity<List<BreedDto>> searchBreeds(@RequestParam String q) {
        try {
            log.info("Buscando razas con query: {}", q);
            
            if (q == null || q.trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            
            List<BreedDto> breeds = catService.searchBreeds(q);
            return ResponseEntity.ok(breeds);
        } catch (Exception e) {
            log.error("Error al buscar razas con query '{}': {}", q, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
