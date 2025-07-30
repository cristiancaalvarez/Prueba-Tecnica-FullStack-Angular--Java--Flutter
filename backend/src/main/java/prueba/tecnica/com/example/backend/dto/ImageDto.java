package prueba.tecnica.com.example.backend.dto;

import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;

/**
 * DTO para representar información de una imagen de gato
 * Utiliza Lombok para generar automáticamente getters, setters, equals, hashCode, toString
 * y constructores usando el patrón Builder
 */
@Data
@Builder
@Jacksonized
public class ImageDto {
    private String id;
    private Integer width;
    private Integer height;
    private String url;
}
