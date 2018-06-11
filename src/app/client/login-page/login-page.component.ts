import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { routeAnimation } from '../../route.animation';
import { StorageService } from '../../core/storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  host: {
    '[@routeAnimation]': 'true'
  },
  animations: [ routeAnimation ]
})
export class LoginPageComponent implements OnInit {

  email: string = 'info@webseo.co.za';
  password: string = '';

  hide: boolean = true;
  rememberMe: boolean =  true;

  isLoading: Boolean = false; 

  constructor(
    public afAuth: AngularFireAuth,
    private sb: MatSnackBar,
    private ls: StorageService,    
    private router: Router
  ) { }

  ngOnInit() {
    this.logOut(); 
  }

  login() {
    this.isLoading = true;
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(auth => {
        if (auth.uid !== null) {
          this.ls.set('loggedIn', true);
          this.router.navigate(['/']);
        }
      })
      .catch(error => {
        this.sb.open(error.message, '', {duration: 5000});
        this.isLoading = false;
      });
  }

  logOut() {
    this.afAuth.auth.signOut().then(() => console.log('logged out'));
    this.ls.clearAll();
  }  

}
