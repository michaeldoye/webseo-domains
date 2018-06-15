import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { base64Encode } from '@firebase/util';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Domain } from './domain.service';


@Injectable()
export class WhoisService {

  //private api = 'https://jsonwhoisapi.com/api/v1/whois?identifier';
  private api = 'https://www.whoisxmlapi.com/whoisserver/WhoisService?';
  private _domains$: AngularFireList<Domain>;

  constructor(
    private http: HttpClient, 
    private firebase: AngularFireDatabase) {
    this._domains$ = firebase.list('/');
  }

  // public get(domain: string): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //       'Authorization': `Basic ${this.getToken}`
  //     })
  //   };    
  //   return this.http.get(`${this.api}=${domain}`, httpOptions)
  //     .pipe(
  //       retry(3),
  //       tap(d => this.checkForExisting(d, domain)),
  //       catchError(this.handleError)
  //     );
  // }

  public get(domain: string, id: string): Observable<any> {
    const data = {
      domainName: domain,
      apiKey: 'at_RrDEXduNakk4h28UG0hkIZFC5GjEW',
      outputFormat: 'JSON'
    }    
    return this.http.get(this.api, {params: data})
      .pipe(
        retry(3),
        tap(d => this.addToFireBase(d, domain, id)),
        catchError(this.handleError)
      );
  }
  
  private addToFireBase(data: any, domain: string, id: string) {
    this._domains$.update(id, {whois: data}).then(() => console.log('whois added to firebase'));
  }

  private get getToken() {
    return base64Encode('37610496:5u6rqWnzMrEREHHS7jgKXg');
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Could not get whois data; please try again later.');
  };  
}
