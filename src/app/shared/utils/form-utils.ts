import { AbstractControl, FormGroup } from '@angular/forms';

export class FormUtils {
  static isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  static getFieldError(form: FormGroup, fieldName: string): string {
    const field = form.get(fieldName);
    
    if (!field || !field.errors) {
      return '';
    }

    const errors = field.errors;

    if (errors['required']) {
      return 'Este campo es requerido';
    }

    if (errors['email']) {
      return 'Ingrese un email válido';
    }

    if (errors['minlength']) {
      const minLength = errors['minlength'].requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }

    if (errors['maxlength']) {
      const maxLength = errors['maxlength'].requiredLength;
      return `Máximo ${maxLength} caracteres`;
    }

    return 'Campo inválido';
  }

  static markAllAsTouched(form: FormGroup): void {
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markAllAsTouched(control);
      }
    });
  }
}