/* Imports */

//Angular
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

/* Componant configuration */
@Component({
    selector: 'app-form-login',
    templateUrl: './form-login.component.html',
    styles: [
    ]
})

/* Componant class definition and export */
export class FormLoginComponent implements OnInit {

	@Output() formSubmit = new EventEmitter();
    // Declarations
    public formData: FormGroup;

    // Inject FormBuilder
    constructor(
        private FormBuilder: FormBuilder
    ) {}

    // Method to reset form
    private resetForm = () => {
        this.formData = this.FormBuilder.group({
            email: [ null, [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")] ],
            password: [ null, Validators.required ]
        });
    };

    // Start 
    ngOnInit() {
        this.resetForm();
    }
};