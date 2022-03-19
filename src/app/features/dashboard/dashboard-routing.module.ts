import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashMainComponent } from "./dash-main/dash-main.component";
import { DashboardWrapperComponent } from "./dashboard-wrapper.component";
import { UserSettingComponent } from "./user-setting/user-setting.component";

const routes: Routes = [
    {
        path: '',
        component: DashboardWrapperComponent,
        children: [
            {
                path: '',
                component: DashMainComponent,
            },
            {
                path: 'settings',
                component: UserSettingComponent,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
