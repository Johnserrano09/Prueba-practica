import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormUtils } from '../../shared/utils/form-utils';

const USER = {
  email: 'usuario@ups.edu.ec',
  password: '123456'
};

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css']
})
export class LoginPageComponent {
  loginForm: FormGroup;
  errorMessage = signal<string>('');

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    return FormUtils.isFieldInvalid(this.loginForm, fieldName);
  }

  getFieldError(fieldName: string): string {
    return FormUtils.getFieldError(this.loginForm, fieldName);
  }

  onSubmit(): void {
    this.errorMessage.set('');

    if (this.loginForm.invalid) {
      FormUtils.markAllAsTouched(this.loginForm);
      return;
    }

    const { email, password } = this.loginForm.value;

    if (email === USER.email && password === USER.password) {
      this.router.navigate(['/home']);
    } else {
      this.errorMessage.set('Credenciales incorrectas. Por favor, verifica tu email y contraseña.');
    }
  }
}