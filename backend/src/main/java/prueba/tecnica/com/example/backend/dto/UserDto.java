package prueba.tecnica.com.example.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;

/**
 * DTO para transferencia de datos de usuario con validaciones
 * Incluye validaciones Jakarta Bean Validation para entrada de datos
 * Utiliza Lombok Builder para construcción fluida
 */
@Data
@Builder
@Jacksonized
public class UserDto {
    private Long id;
    
    @NotBlank(message = "El username es requerido")
    @Size(min = 3, max = 50, message = "El username debe tener entre 3 y 50 caracteres")
    private String username;
    
    @NotBlank(message = "El email es requerido")
    @Email(message = "El email debe tener un formato válido")
    private String email;
    
    @NotBlank(message = "La contraseña es requerida")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    private String password;
    
    private String firstName;
    private String lastName;
}
