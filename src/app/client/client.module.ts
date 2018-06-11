import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { AngularFireAuth } from 'angularfire2/auth';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PanelsComponent } from './home/panels/panels.component';
import { SearchComponent } from './search/search.component';
import { SearchPipe } from './search/search.pipe';
import { SearchService } from './search/search.service';
import { DetailPageComponent } from './home/detail-page/detail-page.component';
import { RouterModule } from '@angular/router';
import { WhoisService } from '../core/whois.service';
import { ContenteditableDirective } from '../core/contenteditable.directive';
import { DynamicFormComponent } from './form/lead-form.component';
import { DynamicFormQuestionComponent } from './form/lead-form-question.component';
import { AddNewDialogComponent } from './add-new-dialog/add-new-dialog.component';
import { CalloutComponent } from './callout/callout.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ClientPageComponent } from './home/client-page/client-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule 
  ],
  declarations: [
    HomeComponent,
    LoginPageComponent,
    PanelsComponent,
    SearchComponent,
    SearchPipe,
    DetailPageComponent,
    ContenteditableDirective,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    AddNewDialogComponent,
    CalloutComponent,
    ConfirmDialogComponent,
    ClientPageComponent
  ],
  providers: [
    AngularFireAuth, 
    SearchService,
    WhoisService
  ],
  entryComponents: [
    AddNewDialogComponent,
    ConfirmDialogComponent
  ],
  exports: [
    HomeComponent,
    LoginPageComponent,
    SearchComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    AddNewDialogComponent,
    CalloutComponent
  ]
})
export class ClientModule { }
