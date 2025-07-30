package prueba.tecnica.com.example.backend.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "cat.api")
@Data
public class CatApiProperties {
    private String baseUrl;
    private String key;
}
