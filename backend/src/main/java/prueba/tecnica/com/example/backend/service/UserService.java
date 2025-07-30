package prueba.tecnica.com.example.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import prueba.tecnica.com.example.backend.dto.LoginRequestDto;
import prueba.tecnica.com.example.backend.dto.LoginResponseDto;
import prueba.tecnica.com.example.backend.dto.UserDto;
import prueba.tecnica.com.example.backend.entity.User;
import prueba.tecnica.com.example.backend.repository.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    /**
     * Registra un nuevo usuario
     */
    public UserDto register(UserDto userDto) {
        log.info("Registrando nuevo usuario: {}", userDto.getUsername());
        
        // Verificar si el usuario ya existe
        if (userRepository.existsByUsername(userDto.getUsername())) {
            throw new RuntimeException("El username ya está en uso");
        }
        
        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new RuntimeException("El email ya está en uso");
        }
        
        // Crear nueva entidad User
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        
        // Guardar usuario
        User savedUser = userRepository.save(user);
        
        // Convertir a DTO (sin contraseña)
        return convertToDto(savedUser);
    }
    
    /**
     * Autentica un usuario
     */
    public LoginResponseDto login(LoginRequestDto loginRequest) {
        log.info("Intentando autenticar usuario: {}", loginRequest.getUsername());
        
        // Buscar usuario
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());
        
        if (userOptional.isEmpty()) {
            throw new RuntimeException("Usuario no encontrado");
        }
        
        User user = userOptional.get();
        
        // Verificar contraseña
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }
        
        // Generar token simple (en un proyecto real usarías JWT)
        String token = generateSimpleToken(user);
        
        UserDto userDto = convertToDto(user);
        
        return LoginResponseDto.builder()
                .token(token)
                .user(userDto)
                .build();
    }
    
    /**
     * Busca un usuario por username
     */
    public Optional<UserDto> findByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(this::convertToDto);
    }
    
    /**
     * Convierte una entidad User a UserDto
     */
    private UserDto convertToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                // No incluir la contraseña en el DTO
                .build();
    }
    
    /**
     * Genera un token simple (en producción se debería usar JWT)
     */
    private String generateSimpleToken(User user) {
        // Token simplificado para este ejemplo
        // En producción se debería usar JWT con expiración, claims, etc.
        return "token_" + user.getId() + "_" + System.currentTimeMillis();
    }
}
