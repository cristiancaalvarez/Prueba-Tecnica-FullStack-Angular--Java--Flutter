package prueba.tecnica.com.example.backend.dto;

import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;

/**
 * DTO para representar información del peso de una raza de gato
 * Contiene medidas en sistema imperial y métrico
 */
@Data
@Builder
@Jacksonized
public class WeightDto {
    private String imperial;
    private String metric;
}
