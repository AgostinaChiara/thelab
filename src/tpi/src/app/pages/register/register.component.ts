import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [`
    :host ::ng-deep .cyan-button {
      background: var(--cyan-600) !important;
      border-color: var(--cyan-600) !important;
    }

    :host ::ng-deep .cyan-button:hover {
      background: var(--cyan-500) !important;
      border-color: var(--cyan-500) !important;
    }
  `]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | any

  constructor(private fb: FormBuilder, private userService: UserService,
    private router: Router, private messageService: MessageService
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });

    this.registerForm.setValidators(this.passwordMatchValidator.bind(this));
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
    return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.value;

      this.userService.registerUser({
        username,
        password,
      }).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Usuario registrado exitosamente'
          });
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000)
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.msg || 'Error al registrar usuario'
          });
        }
      });
    } else {
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}