import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicPagesWrapperComponent } from './public-pages-wrapper.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { HomeNavbarComponent } from './components/home-navbar/home-navbar.component';
import { ServiceSearchComponent } from './components/service-search/service-search.component';
import { SolutionsWrapperComponent } from './solutions/solutions-wrapper.component';
import { PublicPagesRoutingModule } from './public-pages-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    HomePageComponent,
    ContactPageComponent,
    PublicPagesWrapperComponent,
    HomeNavbarComponent,
    ServiceSearchComponent,
    SolutionsWrapperComponent
  ],
  imports: [
    CommonModule,
    PublicPagesRoutingModule,
    FormsModule,
    NgbModule
  ]
})
export class PublicPagesModule { }
