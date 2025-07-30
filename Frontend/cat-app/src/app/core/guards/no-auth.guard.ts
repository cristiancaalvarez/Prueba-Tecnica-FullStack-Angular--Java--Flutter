import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Determina si una ruta puede ser activada para usuarios no autenticados
   * Redirige al dashboard si el usuario ya está autenticado
   * @returns Observable<boolean> que indica si la ruta puede ser activada
   */
  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn$.pipe(
      take(1),
      map(isLoggedIn => {
        if (!isLoggedIn) {
          return true;
        } else {
          // Redirige al dashboard si ya está autenticado
          this.router.navigate(['/cats']);
          return false;
        }
      })
    );
  }
}
