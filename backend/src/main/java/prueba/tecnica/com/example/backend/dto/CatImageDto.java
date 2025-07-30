package prueba.tecnica.com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.Singular;
import lombok.extern.jackson.Jacksonized;

import java.util.List;

/**
 * DTO para representar una imagen de gato con información de razas asociadas
 * Utiliza @Singular para facilitar la construcción de listas con el Builder
 */
@Data
@Builder
@Jacksonized
public class CatImageDto {
    private String id;
    private String url;
    private Integer width;
    private Integer height;
    
    @JsonProperty("breed_ids")
    @Singular("breedId")
    private List<String> breedIds;
    
    @Singular("breed")
    private List<BreedDto> breeds;
}
