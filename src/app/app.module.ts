import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { HeaderService } from './services/header.service';
import { ProductService } from './services/product.service';

import { MaterialLoaderModule } from './material-loader/material-loader.module';
import { HeaderComponent } from './components/header/header.component';
import { FlexSpacerComponent } from './components/flex-spacer/flex-spacer.component';
import { SideMenuNavComponent } from './components/side-menu-nav/side-menu-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FlexSpacerComponent,
    SideMenuNavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialLoaderModule
  ],
  providers: [
    HeaderService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
