import { Component } from '@angular/core';
import { StorageService } from './core/storage.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { NetworkService } from './core/network.service';
import { MatDialog } from '@angular/material';
import { AddNewDialogComponent } from './client/add-new-dialog/add-new-dialog.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { fadeInOut } from './route.animation';
import { WorkerService } from './core/worker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ fadeInOut ]
})
export class AppComponent {

  public title = 'Web SEO Domains';
  public isDarkTheme: boolean;

  public isSidenavOpen: boolean = this.storage.get('isOpen') || false;

  constructor(
    public network: NetworkService,
    private storage: StorageService,
    public dialog: MatDialog,
    public auth: AngularFireAuth,
    private sw: WorkerService,
    public overlayContainer: OverlayContainer) {
      this.isDarkTheme = this.storage.get('isDarkTheme') || false;
      if (this.storage.get('isDarkTheme')) {
        this.overlayContainer
          .getContainerElement().classList.add('dark-theme');
      }
      this.sw.checkForUpdates();
  }

  public changeTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    if(this.isDarkTheme) {
      this.overlayContainer
        .getContainerElement().classList.add('dark-theme');
      this.storage.set('isDarkTheme', true);
    } else {
      this.overlayContainer
        .getContainerElement().classList.remove('dark-theme');
      this.storage.set('isDarkTheme', false);
    }   
  }

  public toggleNav(state: any): void {
    this.storage.set('isOpen', state);
  }

  public openNewItemDialog(): void {
    this.dialog.open(AddNewDialogComponent, {width: '750px'});
  }
}
