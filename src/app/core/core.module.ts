import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [AngularFireDatabase],
})
export class CoreModule { }
