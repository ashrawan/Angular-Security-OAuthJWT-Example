import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolutionsWrapperComponent } from './solutions-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: SolutionsWrapperComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolutionsRoutingModule { }
