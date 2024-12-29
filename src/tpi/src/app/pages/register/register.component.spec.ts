import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockMessageService: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['registerUser']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockMessageService = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter },
        { provide: MessageService, useValue: mockMessageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    const form = component.registerForm;
    expect(form.get('username')?.value).toBe('');
    expect(form.get('password')?.value).toBe('');
    expect(form.get('confirmPassword')?.value).toBe('');
  });

  it('should mark the form as invalid if fields are empty', () => {
    component.registerForm.setValue({
      username: '',
      password: '',
      confirmPassword: '',
    });
    expect(component.registerForm.invalid).toBeTrue();
  });

  it('should set password mismatch error if passwords do not match', () => {
    component.registerForm.setValue({
      username: 'testuser',
      password: 'password123',
      confirmPassword: 'differentpassword',
    });
    component.passwordMatchValidator(component.registerForm);
    const confirmPasswordErrors = component.registerForm.get('confirmPassword')?.errors;
    expect(confirmPasswordErrors).toEqual({ passwordMismatch: true });
  });

  it('should call UserService.registerUser and navigate on successful registration', () => {
    const mockResponse = of({});
    mockUserService.registerUser.and.returnValue(mockResponse);

    component.registerForm.setValue({
      username: 'testuser',
      password: 'password123',
      confirmPassword: 'password123',
    });

    component.onSubmit();

    expect(mockUserService.registerUser).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123',
    });
    expect(mockMessageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Success',
      detail: 'Usuario registrado exitosamente',
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should show error message if registration fails', () => {
    const mockError = throwError({ error: { msg: 'Error al registrar usuario' } });
    mockUserService.registerUser.and.returnValue(mockError);

    component.registerForm.setValue({
      username: 'testuser',
      password: 'password123',
      confirmPassword: 'password123',
    });

    component.onSubmit();

    expect(mockMessageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Error al registrar usuario',
    });
  });

  it('should mark all form fields as touched if form is invalid', () => {
    spyOn(component.registerForm, 'markAsTouched');
    component.onSubmit();

    Object.keys(component.registerForm.controls).forEach((key) => {
      expect(component.registerForm.get(key)?.touched).toBeTrue();
    });
  });
});
