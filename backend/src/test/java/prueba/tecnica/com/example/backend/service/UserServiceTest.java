package prueba.tecnica.com.example.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import prueba.tecnica.com.example.backend.dto.LoginRequestDto;
import prueba.tecnica.com.example.backend.dto.LoginResponseDto;
import prueba.tecnica.com.example.backend.dto.UserDto;
import prueba.tecnica.com.example.backend.entity.User;
import prueba.tecnica.com.example.backend.repository.UserRepository;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private User sampleUser;
    private UserDto sampleUserDto;

    @BeforeEach
    void setUp() {
        sampleUser = new User();
        sampleUser.setId(1L);
        sampleUser.setUsername("testuser");
        sampleUser.setEmail("test@example.com");
        sampleUser.setPassword("encodedPassword");
        sampleUser.setFirstName("Test");
        sampleUser.setLastName("User");

        sampleUserDto = UserDto.builder()
                .username("testuser")
                .email("test@example.com")
                .password("plainPassword")
                .firstName("Test")
                .lastName("User")
                .build();
    }

    @Test
    void register_ShouldReturnUserDto_WhenValidUserProvided() {
        // Arrange
        when(userRepository.existsByUsername(anyString())).thenReturn(false);
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(sampleUser);

        // Act
        UserDto result = userService.register(sampleUserDto);

        // Assert
        assertNotNull(result);
        assertEquals("testuser", result.getUsername());
        assertEquals("test@example.com", result.getEmail());
        assertEquals("Test", result.getFirstName());
        assertEquals("User", result.getLastName());
        assertNull(result.getPassword()); // Password should not be returned

        verify(userRepository, times(1)).existsByUsername("testuser");
        verify(userRepository, times(1)).existsByEmail("test@example.com");
        verify(passwordEncoder, times(1)).encode("plainPassword");
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void register_ShouldThrowException_WhenUsernameAlreadyExists() {
        // Arrange
        when(userRepository.existsByUsername(anyString())).thenReturn(true);

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.register(sampleUserDto);
        });

        assertEquals("El username ya está en uso", exception.getMessage());
        verify(userRepository, times(1)).existsByUsername("testuser");
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void register_ShouldThrowException_WhenEmailAlreadyExists() {
        // Arrange
        when(userRepository.existsByUsername(anyString())).thenReturn(false);
        when(userRepository.existsByEmail(anyString())).thenReturn(true);

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.register(sampleUserDto);
        });

        assertEquals("El email ya está en uso", exception.getMessage());
        verify(userRepository, times(1)).existsByEmail("test@example.com");
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void login_ShouldReturnLoginResponse_WhenValidCredentials() {
        // Arrange
        LoginRequestDto loginRequest = LoginRequestDto.builder()
                .username("testuser")
                .password("plainPassword")
                .build();
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(sampleUser));
        when(passwordEncoder.matches("plainPassword", "encodedPassword")).thenReturn(true);

        // Act
        LoginResponseDto result = userService.login(loginRequest);

        // Assert
        assertNotNull(result);
        assertNotNull(result.getToken());
        assertEquals("Bearer", result.getType());
        assertNotNull(result.getUser());
        assertEquals("testuser", result.getUser().getUsername());

        verify(userRepository, times(1)).findByUsername("testuser");
        verify(passwordEncoder, times(1)).matches("plainPassword", "encodedPassword");
    }

    @Test
    void login_ShouldThrowException_WhenUserNotFound() {
        // Arrange
        LoginRequestDto loginRequest = LoginRequestDto.builder()
                .username("nonexistent")
                .password("password")
                .build();
        when(userRepository.findByUsername("nonexistent")).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.login(loginRequest);
        });

        assertEquals("Usuario no encontrado", exception.getMessage());
        verify(userRepository, times(1)).findByUsername("nonexistent");
        verify(passwordEncoder, never()).matches(anyString(), anyString());
    }

    @Test
    void login_ShouldThrowException_WhenInvalidPassword() {
        // Arrange
        LoginRequestDto loginRequest = LoginRequestDto.builder()
                .username("testuser")
                .password("wrongPassword")
                .build();
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(sampleUser));
        when(passwordEncoder.matches("wrongPassword", "encodedPassword")).thenReturn(false);

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.login(loginRequest);
        });

        assertEquals("Contraseña incorrecta", exception.getMessage());
        verify(passwordEncoder, times(1)).matches("wrongPassword", "encodedPassword");
    }

    @Test
    void findByUsername_ShouldReturnUserDto_WhenUserExists() {
        // Arrange
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(sampleUser));

        // Act
        Optional<UserDto> result = userService.findByUsername("testuser");

        // Assert
        assertTrue(result.isPresent());
        assertEquals("testuser", result.get().getUsername());
        assertEquals("test@example.com", result.get().getEmail());
        assertNull(result.get().getPassword()); // Password should not be returned
    }

    @Test
    void findByUsername_ShouldReturnEmpty_WhenUserNotExists() {
        // Arrange
        when(userRepository.findByUsername("nonexistent")).thenReturn(Optional.empty());

        // Act
        Optional<UserDto> result = userService.findByUsername("nonexistent");

        // Assert
        assertFalse(result.isPresent());
    }
}
