import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CatService } from './cat.service';
import { CatBreed, CatImage } from '../models/cat.interface';

describe('CatService', () => {
  let service: CatService;
  let httpMock: HttpTestingController;
  const CATS_API_URL = 'http://localhost:8080/api/gatos';
  const IMAGES_API_URL = 'http://localhost:8080/api/imagenes';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CatService]
    });
    service = TestBed.inject(CatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all breeds', () => {
    const mockBreeds: CatBreed[] = [
      {
        id: 'abys',
        name: 'Abyssinian',
        origin: 'Egypt',
        intelligence: 5
      },
      {
        id: 'siam',
        name: 'Siamese',
        origin: 'Thailand',
        intelligence: 5
      }
    ];

    service.getAllBreeds().subscribe(breeds => {
      expect(breeds).toEqual(mockBreeds);
      expect(breeds.length).toBe(2);
    });

    const req = httpMock.expectOne(`${CATS_API_URL}/breeds`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBreeds);
  });

  it('should get breed by ID', () => {
    const breedId = 'abys';
    const mockBreed: CatBreed = {
      id: 'abys',
      name: 'Abyssinian',
      origin: 'Egypt',
      intelligence: 5,
      description: 'A beautiful cat breed'
    };

    service.getBreedById(breedId).subscribe(breed => {
      expect(breed).toEqual(mockBreed);
    });

    const req = httpMock.expectOne(`${CATS_API_URL}/breeds/${breedId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBreed);
  });

  it('should search breeds', () => {
    const query = 'siamese';
    const mockBreeds: CatBreed[] = [
      {
        id: 'siam',
        name: 'Siamese',
        origin: 'Thailand',
        intelligence: 5
      }
    ];

    service.searchBreeds(query).subscribe(breeds => {
      expect(breeds).toEqual(mockBreeds);
    });

    const req = httpMock.expectOne(`${CATS_API_URL}/breeds/search?q=${query}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBreeds);
  });

  it('should get images by breed ID', () => {
    const breedId = 'abys';
    const limit = 5;
    const mockImages: CatImage[] = [
      {
        id: 'img1',
        url: 'http://example.com/cat1.jpg',
        width: 500,
        height: 400
      },
      {
        id: 'img2',
        url: 'http://example.com/cat2.jpg',
        width: 600,
        height: 450
      }
    ];

    service.getImagesByBreedId(breedId, limit).subscribe(images => {
      expect(images).toEqual(mockImages);
      expect(images.length).toBe(2);
    });

    const req = httpMock.expectOne(`${IMAGES_API_URL}/imagesbybreedid?breedId=${breedId}&limit=${limit}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockImages);
  });

  it('should get random images', () => {
    const limit = 3;
    const mockImages: CatImage[] = [
      {
        id: 'img1',
        url: 'http://example.com/random1.jpg',
        width: 500,
        height: 400
      }
    ];

    service.getRandomImages(limit).subscribe(images => {
      expect(images).toEqual(mockImages);
    });

    const req = httpMock.expectOne(`${IMAGES_API_URL}/random?limit=${limit}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockImages);
  });

  it('should filter breeds correctly', () => {
    const breeds: CatBreed[] = [
      {
        id: 'abys',
        name: 'Abyssinian',
        origin: 'Egypt',
        temperament: 'Active, Energetic',
        description: 'Ancient breed'
      },
      {
        id: 'siam',
        name: 'Siamese',
        origin: 'Thailand',
        temperament: 'Vocal, Social',
        description: 'Talkative breed'
      },
      {
        id: 'pers',
        name: 'Persian',
        origin: 'Iran',
        temperament: 'Calm, Quiet',
        description: 'Long-haired breed'
      }
    ];

    // Test filtering by name
    let filtered = service.filterBreeds(breeds, 'siamese');
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('Siamese');

    // Test filtering by origin
    filtered = service.filterBreeds(breeds, 'egypt');
    expect(filtered.length).toBe(1);
    expect(filtered[0].origin).toBe('Egypt');

    // Test filtering by temperament
    filtered = service.filterBreeds(breeds, 'vocal');
    expect(filtered.length).toBe(1);
    expect(filtered[0].temperament).toContain('Vocal');

    // Test case insensitive
    filtered = service.filterBreeds(breeds, 'PERSIAN');
    expect(filtered.length).toBe(1);

    // Test empty search
    filtered = service.filterBreeds(breeds, '');
    expect(filtered.length).toBe(3);

    // Test no matches
    filtered = service.filterBreeds(breeds, 'nonexistent');
    expect(filtered.length).toBe(0);
  });

  it('should get level description correctly', () => {
    expect(service.getLevelDescription(1)).toBe('Muy bajo');
    expect(service.getLevelDescription(2)).toBe('Bajo');
    expect(service.getLevelDescription(3)).toBe('Medio');
    expect(service.getLevelDescription(4)).toBe('Alto');
    expect(service.getLevelDescription(5)).toBe('Muy alto');
    expect(service.getLevelDescription(0)).toBe('No especificado');
  });

  it('should get level badge class correctly', () => {
    expect(service.getLevelBadgeClass(1)).toBe('badge-danger');
    expect(service.getLevelBadgeClass(2)).toBe('badge-warning');
    expect(service.getLevelBadgeClass(3)).toBe('badge-info');
    expect(service.getLevelBadgeClass(4)).toBe('badge-primary');
    expect(service.getLevelBadgeClass(5)).toBe('badge-success');
    expect(service.getLevelBadgeClass(0)).toBe('badge-secondary');
  });

  it('should get breed characteristics', () => {
    const breed: CatBreed = {
      id: 'test',
      name: 'Test Breed',
      adaptability: 4,
      affection_level: 5,
      child_friendly: 3,
      dog_friendly: 2,
      energy_level: 4,
      intelligence: 5,
      social_needs: 3,
      stranger_friendly: 2
    };

    const characteristics = service.getBreedCharacteristics(breed);

    expect(characteristics.adaptability).toBe(4);
    expect(characteristics.affectionLevel).toBe(5);
    expect(characteristics.childFriendly).toBe(3);
    expect(characteristics.dogFriendly).toBe(2);
    expect(characteristics.energyLevel).toBe(4);
    expect(characteristics.intelligence).toBe(5);
    expect(characteristics.socialNeeds).toBe(3);
    expect(characteristics.strangerFriendly).toBe(2);
  });

  it('should handle undefined characteristics', () => {
    const breed: CatBreed = {
      id: 'test',
      name: 'Test Breed'
    };

    const characteristics = service.getBreedCharacteristics(breed);

    expect(characteristics.adaptability).toBe(0);
    expect(characteristics.affectionLevel).toBe(0);
    expect(characteristics.childFriendly).toBe(0);
    expect(characteristics.dogFriendly).toBe(0);
    expect(characteristics.energyLevel).toBe(0);
    expect(characteristics.intelligence).toBe(0);
    expect(characteristics.socialNeeds).toBe(0);
    expect(characteristics.strangerFriendly).toBe(0);
  });
});
