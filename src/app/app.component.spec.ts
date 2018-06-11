import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ClientModule } from './client/client.module';
import { RoutingModule } from './app.routing.module';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { firebaseEnvironment, environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        ClientModule,
        RoutingModule,
        RouterModule,
        AngularFireModule.initializeApp(firebaseEnvironment.firebase),
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        AngularFireAuth
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Web SEO Domains'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Web SEO Domains');
  }));
  it('should render title in a span tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('Web SEO Domains');
  }));
});
