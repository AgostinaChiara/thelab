import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockMessageService: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['setToken']);
    mockUserService = jasmine.createSpyObj('UserService', ['loginUser']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockMessageService = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter },
        { provide: MessageService, useValue: mockMessageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    const form = component.loginForm;
    expect(form.get('username')?.value).toBe('');
    expect(form.get('password')?.value).toBe('');
  });

  it('should mark the form as invalid if fields are empty', () => {
    component.loginForm.setValue({
      username: '',
      password: '',
    });
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should call UserService.loginUser and navigate on successful login', () => {
    const mockResponse = of({ token: 'fake-jwt-token' });
    mockUserService.loginUser.and.returnValue(mockResponse);

    component.loginForm.setValue({
      username: 'testuser',
      password: 'password123',
    });

    component.onSubmit();

    expect(mockUserService.loginUser).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123',
    });
    expect(mockAuthService.setToken).toHaveBeenCalledWith('fake-jwt-token');
    expect(mockMessageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Login exitoso',
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should show error message if login fails', () => {
    const mockError = throwError({ error: { msg: 'Error al iniciar sesión' } });
    mockUserService.loginUser.and.returnValue(mockError);

    component.loginForm.setValue({
      username: 'testuser',
      password: 'password123',
    });

    component.onSubmit();

    expect(mockMessageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Error al iniciar sesión',
    });
  });

  it('should mark all form fields as touched if form is invalid', () => {
    component.loginForm.setValue({
      username: '',
      password: '',
    });

    component.onSubmit();

    Object.keys(component.loginForm.controls).forEach((key) => {
      const control = component.loginForm.get(key);
      expect(control?.touched).toBeTrue();
    });
  });
});
