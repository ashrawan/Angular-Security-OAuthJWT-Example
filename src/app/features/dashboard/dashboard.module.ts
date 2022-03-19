import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardWrapperComponent } from './dashboard-wrapper.component';
import { DashMainComponent } from './dash-main/dash-main.component';
import { UserSettingComponent } from './user-setting/user-setting.component';
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [
    DashboardWrapperComponent,
    DashMainComponent,
    UserSettingComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
