import { Component, OnInit } from '@angular/core';
import { DomainService, Domain } from '../../../core/domain.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css']
})
export class ClientPageComponent implements OnInit {

  public activeClient: {name: string, domains: Domain[]};
  public domainsCost: string;

  constructor(
    public d: DomainService, 
    public router: Router,
    public route: ActivatedRoute) { }

  public ngOnInit(): void {
    const clientName = this.route.snapshot.paramMap.get('id');
    this.d.domains$.subscribe(d => {
      this.activeClient = {name: clientName, domains: d.filter((d: Domain) => d.client === clientName)};
      this.domainsCost = this.getCostString(this.activeClient.domains);
      console.log(this.activeClient);
    });
  }

  private getCostString(d: Domain[]): string {
    const domainsWithCost = d.map((d: any) => 
      parseFloat(d.cost) ? parseFloat(d.cost) : 0).filter((d: any) => d > 0),
      totalCost = new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' })
        .format(domainsWithCost.reduce((a, b) => a + b));
    return `totalling ${totalCost} per year.`;
  }  

}
