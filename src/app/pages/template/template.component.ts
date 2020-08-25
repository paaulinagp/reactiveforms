import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  user: any = {
    name: 'Paulina',
    lastName: 'Guerrero',
    email: 'paulina@mail.com',
    country: 'MEX',
    gender: 'F',
  };
  countries: any[] = [];

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe((countries) => {
      this.countries = countries;
      this.countries.unshift({
        name: 'Seleccionar país',
        code: '',
      });
    });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }
    console.log('submit', form.value);
  }
}
