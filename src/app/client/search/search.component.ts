import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public query: string = '';

  constructor(public s: SearchService) { }

  public ngOnInit(): void {
  }

  public search(q: string): void {
    this.s.search(q);
  }
}
