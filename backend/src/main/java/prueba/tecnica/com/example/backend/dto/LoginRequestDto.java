package prueba.tecnica.com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;

/**
 * DTO para solicitudes de autenticación (login)
 * Incluye validaciones para campos requeridos
 */
@Data
@Builder
@Jacksonized
public class LoginRequestDto {
    @NotBlank(message = "El username es requerido")
    private String username;
    
    @NotBlank(message = "La contraseña es requerida")
    private String password;
}
