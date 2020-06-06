/* 
Import
*/
  // Angular
  import { Component, OnInit } from '@angular/core';

  // Inner
  import { CrudService } from "../../services/crud/crud.service";
//

/* 
Component configuration
*/
  @Component({
    selector: 'app-connected-page',
    templateUrl: './connected-page.component.html',
  })
//


/* 
Component class definition
*/
export class ConnectedPageComponent implements OnInit {

  /* 
  Declarations
  */
    public sourcesCollection: any;
    public postCollection: any;
    public keyword: String = localStorage.getItem('last-search-keyword');
    public source: any = localStorage.getItem('last-search-source');
    public favoris: any = [];
  //

    constructor(
      private CrudService: CrudService){}
  /* 
  Methods
  */
    // Method to get the post list
    public getSourceList = async () => {
      this.sourcesCollection = await this.CrudService.readAllItems('sources');
    };

    // Method to add Source in Favoris
    public addFavoris = async (source) => {
      if(this.favoris.indexOf(source) !== -1) {
      }
      else
      {
        this.favoris.push(source);
      }
    }

    // Method to delete Source in Favoris
    public deleteFavoris = async (source) => {
      if(this.favoris.indexOf(source) !== -1) {
      const index: number = this.favoris.indexOf(source);
      this.favoris.splice(index, 1);
      }

    }
  //

  /* 
  Hooks
  */
  ngOnInit() {
    this.getSourceList();
  }

  // Method to get the post list on Form Submit
  onSubmit = async (keyword, source) => {
    if ( !keyword )
    {
      this.postCollection = await this.CrudService.getNews('posts', source);
      localStorage.setItem('last-search-source', source );
      console.log(this.postCollection)
    } else
    {
      this.postCollection = await this.CrudService.getNewsByKeyWord('posts', keyword, source);
      localStorage.setItem('last-search-keyword', keyword );
      localStorage.setItem('last-search-source', source );
    }
  };
  //
  // Method to get the post list
  onChangeSource = async (source) => {
    this.postCollection = await this.CrudService.getNews('posts', source);
  };
}
//