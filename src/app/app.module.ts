import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommonHeaderComponent } from './common-header/common-header.component';
import { HomeComponent } from './home/home.component';
import { ItemComponent } from './item/item.component';
import {HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { ItemModalComponent } from './item-modal/item-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CommonHeaderComponent,
    HomeComponent,
    ItemComponent,
    ItemModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
