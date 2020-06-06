/*
  Imports
*/
  // Angular
  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';

  // Services
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

    // Method to get User Infos
    public getUserInfo = async (email: String ) => {
    // Get user infos
     // const userInfo = await this.CrudService.readOneItem('login', `email=${infos.email}&password=${infos.password}`);

    
    const userInfo = await this.CrudService.readOneItem('users', `email=${email}`)
    
  //

    // Check user info
    if(userInfo.length > 0){
        // Change route endpoint
        this.Router.navigateByUrl('/connected');
    }
  };
  
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