import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      // dispara un efecto secundario sin alterar el original en este caso navega a la pagina de login si isAuth es falso
      // en este caso navega a la pagina de login si isAuth es falso
      tap((isAuth) => { 
        if (!isAuth) { this.router.navigate(['/login']) };
      })
    );
  }
  
}
