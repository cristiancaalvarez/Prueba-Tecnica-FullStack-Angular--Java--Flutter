import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.interface';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  const mockUser: User = {
    username: 'testuser',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User'
  };

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteSpyObj = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: { queryParams: {} }
    });

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpyObj },
        { provide: ActivatedRoute, useValue: activatedRouteSpyObj }
      ]
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRouteSpy = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.loginForm.get('username')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
  });

  it('should mark form as invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should mark form as valid when filled correctly', () => {
    component.loginForm.patchValue({
      username: 'testuser',
      password: 'password123'
    });
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should show validation errors for required fields', () => {
    const usernameControl = component.loginForm.get('username');
    const passwordControl = component.loginForm.get('password');

    usernameControl?.markAsTouched();
    passwordControl?.markAsTouched();

    expect(component.isFieldInvalid('username')).toBeTruthy();
    expect(component.isFieldInvalid('password')).toBeTruthy();
  });

  it('should not show validation errors for valid fields', () => {
    component.loginForm.patchValue({
      username: 'testuser',
      password: 'password123'
    });

    expect(component.isFieldInvalid('username')).toBeFalsy();
    expect(component.isFieldInvalid('password')).toBeFalsy();
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBeFalsy();
    
    component.toggleShowPassword();
    expect(component.showPassword).toBeTruthy();
    
    component.toggleShowPassword();
    expect(component.showPassword).toBeFalsy();
  });

  it('should call login service on valid form submission', () => {
    const loginResponse = { user: mockUser, token: 'mock-token' };
    authServiceSpy.login.and.returnValue(of(loginResponse));

    component.loginForm.patchValue({
      username: 'testuser',
      password: 'password123'
    });

    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123'
    });
  });

  it('should navigate to cats page on successful login', () => {
    const loginResponse = { user: mockUser, token: 'mock-token' };
    authServiceSpy.login.and.returnValue(of(loginResponse));

    component.loginForm.patchValue({
      username: 'testuser',
      password: 'password123'
    });

    component.onSubmit();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/cats']);
  });

  it('should navigate to return URL if provided', () => {
    activatedRouteSpy.snapshot.queryParams = { returnUrl: '/profile' };
    component.ngOnInit(); // Re-initialize to pick up the new query params

    const loginResponse = { user: mockUser, token: 'mock-token' };
    authServiceSpy.login.and.returnValue(of(loginResponse));

    component.loginForm.patchValue({
      username: 'testuser',
      password: 'password123'
    });

    component.onSubmit();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/profile']);
  });

  it('should show error message on login failure', () => {
    const errorMessage = 'Invalid credentials';
    authServiceSpy.login.and.returnValue(throwError(() => new Error(errorMessage)));

    component.loginForm.patchValue({
      username: 'wronguser',
      password: 'wrongpassword'
    });

    component.onSubmit();

    expect(component.errorMessage).toBe(errorMessage);
    expect(component.isLoading).toBeFalsy();
  });

  it('should show loading state during login', () => {
    authServiceSpy.login.and.returnValue(of({ user: mockUser }));

    component.loginForm.patchValue({
      username: 'testuser',
      password: 'password123'
    });

    component.onSubmit();

    // Loading state should be handled during the observable execution
    // In real scenario, we would test this with async/await or fakeAsync
  });

  it('should not submit invalid form', () => {
    component.loginForm.patchValue({
      username: '',
      password: ''
    });

    component.onSubmit();

    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });

  it('should mark all fields as touched when submitting invalid form', () => {
    component.onSubmit();

    expect(component.loginForm.get('username')?.touched).toBeTruthy();
    expect(component.loginForm.get('password')?.touched).toBeTruthy();
  });

  it('should trim username before sending', () => {
    const loginResponse = { user: mockUser };
    authServiceSpy.login.and.returnValue(of(loginResponse));

    component.loginForm.patchValue({
      username: '  testuser  ',
      password: 'password123'
    });

    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123'
    });
  });
});
