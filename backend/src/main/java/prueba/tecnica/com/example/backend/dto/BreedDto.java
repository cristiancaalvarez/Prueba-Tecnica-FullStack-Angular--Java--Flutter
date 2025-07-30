package prueba.tecnica.com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;

/**
 * DTO para representar información de una raza de gato
 * Utiliza Lombok para generar automáticamente getters, setters, equals, hashCode, toString
 * y constructores usando el patrón Builder
 */
@Data
@Builder
@Jacksonized
public class BreedDto {
    
    private String id;
    private String name;
    private String description;
    private String temperament;
    private String origin;
    
    @JsonProperty("country_codes")
    private String countryCodes;
    
    @JsonProperty("country_code")
    private String countryCode;
    
    @JsonProperty("life_span")
    private String lifeSpan;
    
    @JsonProperty("indoor")
    private Integer indoor;
    
    @JsonProperty("lap")
    private Integer lap;
    
    @JsonProperty("alt_names")
    private String altNames;
    
    @JsonProperty("adaptability")
    private Integer adaptability;
    
    @JsonProperty("affection_level")
    private Integer affectionLevel;
    
    @JsonProperty("child_friendly")
    private Integer childFriendly;
    
    @JsonProperty("dog_friendly")
    private Integer dogFriendly;
    
    @JsonProperty("energy_level")
    private Integer energyLevel;
    
    @JsonProperty("grooming")
    private Integer grooming;
    
    @JsonProperty("health_issues")
    private Integer healthIssues;
    
    @JsonProperty("intelligence")
    private Integer intelligence;
    
    @JsonProperty("shedding_level")
    private Integer sheddingLevel;
    
    @JsonProperty("social_needs")
    private Integer socialNeeds;
    
    @JsonProperty("stranger_friendly")
    private Integer strangerFriendly;
    
    @JsonProperty("vocalisation")
    private Integer vocalisation;
    
    @JsonProperty("experimental")
    private Integer experimental;
    
    @JsonProperty("hairless")
    private Integer hairless;
    
    @JsonProperty("natural")
    private Integer natural;
    
    @JsonProperty("rare")
    private Integer rare;
    
    @JsonProperty("rex")
    private Integer rex;
    
    @JsonProperty("suppressed_tail")
    private Integer suppressedTail;
    
    @JsonProperty("short_legs")
    private Integer shortLegs;
    
    @JsonProperty("wikipedia_url")
    private String wikipediaUrl;
    
    @JsonProperty("hypoallergenic")
    private Integer hypoallergenic;
    
    @JsonProperty("reference_image_id")
    private String referenceImageId;
    
    private ImageDto image;
    
    @JsonProperty("cfa_url")
    private String cfaUrl;
    
    @JsonProperty("vetstreet_url")
    private String vetstreetUrl;
    
    @JsonProperty("vcahospitals_url")
    private String vcahospitalsUrl;
    
    private WeightDto weight;
}
