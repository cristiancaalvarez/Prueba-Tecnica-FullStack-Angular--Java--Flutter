import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationService } from '../../core/services/pagination.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav aria-label="Paginación" *ngIf="totalPages > 1">
      <ul class="pagination justify-content-center mb-0">
        <!-- Botón Anterior -->
        <li class="page-item" [class.disabled]="currentPage === 1">
          <button 
            class="page-link" 
            (click)="goToPage(currentPage - 1)"
            [disabled]="currentPage === 1"
            aria-label="Página anterior">
            <i class="bi bi-chevron-left"></i>
            <span class="d-none d-sm-inline ms-1">Anterior</span>
          </button>
        </li>

        <!-- Primera página -->
        <li class="page-item" *ngIf="pageNumbers[0] > 1">
          <button class="page-link" (click)="goToPage(1)">1</button>
        </li>
        
        <!-- Puntos suspensivos inicio -->
        <li class="page-item disabled" *ngIf="pageNumbers[0] > 2">
          <span class="page-link">...</span>
        </li>

        <!-- Números de página -->
        <li 
          class="page-item" 
          *ngFor="let pageNum of pageNumbers"
          [class.active]="pageNum === currentPage">
          <button 
            class="page-link" 
            (click)="goToPage(pageNum)"
            [attr.aria-current]="pageNum === currentPage ? 'page' : null">
            {{ pageNum }}
          </button>
        </li>

        <!-- Puntos suspensivos final -->
        <li class="page-item disabled" *ngIf="pageNumbers[pageNumbers.length - 1] < totalPages - 1">
          <span class="page-link">...</span>
        </li>
        
        <!-- Última página -->
        <li class="page-item" *ngIf="pageNumbers[pageNumbers.length - 1] < totalPages">
          <button class="page-link" (click)="goToPage(totalPages)">{{ totalPages }}</button>
        </li>

        <!-- Botón Siguiente -->
        <li class="page-item" [class.disabled]="currentPage === totalPages">
          <button 
            class="page-link" 
            (click)="goToPage(currentPage + 1)"
            [disabled]="currentPage === totalPages"
            aria-label="Página siguiente">
            <span class="d-none d-sm-inline me-1">Siguiente</span>
            <i class="bi bi-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>

    <!-- Información de paginación -->
    <div class="pagination-info text-center mt-2" *ngIf="totalItems > 0">
      <small class="text-muted">
        Mostrando {{ startItem }} - {{ endItem }} de {{ totalItems }} resultados
        <span class="d-none d-md-inline"> | Página {{ currentPage }} de {{ totalPages }}</span>
      </small>
    </div>
  `,
  styles: [`
    .pagination {
      --bs-pagination-padding-x: 0.75rem;
      --bs-pagination-padding-y: 0.5rem;
      --bs-pagination-font-size: 0.875rem;
      --bs-pagination-color: #3f51b5;
      --bs-pagination-bg: #fff;
      --bs-pagination-border-width: 1px;
      --bs-pagination-border-color: #dee2e6;
      --bs-pagination-border-radius: 0.375rem;
      --bs-pagination-hover-color: #fff;
      --bs-pagination-hover-bg: #3f51b5;
      --bs-pagination-hover-border-color: #3f51b5;
      --bs-pagination-focus-color: #fff;
      --bs-pagination-focus-bg: #3f51b5;
      --bs-pagination-focus-box-shadow: 0 0 0 0.25rem rgba(63, 81, 181, 0.25);
      --bs-pagination-active-color: #fff;
      --bs-pagination-active-bg: #3f51b5;
      --bs-pagination-active-border-color: #3f51b5;
      --bs-pagination-disabled-color: #6c757d;
      --bs-pagination-disabled-bg: #fff;
      --bs-pagination-disabled-border-color: #dee2e6;
    }

    .page-link {
      transition: all 0.3s ease;
    }

    .page-link:hover {
      transform: translateY(-1px);
    }

    .page-item.active .page-link {
      font-weight: 600;
      box-shadow: 0 2px 4px rgba(63, 81, 181, 0.3);
    }

    .pagination-info {
      font-size: 0.875rem;
    }

    @media (max-width: 576px) {
      .pagination {
        --bs-pagination-padding-x: 0.5rem;
        --bs-pagination-padding-y: 0.375rem;
        --bs-pagination-font-size: 0.75rem;
      }
    }
  `]
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Output() pageChange = new EventEmitter<number>();

  pageNumbers: number[] = [];
  startItem: number = 0;
  endItem: number = 0;

  constructor(private paginationService: PaginationService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.updatePaginationInfo();
  }

  private updatePaginationInfo(): void {
    this.pageNumbers = this.paginationService.getPageNumbers(this.currentPage, this.totalPages);
    this.startItem = Math.min((this.currentPage - 1) * this.itemsPerPage + 1, this.totalItems);
    this.endItem = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
