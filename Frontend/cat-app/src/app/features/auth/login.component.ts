import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ErrorMessageComponent } from '../../shared/components/error-message.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule,
    ErrorMessageComponent
  ],
  template: `
    <div class="container-fluid vh-100 bg-light">
      <div class="row h-100 justify-content-center align-items-center">
        <div class="col-md-6 col-lg-4">
          <div class="card shadow-custom border-radius-custom">
            <div class="card-body p-5">
              <div class="text-center mb-4">
                <i class="bi bi-heart-fill text-primary-custom" style="font-size: 3rem;"></i>
                <h2 class="mt-3 text-primary-custom">Iniciar Sesión</h2>
                <p class="text-muted">Ingresa a tu cuenta de Cat App</p>
              </div>

              <app-error-message 
                [message]="errorMessage" 
                (dismissed)="errorMessage = ''">
              </app-error-message>

              <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="username" class="form-label">
                    <i class="bi bi-person me-2"></i>Usuario
                  </label>
                  <input 
                    type="text" 
                    class="form-control"
                    id="username"
                    formControlName="username"
                    [class.is-invalid]="isFieldInvalid('username')"
                    placeholder="Ingresa tu nombre de usuario">
                  <div class="invalid-feedback" *ngIf="isFieldInvalid('username')">
                    El nombre de usuario es requerido.
                  </div>
                </div>

                <div class="mb-4">
                  <label for="password" class="form-label">
                    <i class="bi bi-lock me-2"></i>Contraseña
                  </label>
                  <div class="input-group">
                    <input 
                      [type]="showPassword ? 'text' : 'password'" 
                      class="form-control"
                      id="password"
                      formControlName="password"
                      [class.is-invalid]="isFieldInvalid('password')"
                      placeholder="Ingresa tu contraseña">
                    <button 
                      class="btn btn-outline-secondary" 
                      type="button"
                      (click)="toggleShowPassword()">
                      <i [class]="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                    </button>
                  </div>
                  <div class="invalid-feedback" *ngIf="isFieldInvalid('password')">
                    La contraseña es requerida.
                  </div>
                </div>

                <button 
                  type="submit" 
                  class="btn btn-primary w-100 py-2"
                  [disabled]="loginForm.invalid || isLoading">
                  <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                  <i class="bi bi-box-arrow-in-right me-2" *ngIf="!isLoading"></i>
                  {{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
                </button>
              </form>

              <div class="text-center mt-4">
                <p class="text-muted">
                  ¿No tienes una cuenta? 
                  <a routerLink="/auth/register" class="text-primary-custom text-decoration-none">
                    Regístrate aquí
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      border: none;
    }
    
    .form-control:focus {
      border-color: #3f51b5;
      box-shadow: 0 0 0 0.2rem rgba(63, 81, 181, 0.25);
    }
    
    .btn-primary {
      background-color: #3f51b5;
      border-color: #3f51b5;
      font-weight: 500;
    }
    
    .btn-primary:hover {
      background-color: #303f9f;
      border-color: #303f9f;
      transform: translateY(-1px);
      transition: all 0.3s ease;
    }
    
    .input-group .btn-outline-secondary {
      border-left: none;
    }
    
    .input-group .form-control {
      border-right: none;
    }
    
    .input-group .form-control:focus {
      box-shadow: none;
      border-color: #ced4da;
    }
    
    .input-group .form-control:focus + .btn-outline-secondary {
      border-color: #3f51b5;
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;
  returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Obtener la URL de retorno de los query params
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/cats';
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const loginData = {
        username: this.loginForm.value.username.trim(),
        password: this.loginForm.value.password
      };

      this.authService.login(loginData).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.user) {
            // Login exitoso - redirigir
            this.router.navigate([this.returnUrl]);
          } else {
            this.errorMessage = response.message || 'Error en el inicio de sesión';
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Error al iniciar sesión. Verifique sus credenciales.';
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }
}
