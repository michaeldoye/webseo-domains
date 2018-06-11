import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from "@angular/material";
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private ls: StorageService,
    private rt: Router,
    private sb: MatSnackBar
  ) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean { 
      if (this.ls.get('loggedIn')) { return true } 
      else {
        this.sb.open('You do not have permission to access this page', '', 
          {duration: 5000, horizontalPosition: 'left'});
        this.rt.navigate(['/login']);
        return false;
      }
  }
}
