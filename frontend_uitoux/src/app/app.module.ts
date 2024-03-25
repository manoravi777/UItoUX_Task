import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TopNavbarComponent,
    FooterComponent,
    BannerComponent,
    MainComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule , HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
