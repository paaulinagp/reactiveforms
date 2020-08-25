import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidation {
  [s: string]: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  constructor() {}

  validateLastName(control: FormControl): ErrorValidation {
    const lastName = 'guerrero';
    if (control.value?.toLowerCase() === lastName) {
      return {
        hasLastName: true,
      };
    }

    return null;
  }

  validPasswords(password: string, password2: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const password2Control = formGroup.controls[password2];

      if (passwordControl.value === password2Control.value) {
        password2Control.setErrors(null);
      } else {
        password2Control.setErrors({ hasError: true });
      }
    };
  }

  userExists(
    control: FormControl
  ): Promise<ErrorValidation> | Observable<ErrorValidation> {
    if (!control.value) {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'paaulinagp') {
          resolve({
            userExists: true,
          });
        } else {
          resolve(null);
        }
      }, 3500);
    });
  }
}
