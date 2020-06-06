/* 
Import
*/
    // Angular
    import { Component, OnInit } from '@angular/core';
    import { Router } from '@angular/router';

    // Inner
    import { CrudService } from "./services/crud/crud.service";
//

/* 
Componant configuration
*/
    @Component({
    selector: 'app-root',
    template: `
      <app-header></app-header>
      <router-outlet></router-outlet>
    `
    })
//


/* 
Componant class definition
*/
export class AppComponent implements OnInit {

    constructor(
        private CrudService: CrudService,
        private Router: Router
    ){}

    async ngOnInit(){
        const userInfo = await this.CrudService.readOneItem('users', `email=${localStorage.getItem('userEmail')}`);

        // Check user info
        if(userInfo.length > 0){
            // Change route endpoint
            this.Router.navigateByUrl('/connected');
        };
    };
};
//