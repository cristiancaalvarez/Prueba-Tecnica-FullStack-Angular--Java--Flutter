import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { CatService } from '../../core/services/cat.service';
import { PaginationService } from '../../core/services/pagination.service';
import { PaginationComponent } from '../../shared/components/pagination.component';
import { CatBreed, CatImage } from '../../core/models/cat.interface';
import { PaginationData } from '../../core/models/pagination.interface';

@Component({
  selector: 'app-cats',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css']
})
export class CatsComponent implements OnInit {
  // Datos básicos
  cats: CatBreed[] = [];
  filteredCats: CatBreed[] = [];
  selectedBreed: CatBreed | null = null;
  selectedBreedId: string = '';
  carouselImages: CatImage[] = [];
  breedImages: CatImage[] = []; // Para la vista detallada
  
  // Control de vistas
  currentView: 'detail' | 'table' = 'detail';
  
  // Estados
  loading = false;
  isLoading = false; // Alias para el template
  
  // Búsqueda y paginación
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 10;
  totalResults = 0;
  totalPages = 0;
  paginatedCats: PaginationData<CatBreed> | null = null;

  constructor(
    private authService: AuthService,
    private catService: CatService,
    private paginationService: PaginationService
  ) {}

  ngOnInit() {
    this.loadAllBreeds();
  }

  // Verificación de autenticación
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn$ ? true : false;
  }

  // Cambio de vista
  switchView(view: 'detail' | 'table') {
    this.currentView = view;
    
    if (view === 'table' && this.filteredCats.length === 0) {
      this.filteredCats = [...this.cats];
      this.updatePagination();
    }
  }

  // Carga inicial de razas
  loadAllBreeds() {
    this.loading = true;
    this.isLoading = true;
    
    this.catService.getAllBreeds().subscribe({
      next: (breeds) => {
        this.cats = breeds;
        this.filteredCats = [...this.cats];
        this.updatePagination();
        this.loading = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading breeds:', error);
        this.loading = false;
        this.isLoading = false;
      }
    });
  }

  // Selección de raza desde dropdown
  onBreedSelect() {
    if (!this.selectedBreedId) {
      this.selectedBreed = null;
      this.carouselImages = [];
      this.breedImages = [];
      return;
    }

    this.loading = true;
    this.isLoading = true;
    
    // Encontrar la raza seleccionada
    this.selectedBreed = this.cats.find(cat => cat.id === this.selectedBreedId) || null;
    
    // Cargar imágenes de la raza
    this.catService.getImagesByBreedId(this.selectedBreedId).subscribe({
      next: (images) => {
        this.carouselImages = images;
        this.breedImages = images; // Sincronizar para la vista detallada
        this.loading = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading breed images:', error);
        this.carouselImages = [];
        this.breedImages = [];
        this.loading = false;
        this.isLoading = false;
      }
    });
  }

  // Carga de imágenes aleatorias
  loadRandomImages() {
    this.loading = true;
    this.catService.getRandomImages(8).subscribe({
      next: (images) => {
        this.carouselImages = images;
        this.selectedBreed = null;
        this.selectedBreedId = '';
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading random images:', error);
        this.loading = false;
      }
    });
  }

  // Búsqueda de razas
  performSearch() {
    if (!this.searchTerm.trim()) {
      this.filteredCats = [...this.cats];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredCats = this.cats.filter(cat => 
        cat.name.toLowerCase().includes(term) ||
        cat.origin?.toLowerCase().includes(term) ||
        cat.temperament?.toLowerCase().includes(term)
      );
    }
    
    this.currentPage = 1;
    this.updatePagination();
  }

  // Limpiar búsqueda
  clearSearch() {
    this.searchTerm = '';
    this.filteredCats = [...this.cats];
    this.currentPage = 1;
    this.updatePagination();
  }

  // Selección desde tabla
  selectBreedFromTable(breed: CatBreed) {
    this.selectedBreedId = breed.id;
    this.selectedBreed = breed;
    this.switchView('detail');
    this.onBreedSelect();
  }

  // Actualizar paginación
  updatePagination() {
    this.totalResults = this.filteredCats.length;
    this.totalPages = Math.ceil(this.totalResults / this.itemsPerPage);
    
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const items = this.filteredCats.slice(startIndex, endIndex);
    
    this.paginatedCats = {
      items: items,
      totalPages: this.totalPages,
      totalItems: this.totalResults,
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage
    };
    
    // Sincronizar estados de carga
    this.isLoading = this.loading;
  }

  // Método para manejar cambio de página
  onPageChange(page: number) {
    this.goToPage(page);
  }

  // Método para seleccionar gato desde tabla (alias)
  selectCatForDetail(cat: CatBreed) {
    this.selectBreedFromTable(cat);
  }

  // Ir a página específica
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  // Obtener números de páginas para mostrar
  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }
}
