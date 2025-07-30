import { Injectable } from '@angular/core';

export interface PaginationData<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  /**
   * Pagina un array de elementos
   * @param items Array de elementos a paginar
   * @param page Página actual (1-indexed)
   * @param itemsPerPage Elementos por página
   * @returns Datos de paginación
   */
  paginate<T>(items: T[], page: number = 1, itemsPerPage: number = 10): PaginationData<T> {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentPage = Math.max(1, Math.min(page, totalPages));
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    
    const paginatedItems = items.slice(startIndex, endIndex);
    
    return {
      items: paginatedItems,
      totalItems,
      totalPages,
      currentPage,
      itemsPerPage,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1
    };
  }

  /**
   * Genera un array de números de página para mostrar en la paginación
   * @param currentPage Página actual
   * @param totalPages Total de páginas
   * @param maxVisible Máximo número de páginas visibles
   * @returns Array de números de página
   */
  getPageNumbers(currentPage: number, totalPages: number, maxVisible: number = 5): number[] {
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
}
