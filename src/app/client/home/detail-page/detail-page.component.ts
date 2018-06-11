import { Component, OnInit } from '@angular/core';
import { DomainService, Domain } from '../../../core/domain.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WhoisService } from '../../../core/whois.service';
import { MatSelectChange, MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  public activeDomain: Domain;
  public whoisData: any;

  constructor(
    public d: DomainService, 
    public router: Router,
    private whois: WhoisService, 
    public dialog: MatDialog,
    public route: ActivatedRoute,
    private snackbar: MatSnackBar) { }

  public ngOnInit(): void {
    const domain = this.route.snapshot.paramMap.get('id');
    this.d.domains$.subscribe(d => {
      this.activeDomain = d.filter((d: Domain) => d.name === domain)[0];
      this.getWhois(domain);
    });
  }

  public changeDomainStatus(status: MatSelectChange): void {
    this.activeDomain.status = status.value;
    this.d.updateStatus(this.activeDomain).then(() => console.log('updated'));
  }

  public nodeChange(value: string, node: string): void {
    const obj = {}; obj[node] = value;
    this.d.updateNode(this.activeDomain.id, obj).then(() => console.log('updated'));
  }

  public delete(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {item: [id]}});
    dialogRef.afterClosed().subscribe(action =>{
      if (action) this.d.remove(id).then(() => this.router.navigate(['/']));
    })
  }

  public getWhois(domain: string) {
    if(this.activeDomain.whois) {
      this.whoisData = this.activeDomain.whois;
    } else {
      this.whois.get(domain, this.activeDomain.id).subscribe(data => this.whoisData = data, 
        error => this.snackbar.open(error, 'OK', {horizontalPosition: 'left'}));
    }
  }

}