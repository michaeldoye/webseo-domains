import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class SearchService {

  public onSearch = new EventEmitter();

  public search(q: string): Observable<any> {
    q.trim();
    q.toLowerCase();
    return of(this.onSearch.emit(q));
  }  
}
