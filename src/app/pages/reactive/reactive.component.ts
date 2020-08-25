import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private countryService: CountryService) {
    this.createForm();
    // this.uploadFormData();
  }

  ngOnInit(): void {}

  createForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
      }),
      hobbies: this.fb.array([[], [], [], [], []]),
    });
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

  get hobbies(): FormArray {
    return this.form.get('hobbies') as FormArray;
  }

  uploadFormData(): void {
    this.form.setValue({
      name: 'Paulina',
      lastName: 'Guerrero',
      email: 'pau@mail.com',
      address: {
        street: 'Calle',
        city: 'CDMX',
      },
      hobbies: [],
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
