import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.interface';
import { LoadingComponent } from '../../shared/components/loading.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  template: `
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card shadow-custom border-radius-custom">
            <div class="card-header bg-primary-custom text-white text-center py-4">
              <i class="bi bi-person-circle" style="font-size: 4rem;"></i>
              <h3 class="mt-3 mb-0">Mi Perfil</h3>
            </div>
            
            <div class="card-body p-4" *ngIf="currentUser; else loadingTemplate">
              <div class="row mb-4">
                <div class="col-md-6">
                  <div class="info-item">
                    <label class="info-label">
                      <i class="bi bi-person-fill me-2 text-primary-custom"></i>
                      Nombre
                    </label>
                    <p class="info-value">{{ currentUser.firstName }}</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="info-item">
                    <label class="info-label">
                      <i class="bi bi-person-fill me-2 text-primary-custom"></i>
                      Apellido
                    </label>
                    <p class="info-value">{{ currentUser.lastName }}</p>
                  </div>
                </div>
              </div>

              <div class="row mb-4">
                <div class="col-md-6">
                  <div class="info-item">
                    <label class="info-label">
                      <i class="bi bi-at me-2 text-primary-custom"></i>
                      Usuario
                    </label>
                    <p class="info-value">{{ currentUser.username }}</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="info-item">
                    <label class="info-label">
                      <i class="bi bi-envelope-fill me-2 text-primary-custom"></i>
                      Email
                    </label>
                    <p class="info-value">{{ currentUser.email }}</p>
                  </div>
                </div>
              </div>

              <div class="text-center mt-4">
                <div class="alert alert-info" role="alert">
                  <i class="bi bi-info-circle-fill me-2"></i>
                  <strong>¡Bienvenido a Cat App!</strong> 
                  Disfruta explorando las diferentes razas de gatos.
                </div>
              </div>
            </div>

            <ng-template #loadingTemplate>
              <div class="card-body">
                <app-loading message="Cargando información del perfil..."></app-loading>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .info-item {
      margin-bottom: 1.5rem;
    }
    
    .info-label {
      font-weight: 600;
      color: #6c757d;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 0.5rem;
      display: block;
    }
    
    .info-value {
      font-size: 1.1rem;
      color: #495057;
      margin: 0;
      padding: 0.75rem 1rem;
      background-color: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #3f51b5;
    }
    
    .card-header {
      border-radius: 12px 12px 0 0 !important;
    }
    
    .alert-info {
      border-color: #3f51b5;
      background-color: rgba(63, 81, 181, 0.1);
      color: #3f51b5;
    }
    
    .bi-person-circle {
      color: rgba(255, 255, 255, 0.9);
    }
  `]
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  isLoading = true;
  errorMessage = '';
  private destroy$ = new Subject<void>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadUserProfile(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user) => {
          this.currentUser = user;
          this.isLoading = false;
          
          // Si el usuario actual no está completo, intentar obtenerlo del servidor
          if (user && !user.email) {
            this.fetchUserFromServer(user.username);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Error al cargar la información del perfil';
          console.error('Error loading user profile:', error);
        }
      });
  }

  private fetchUserFromServer(username: string): void {
    this.authService.getUserByUsername(username)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user) => {
          this.currentUser = user;
        },
        error: (error) => {
          console.error('Error fetching user from server:', error);
          // No mostrar error al usuario, ya que los datos básicos están disponibles
        }
      });
  }
}
