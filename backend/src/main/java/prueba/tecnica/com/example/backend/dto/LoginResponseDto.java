package prueba.tecnica.com.example.backend.dto;

import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;

/**
 * DTO para respuestas de autenticación exitosa
 * Incluye token JWT y datos del usuario autenticado
 */
@Data
@Builder
@Jacksonized
public class LoginResponseDto {
    private String token;
    
    @Builder.Default
    private String type = "Bearer";
    
    private UserDto user;
}
