import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
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
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any

  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService,
    private router: Router, private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.loginUser(this.loginForm.value).subscribe({
        next: (response) => {
          this.authService.setToken(response.token)
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Login exitoso'
          });

          setTimeout(() => {
            this.router.navigate(['/home'])
          }, 2000)
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.msg || 'Error al iniciar sesion'
          })
        }
      })
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key)
        if (control?.invalid) {
          control.markAsTouched()
        }
      })
    }
  }
}
