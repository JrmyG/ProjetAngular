/*
  Imports
*/
  // Angular
  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';

  // Inner 
  import { ObservablesService } from "../../services/observable/observable.service";
  import { CrudService } from "../../services/crud/crud.service";
//

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  /* 
  Declaration
  */
      // Properties
      public userData: any;

      constructor(
        private ObservablesService: ObservablesService, 
        private Router : Router, 
        private CrudService: CrudService
      ){
          // Get user data observer
          this.ObservablesService.getUserInfo().subscribe( userDataObserver => {
            if(userDataObserver === null) { this.userData = null }
            else{ 
                if(userDataObserver.length > 0){
                    // Set local storage
                    localStorage.setItem('token', userDataObserver.token );
                    // Update userData value
                    this.userData = userDataObserver;
                }
                else{
                    this.userData = null
                }
            }
        })
      }
      public logout = () => {
        // Delete localstorage
        localStorage.removeItem('userEmail');
    
        // Set user info obserbale value
        this.ObservablesService.setObservableData('users', null)
        this.Router.navigateByUrl('/');
      }
  //

  ngOnInit(){};
};