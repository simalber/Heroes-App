import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor ( private AuthService: AuthService,
                private router: Router) { }
       canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this.AuthService.verificaAutenticacion()
        .pipe(
          tap( estaAutenticado => {
            if ( !estaAutenticado ) {
              this.router.navigate(['./auth/login']);
            }
          })
        );

        //  if ( this.AuthService.auth.id ){
      //    return true;
     //   }
     //   console.log('Bloqueado por auth guard - CanActivate')
     //   return false;
   }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean{

      return this.AuthService.verificaAutenticacion();

 //    if ( this.AuthService.auth.id ){
   //    return true;
   //  }
  //   console.log('Bloqueado por auth guard - CanLoad')
  //   return false;
  }
}
