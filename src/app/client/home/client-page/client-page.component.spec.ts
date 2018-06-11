import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPageComponent } from './client-page.component';
import { MaterialModule } from '../../../material.module';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { firebaseEnvironment } from '../../../../environments/environment';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { RoutingModule } from '../../../app.routing.module';
import { HomeComponent } from '../home.component';
import { DetailPageComponent } from '../detail-page/detail-page.component';
import { LoginPageComponent } from '../../login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelsComponent } from '../panels/panels.component';
import { ContenteditableDirective } from '../../../core/contenteditable.directive';
import { SearchPipe } from '../../search/search.pipe';

describe('ClientPageComponent', () => {
  let component: ClientPageComponent;
  let fixture: ComponentFixture<ClientPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterModule,
        RoutingModule,
        FormsModule,
        ReactiveFormsModule,       
        AngularFireModule.initializeApp(firebaseEnvironment.firebase),
      ],
      declarations: [ 
        ClientPageComponent, 
        HomeComponent, 
        DetailPageComponent, 
        LoginPageComponent,
        PanelsComponent,
        ContenteditableDirective,
        SearchPipe 
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        AngularFireDatabase,
        AngularFireAuth
      ]      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
