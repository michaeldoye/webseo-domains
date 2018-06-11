import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  private _domains$: AngularFireList<Domain>;
  private _isLoggedin: boolean;

  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) { 
    this._domains$ = db.list('/', ref => ref.orderByChild('name'));
    auth.authState.subscribe(s => {if (s.uid) this._isLoggedin = true});
  }

  public get isLoggedIn(): boolean {
    return this._isLoggedin;
  }

  public get domains$(): Observable<any>  {
    return this._domains$.valueChanges();
  }

  public updateStatus(value: any): Promise<any> {
    return this._domains$.update(value.id, {status: value.status});
  }

  public updateNode(id: any, value: any): Promise<any> {
    return this._domains$.update(id, value);
  }

  public addNew(item: Domain): Observable<any> {
    return of(this._domains$.push(item));    
  }

  public remove(id: string): Promise<any> {
    return this._domains$.remove(id);
  }

  public updateOrder(key: string): Observable<any> {
    this._domains$ = this.db.list('/', ref => ref.orderByChild(key));
    return of(true);
  }
}

export interface Domain {
  client?: string;
  contact?: string;
  cost?: string;
  dns?: Array<any>;
  domain?: string;
  id?: string;
  ipaddress?: string;
  name?: string;
  server?: string;
  status?: string;
  whois?: any;
}