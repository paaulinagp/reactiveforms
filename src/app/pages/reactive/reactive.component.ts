import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {
    this.createForm();
    this.uploadFormData();
  }

  ngOnInit(): void {}

  createForm(): void {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(5)]],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            this.validatorsService.validateLastName,
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ],
        ],
        user: ['', , this.validatorsService.userExists],
        password: ['', [Validators.required]],
        password2: ['', [Validators.required]],
        address: this.fb.group({
          street: ['', Validators.required],
          city: ['', Validators.required],
        }),
        hobbies: this.fb.array([[], [], [], [], []]),
      },
      {
        validators: this.validatorsService.validPasswords(
          'password',
          'password2'
        ),
      }
    );
  }

  get nameIsNotValid(): boolean {
    return this.form.get('name').invalid && this.form.get('name').touched;
  }
  get lastNameIsNotValid(): boolean {
    return (
      this.form.get('lastName').invalid && this.form.get('lastName').touched
    );
  }
  get emailIsNotValid(): boolean {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }
  get userIsNotValid(): boolean {
    return this.form.get('user').invalid && this.form.get('user').touched;
  }
  get streetIsNotValid(): boolean {
    return (
      this.form.get('address.street').invalid &&
      this.form.get('address.street').touched
    );
  }
  get cityIsNotValid(): boolean {
    return (
      this.form.get('address.city').invalid &&
      this.form.get('address.city').touched
    );
  }
  get passwordIsNotValid(): boolean {
    return (
      this.form.get('password').invalid && this.form.get('password').touched
    );
  }
  get password2IsNotValid(): boolean {
    const password = this.form.get('password').value;
    const password2 = this.form.get('password2').value;
    return !(password === password2);
  }

  get hobbies(): FormArray {
    return this.form.get('hobbies') as FormArray;
  }

  uploadFormData(): void {
    this.form.setValue({
      name: 'Paulina',
      lastName: 'Guerrero2',
      email: 'paaulinagp@gmail.com',
      user: '',
      password: '123',
      password2: '123',
      address: {
        street: 'Calle',
        city: 'CDMX',
      },
      hobbies: ['Valor1', 'Valor 2', 'Valor 3', 'Valor 4', 'Valor 5'],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) => {
            control.markAsTouched();
          });
        } else {
          control.markAsTouched();
        }
      });
    }

    // Se manda formulario y se debe resetar
    console.log(this.form);
    this.form.reset({
      name: 'Paulina',
      lastName: 'Guerrero',
      email: 'pau@mail.com',
      address: {
        street: 'Calle',
        city: 'CDMX',
      },
    });
  }

  addHobby(): void {
    this.hobbies.push(this.fb.control(''));
  }

  deleteHobby(id: number): void {
    this.hobbies.removeAt(id);
  }
}
