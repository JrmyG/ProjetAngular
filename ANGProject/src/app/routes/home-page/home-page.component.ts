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
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: []
})

export class HomePageComponent implements OnInit {

  /* 
  Declarations
  */
    public sourcesCollection: any;
    public postCollection: any;
    public keyword: String = localStorage.getItem('last-search-keyword');
    public source: any = localStorage.getItem('last-search-source');
  //

  constructor(
    private CrudService: CrudService,
    private Router: Router
  ) { }


  /* 
  Methods
  */
    // Method to get the post list
    public getSourceList = async () => {
      this.sourcesCollection = await this.CrudService.readAllItems('sources');
    };

    // Method Register
    register = async (user: any) => {

      const userInfo = await this.CrudService.createItem('register', user);
      //User successfully registered
      if(Object.keys(userInfo.data).length > 0){
          this.Router.navigateByUrl('/connected');
      }
    };

    // Method Connexion
    public getUserInfo = async (user: Object) => {
	    
      const userInfo = await this.CrudService.createItem('login', user);
      
      //User logged in
      if(Object.keys(userInfo.data).length > 0){
        //Set his token in localStorage
        localStorage.setItem('token', userInfo.data.token);
            
        const userData = await this.CrudService.createItem('me', { token: localStorage.getItem('token') });

        //Change route endpoint
        this.Router.navigateByUrl('/connected');
      }
    }; 
  //

  /* 
  Hooks
  */
 ngOnInit() {
  this.getSourceList();
  }

  // Method to get the post list on Form Submit
  onSubmit= async (keyword, source) => {
    if ( !keyword )
    {
      this.postCollection = await this.CrudService.getNews('posts', source);
      localStorage.setItem('last-search-source', source );
    } else
    {
      this.postCollection = await this.CrudService.getNewsByKeyWord('posts', keyword, source);
      localStorage.setItem('last-search-keyword', keyword );
      localStorage.setItem('last-search-source', source );
    }
  };
  //

}