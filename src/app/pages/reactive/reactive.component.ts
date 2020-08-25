import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private countryService: CountryService) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm(): void {
    this.form = this.fb.group({
      name: ['Pau', [Validators.required, Validators.minLength(5)]],
      lastName: ['Guerrero', [Validators.required, Validators.minLength(5)]],
      email: [
        'pau@mail.com',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
    });
  }

  onSubmit(): void {
    console.log(this.form);
  }
}
