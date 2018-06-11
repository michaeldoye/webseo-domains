import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CoreModule } from './core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientModule } from './client/client.module';
import { HomeComponent } from './client/home/home.component';
import { RoutingModule } from './app.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { firebaseEnvironment, environment } from '../environments/environment';
import { MatSidenav } from '@angular/material';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,    
    MaterialModule,
    FlexLayoutModule,
    CoreModule,
    ClientModule,
    RoutingModule,
    AngularFireModule.initializeApp(firebaseEnvironment.firebase),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [MatSidenav],
  bootstrap: [AppComponent]
})
export class AppModule { }
