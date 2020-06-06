/*
  Imports
*/
  // Angular  
  import { Component, OnInit, EventEmitter, Output } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from "@angular/forms";

  // Inner
  import { CrudService } from "../../services/crud/crud.service";
//

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styles: []
})
export class FormSearchComponent implements OnInit {

  // Declarations
  public formData: FormGroup;
  public sourcesCollection: any;
  public postCollection: any;
  public source: any= "";

  @Output() formSubmit = new EventEmitter();
  @Output() formSearch = new EventEmitter();

  // Inject FormBuilder
  constructor(
      private FormBuilder: FormBuilder,
      private CrudService: CrudService
  ) {}

    /* 
    Methods
    */
      // Method to reset form
      private resetForm = ()  => {
        this.formData = this.FormBuilder.group({
            email: [ null, Validators.required ]
        });
      };

      // Method to get the post list
      public getSourceList = async () => {
        this.sourcesCollection = await this.CrudService.readAllItems('sources');
      };
    //

  // Start 
  ngOnInit() {
      this.resetForm();
      this.getSourceList();
  }
  onChangeSource= async (favoris) => {
    this.postCollection = await this.CrudService.getNews('posts', favoris[this.source]);
    this.formSearch.emit(this.source);
  };
};