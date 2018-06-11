import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPageComponent } from './detail-page.component';
import { MaterialModule } from '../../../material.module';
import { RouterModule } from '@angular/router';
import { RoutingModule } from '../../../app.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { firebaseEnvironment } from '../../../../environments/environment';
import { ClientPageComponent } from '../client-page/client-page.component';
import { HomeComponent } from '../home.component';
import { LoginPageComponent } from '../../login-page/login-page.component';
import { PanelsComponent } from '../panels/panels.component';
import { ContenteditableDirective } from '../../../core/contenteditable.directive';
import { SearchPipe } from '../../search/search.pipe';
import { APP_BASE_HREF } from '@angular/common';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { WhoisService } from '../../../core/whois.service';
import { HttpClientModule } from '@angular/common/http';

describe('DetailPageComponent', () => {
  let component: DetailPageComponent;
  let fixture: ComponentFixture<DetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterModule,
        RoutingModule,
        FormsModule,
        ReactiveFormsModule,       
        AngularFireModule.initializeApp(firebaseEnvironment.firebase),
        HttpClientModule
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
        AngularFireAuth,
        WhoisService
      ] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
