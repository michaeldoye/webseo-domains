import { Component, OnInit } from '@angular/core';
import { DomainService, Domain } from '../../core/domain.service';
import { MatDialog, MatAutocompleteSelectedEvent, MatSelectChange } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _domains: Array<Domain> = [];
  public domains: Array<Domain> = [];
  public isLoading: boolean;
  public selectedFilter: string;
  public selectedClient: string;
  public isAcs: boolean = true;
  public costString: string;
  public clientNames: any;
  public clientSearchCtrl: FormControl = new FormControl();
  public filteredClients: Observable<Set<string>>;

  constructor(private ds: DomainService, private dialog: MatDialog) {}

  public ngOnInit(): void {    
    this.getDomains();
  }  

  public update(value): void { 
    this.ds.updateNode(value.id, value.data);
  }

  public delete(id: string): void {
    this.dialog.open(ConfirmDialogComponent, {data: {item: [id]}})
      .afterClosed().subscribe(r => r ? this.ds.remove(id) : false);
  }

  private clientAutoCompletefilter(q: string): Set<string> {
    return new Set([...this.clientNames].filter(option =>
      option ? option.toLowerCase().includes(q.toLowerCase()) : false));
  }   

  public filterDomainsByStatus(status: string): void {
    this.domains = this._domains.filter((d: Domain) => d.status === status);
  }

  public orderDomainsBy(selected: MatSelectChange): void {
    if (!selected.value) return;
    const key = selected.value.toLowerCase();
    this.domains = this.domains.sort((a, b) => this.doCustomSort(a, b, key));
  }

  public filterByClientName(selected: MatAutocompleteSelectedEvent): void | Domain[] {
    if (!selected.option.value) return this.domains = this._domains;
    this.selectedClient = selected.option.value;
    this.domains = this._domains.filter((d: Domain) => d.client === selected.option.value);
  }

  public sort(): void {
    this.domains = this.domains.reverse();
  }

  public clearFilters() {
    this.selectedClient = '';
    this.clientSearchCtrl.setValue('');
    this.domains = this._domains;
  }

  public get statusCount(): {hosting: number, email: number, parked: number} {
    return {
      hosting: this._domains.filter((d: Domain) => d.status === 'hosting').length,
      email: this._domains.filter((d: Domain) => d.status === 'email').length,
      parked: this._domains.filter((d: Domain) => d.status === 'parked').length
    };
  }

  private doCustomSort(a, b, key): number {
    if(a[key] > b[key]) return -1;
    if(a[key] < b[key]) return 1;
    return 0;    
  }

  private getDomains(): void {
    this.ds.domains$.subscribe((d: Domain[]) => {
      this._domains = d; this.domains = d;
      this.clientNames = d.map((d: any) => d.client);
      this.costString = this.getCostString(d);
      this.filteredClients = this.clientSearchCtrl.valueChanges.pipe(
        startWith(''),
        map(val => this.clientAutoCompletefilter(val))
      );        
    })
  }

  private getCostString(d: Domain[]): string {
    const domainsWithCost = d.map((d: any) => 
      parseFloat(d.cost) ? parseFloat(d.cost) : 0).filter((d: any) => d > 0),
      totalCost = new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' })
        .format(domainsWithCost.reduce((a, b) => a + b));
    return `${domainsWithCost.length} out of ${d.length} 
      domains have a price assigned, totalling ${totalCost} per year.`;
  } 

}
