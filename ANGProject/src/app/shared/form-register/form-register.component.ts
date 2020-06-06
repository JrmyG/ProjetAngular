/*
  Imports
*/
  // Angular  
  import { Component, OnInit, EventEmitter, Output } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from "@angular/forms";
  import { HttpClient } from '@angular/common/http';
//

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styles: []
})

export class FormRegisterComponent implements OnInit {

  public userForm:any;
  public userInfos:any = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    });
  }
  onSubmit(){

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    // Init Object with User infos
    this.userInfos = {firstname: this.userForm.value.firstname, 
                      lastname: this.userForm.value.lastname, 
                      email: this.userForm.value.email,
                      password: this.userForm.value.password }
    // Store User Infos Object in localstorage
    localStorage.setItem('UserInfos', this.userInfos );
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
    }
  }
}
