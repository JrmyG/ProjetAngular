/*
Imports
*/
  // Angular
  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';

  // Inner
  import { ObservablesService } from "../observable/observable.service"
//

/* 
Definition 
*/
@Injectable()
export class CrudService {

  protected apiUrl = 'https://newsapp.dwsapp.io/api/';
  protected apiKey = "6edf24becd2244629c1a4cc27c1c3c94";

  // Inject module(s) in the service
  constructor( private HttpClient: HttpClient, private ObservablesService: ObservablesService ){};

  // CRUD method: Get Posts by Source
  public getNews(endpoint: String, source: any){
    return this.HttpClient.get(`https://newsapi.org/v2/everything?sources=${source}&apiKey=${this.apiKey}`).toPromise()
    .then( data => this.getData(endpoint, data))
    .catch(this.handleError);
  }

  // CRUD method: Get Posts by Keyword & Source
  public getNewsByKeyWord(endpoint: String,  keyword: any, source: any){
    return this.HttpClient.get(`https://newsapi.org/v2/everything?q=${keyword}&sources=${source}&apiKey=${this.apiKey}`).toPromise()
    .then( data => this.getData(endpoint, data))
    .catch(this.handleError);
  }

  // CRUD method: Read Item
  public readOneItem(endpoint: String, param: String): Promise<any>{
    return this.HttpClient.get(`https://jsonplaceholder.typicode.com/${endpoint}?${param}`).toPromise()
    .then( data => this.getData(endpoint, data))
    .catch(this.handleError);
  };
  
  // CRUD method: read all items
  public readAllItems(endpoint: String): Promise<any>{
    return this.HttpClient.get(`https://newsapi.org/v2/${endpoint}?apiKey=${this.apiKey}`).toPromise()
    .then(data => this.getData(endpoint, data))
    .catch(this.handleError);
  };

	// CRUD method: create item
  public createItem(endpoint: String,data: any): Promise<any>{
    // Set header
    let myHeader = new HttpHeaders();
    myHeader.append('Content-Type', 'application/json');

    // Launch request
    return this.HttpClient.post(`${this.apiUrl}${endpoint}`, data, { headers: myHeader })
    .toPromise().then(data => this.getData(endpoint,data)).catch(this.handleError);
  }

  // CRUD method: edit an item
  public updateItem(endpoint: String, _id: String, data: any): Promise<any>{
    // Set header
    let myHeader = new HttpHeaders();
    myHeader.append('Content-Type', 'application/json');

    // Launch request
    return this.HttpClient.put(`https://jsonplaceholder.typicode.com/${endpoint}/${_id}`, data, { headers: myHeader })
    .toPromise().then(data => this.getData(endpoint, data))
    .catch(this.handleError);
  };

  // CRUD method: delete an item
  public deleteItem(endpoint: String, _id: String): Promise<any>{
    // Set header
    let myHeader = new HttpHeaders();
    myHeader.append('Content-Type', 'application/json');

    // Launch request
    return this.HttpClient.delete(`https://jsonplaceholder.typicode.com/${endpoint}/${_id}`, { headers: myHeader })
    .toPromise().then(data => this.getData(endpoint, data))
    .catch(this.handleError);
  };

  /* 
  Methods to get API responses
  */
    // Get the API response
    private getData = (endpoint, apiResponse: any) => {
      // Switch endpoint to set observable value
      switch(endpoint){
      case 'users':
          // Set user info obserrbale value
          this.ObservablesService.setObservableData('users',apiResponse)
  
          // Return data
          return apiResponse || {};
          break;
      case 'posts':
        // Set user info obserrbale value
        this.ObservablesService.setObservableData('posts',apiResponse)

        // Return data
        return apiResponse || {};
        break;
      default:
          // Retun data anytime
          return apiResponse || {};
          break;
      };
  };

    // Get the API error
    private handleError = (apiError: any) => Promise.reject(apiError.error);
  //
  };
//