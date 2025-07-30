import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { CatBreed, CatImage } from '../models/cat.interface';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private readonly apiUrl = 'http://localhost:8080/api';
  
  private breedsCache: CatBreed[] = [];
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllBreeds(): Observable<CatBreed[]> {
    if (this.breedsCache.length > 0) {
      return of(this.breedsCache);
    }

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.http.get<CatBreed[]>(`${this.apiUrl}/gatos/breeds`).pipe(
      tap(breeds => {
        this.breedsCache = breeds;
        this.loadingSubject.next(false);
      }),
      catchError(error => {
        this.errorSubject.next('Error al cargar las razas de gatos');
        this.loadingSubject.next(false);
        console.error('Error fetching breeds:', error);
        return of([]);
      })
    );
  }

  getBreedById(id: string): Observable<CatBreed | undefined> {
    return this.http.get<CatBreed>(`${this.apiUrl}/gatos/breeds/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching breed by id:', error);
        return of(undefined);
      })
    );
  }

  searchBreeds(query: string): Observable<CatBreed[]> {
    return this.http.get<CatBreed[]>(`${this.apiUrl}/gatos/breeds/search`, {
      params: { q: query }
    }).pipe(
      catchError(error => {
        console.error('Error searching breeds:', error);
        return of([]);
      })
    );
  }

  getImagesByBreedId(breedId: string, limit: number = 8): Observable<CatImage[]> {
    return this.http.get<CatImage[]>(`${this.apiUrl}/imagenes/imagesbybreedid`, {
      params: {
        breedId: breedId,
        limit: limit.toString()
      }
    }).pipe(
      catchError(error => {
        console.error('Error fetching breed images:', error);
        return of([]);
      })
    );
  }

  getRandomImages(limit: number = 10): Observable<CatImage[]> {
    return this.http.get<CatImage[]>(`${this.apiUrl}/imagenes/random`, {
      params: {
        limit: limit.toString()
      }
    }).pipe(
      catchError(error => {
        console.error('Error fetching random images:', error);
        return of([]);
      })
    );
  }

  clearCache(): void {
    this.breedsCache = [];
  }
}
