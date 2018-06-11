import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { PanelsComponent } from './panels/panels.component';
import { ClientPageComponent } from './client-page/client-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { SearchPipe } from '../search/search.pipe';
import { ContenteditableDirective } from '../../core/contenteditable.directive';
import { RouterModule } from '@angular/router';
import { RoutingModule } from '../../app.routing.module';
import { LoginPageComponent } from '../login-page/login-page.component';
import { APP_BASE_HREF } from '@angular/common';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { firebaseEnvironment } from '../../../environments/environment';
import { SearchService } from '../search/search.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        RoutingModule,     
        AngularFireModule.initializeApp(firebaseEnvironment.firebase),   
      ],
      declarations: [ 
        HomeComponent,
        PanelsComponent,
        ClientPageComponent,
        DetailPageComponent,
        SearchPipe,
        ContenteditableDirective,
        LoginPageComponent 
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        AngularFireDatabase,
        AngularFireAuth,
        SearchService  
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
