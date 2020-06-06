/*
    Imports
*/
    // Angular
    import { Injectable } from '@angular/core';
    import { CanActivate, Router } from '@angular/router';

    // Inner
    import { CrudService } from "./services/crud/crud.service";
//

/*
Definitions
*/
    @Injectable({ providedIn: 'root' })
//

/*
Exports
*/
    export class AuthGuard implements CanActivate {

        constructor( 
            private CrudService: CrudService,
            private Router: Router,
        ){}


        canActivate(): Promise<any> {
            return new Promise( (resolve, reject) => {
                this.CrudService.readOneItem('users', `email=${localStorage.getItem('userEmail')}`)
                .then( ( apiResponse ) =>  {
                    if(apiResponse.length > 0){ return resolve(true) }
                    else{ this.Router.navigateByUrl('/') };
                })
                .catch( ( apiResponse ) =>  this.Router.navigateByUrl('/'))
            })
        }
    }
//