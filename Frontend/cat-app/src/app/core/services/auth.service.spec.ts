import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { User, LoginRequest, RegisterRequest } from '../models/user.interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const API_URL = 'http://localhost:8080/api/usuarios';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login user successfully', () => {
    const loginRequest: LoginRequest = {
      username: 'testuser',
      password: 'password123'
    };

    const mockUser: User = {
      username: 'testuser',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User'
    };

    const mockResponse = {
      user: mockUser,
      token: 'mock-token'
    };

    service.login(loginRequest).subscribe(response => {
      expect(response.user).toEqual(mockUser);
      expect(response.token).toBe('mock-token');
    });

    const req = httpMock.expectOne(`${API_URL}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(loginRequest);
    req.flush(mockResponse);
  });

  it('should register user successfully', () => {
    const registerRequest: RegisterRequest = {
      username: 'newuser',
      email: 'new@example.com',
      password: 'password123',
      firstName: 'New',
      lastName: 'User'
    };

    const mockResponse = {
      message: 'User registered successfully'
    };

    service.register(registerRequest).subscribe(response => {
      expect(response.message).toBe('User registered successfully');
    });

    const req = httpMock.expectOne(`${API_URL}/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(registerRequest);
    req.flush(mockResponse);
  });

  it('should get user by username', () => {
    const username = 'testuser';
    const mockUser: User = {
      username: 'testuser',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User'
    };

    service.getUserByUsername(username).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${API_URL}/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should logout user', () => {
    // Setup logged in state
    const mockUser: User = {
      username: 'testuser',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User'
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', 'mock-token');

    service.logout();

    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
    expect(service.getCurrentUser()).toBeNull();
    expect(service.isAuthenticated()).toBeFalsy();
  });

  it('should check authentication state on init', () => {
    const mockUser: User = {
      username: 'testuser',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User'
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', 'mock-token');

    // Create new service instance to test initialization
    const newService = new AuthService(TestBed.inject(HttpClientTestingModule) as any);

    expect(newService.getCurrentUser()).toEqual(mockUser);
    expect(newService.isAuthenticated()).toBeTruthy();
  });

  it('should handle login error', () => {
    const loginRequest: LoginRequest = {
      username: 'wronguser',
      password: 'wrongpassword'
    };

    const errorMessage = 'Invalid credentials';

    service.login(loginRequest).subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error.message).toBe(errorMessage);
      }
    });

    const req = httpMock.expectOne(`${API_URL}/login`);
    req.flush({ message: errorMessage }, { status: 401, statusText: 'Unauthorized' });
  });
});
