/*
  Imports
*/
  // Angular  
  import { Component, OnInit, EventEmitter, Output } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from "@angular/forms";
//

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styles: []
})
export class FormLoginComponent implements OnInit {

  // Declarations
  public formData: FormGroup;
  @Output() formSubmit = new EventEmitter();

  // Inject FormBuilder
  constructor(
      private FormBuilder: FormBuilder
  ) {}

  // Method to reset form
  private resetForm = ()  => {
      this.formData = this.FormBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        // password: ['', [Validators.required]],
      });
  };

  // Start 
  ngOnInit() {
      this.resetForm();
  }
};