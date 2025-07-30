import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ErrorMessageComponent } from '../../shared/components/error-message.component';

@Component({
  selector: 'app-register',
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
        <div class="col-md-8 col-lg-6">
          <div class="card shadow-custom border-radius-custom">
            <div class="card-body p-5">
              <div class="text-center mb-4">
                <i class="bi bi-person-plus-fill text-primary-custom" style="font-size: 3rem;"></i>
                <h2 class="mt-3 text-primary-custom">Crear Cuenta</h2>
                <p class="text-muted">Únete a Cat App y descubre el mundo felino</p>
              </div>

              <app-error-message 
                [message]="errorMessage" 
                (dismissed)="errorMessage = ''">
              </app-error-message>

              <div *ngIf="successMessage" class="alert alert-success" role="alert">
                <i class="bi bi-check-circle-fill me-2"></i>
                {{ successMessage }}
              </div>

              <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="firstName" class="form-label">
                      <i class="bi bi-person me-2"></i>Nombre
                    </label>
                    <input 
                      type="text" 
                      class="form-control"
                      id="firstName"
                      formControlName="firstName"
                      [class.is-invalid]="isFieldInvalid('firstName')"
                      placeholder="Tu nombre">
                    <div class="invalid-feedback" *ngIf="isFieldInvalid('firstName')">
                      El nombre es requerido.
                    </div>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="lastName" class="form-label">
                      <i class="bi bi-person me-2"></i>Apellido
                    </label>
                    <input 
                      type="text" 
                      class="form-control"
                      id="lastName"
                      formControlName="lastName"
                      [class.is-invalid]="isFieldInvalid('lastName')"
                      placeholder="Tu apellido">
                    <div class="invalid-feedback" *ngIf="isFieldInvalid('lastName')">
                      El apellido es requerido.
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="username" class="form-label">
                    <i class="bi bi-at me-2"></i>Nombre de Usuario
                  </label>
                  <input 
                    type="text" 
                    class="form-control"
                    id="username"
                    formControlName="username"
                    [class.is-invalid]="isFieldInvalid('username')"
                    placeholder="Elige tu nombre de usuario">
                  <div class="invalid-feedback" *ngIf="isFieldInvalid('username')">
                    <span *ngIf="registerForm.get('username')?.errors?.['required']">
                      El nombre de usuario es requerido.
                    </span>
                    <span *ngIf="registerForm.get('username')?.errors?.['minlength']">
                      El nombre de usuario debe tener al menos 3 caracteres.
                    </span>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label">
                    <i class="bi bi-envelope me-2"></i>Correo Electrónico
                  </label>
                  <input 
                    type="email" 
                    class="form-control"
                    id="email"
                    formControlName="email"
                    [class.is-invalid]="isFieldInvalid('email')"
                    placeholder="tu@email.com">
                  <div class="invalid-feedback" *ngIf="isFieldInvalid('email')">
                    <span *ngIf="registerForm.get('email')?.errors?.['required']">
                      El correo electrónico es requerido.
                    </span>
                    <span *ngIf="registerForm.get('email')?.errors?.['email']">
                      Ingresa un correo electrónico válido.
                    </span>
                  </div>
                </div>

                <div class="mb-3">
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
                      placeholder="Crea una contraseña segura">
                    <button 
                      class="btn btn-outline-secondary" 
                      type="button"
                      (click)="toggleShowPassword()">
                      <i [class]="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                    </button>
                  </div>
                  <div class="invalid-feedback" *ngIf="isFieldInvalid('password')">
                    <span *ngIf="registerForm.get('password')?.errors?.['required']">
                      La contraseña es requerida.
                    </span>
                    <span *ngIf="registerForm.get('password')?.errors?.['minlength']">
                      La contraseña debe tener al menos 6 caracteres.
                    </span>
                  </div>
                </div>

                <div class="mb-4">
                  <label for="confirmPassword" class="form-label">
                    <i class="bi bi-lock-fill me-2"></i>Confirmar Contraseña
                  </label>
                  <input 
                    type="password" 
                    class="form-control"
                    id="confirmPassword"
                    formControlName="confirmPassword"
                    [class.is-invalid]="isFieldInvalid('confirmPassword')"
                    placeholder="Confirma tu contraseña">
                  <div class="invalid-feedback" *ngIf="isFieldInvalid('confirmPassword')">
                    <span *ngIf="registerForm.get('confirmPassword')?.errors?.['required']">
                      Confirma tu contraseña.
                    </span>
                    <span *ngIf="registerForm.get('confirmPassword')?.errors?.['passwordMismatch']">
                      Las contraseñas no coinciden.
                    </span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  class="btn btn-primary w-100 py-2"
                  [disabled]="registerForm.invalid || isLoading">
                  <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                  <i class="bi bi-person-plus me-2" *ngIf="!isLoading"></i>
                  {{ isLoading ? 'Creando cuenta...' : 'Crear Cuenta' }}
                </button>
              </form>

              <div class="text-center mt-4">
                <p class="text-muted">
                  ¿Ya tienes una cuenta? 
                  <a routerLink="/auth/login" class="text-primary-custom text-decoration-none">
                    Inicia sesión aquí
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
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const userData = {
        firstName: this.registerForm.value.firstName.trim(),
        lastName: this.registerForm.value.lastName.trim(),
        username: this.registerForm.value.username.trim(),
        email: this.registerForm.value.email.trim(),
        password: this.registerForm.value.password
      };

      this.authService.register(userData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = 'Cuenta creada exitosamente. Puedes iniciar sesión ahora.';
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 2000);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Error al crear la cuenta. Intente nuevamente.';
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
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      if (confirmPassword?.errors?.['passwordMismatch']) {
        delete confirmPassword.errors['passwordMismatch'];
        if (Object.keys(confirmPassword.errors).length === 0) {
          confirmPassword.setErrors(null);
        }
      }
      return null;
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }
}
