import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  user: any = {
    name: '',
    lastName: '',
    email: '',
  };
  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    console.log('submit', form);
  }
}
