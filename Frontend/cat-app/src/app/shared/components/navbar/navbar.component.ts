import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.interface';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inicialización si es necesaria
  }

  /**
   * Cierra sesión del usuario actual
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  /**
   * Navega a la página de perfil del usuario
   */
  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  /**
   * Navega a la página de configuración
   */
  goToSettings(): void {
    this.router.navigate(['/settings']);
  }

  /**
   * Verifica si el usuario está autenticado
   */
  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  /**
   * Obtiene el nombre completo del usuario actual
   */
  get currentUserName(): string {
    const user = this.authService.getCurrentUser();
    if (user) {
      const fullName = `${user.firstName} ${user.lastName}`.trim();
      return fullName || user.username || user.email;
    }
    return 'Usuario';
  }

  /**
   * Obtiene el email del usuario actual
   */
  get currentUserEmail(): string {
    const user = this.authService.getCurrentUser();
    return user ? user.email : '';
  }

  /**
   * Obtiene las iniciales del usuario para mostrar en el avatar
   */
  get userInitials(): string {
    const user = this.authService.getCurrentUser();
    if (user) {
      if (user.firstName && user.lastName) {
        return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
      }
      if (user.firstName) {
        return user.firstName.substring(0, 2).toUpperCase();
      }
      if (user.username) {
        return user.username.substring(0, 2).toUpperCase();
      }
      return user.email[0].toUpperCase();
    }
    return 'U';
  }
}
