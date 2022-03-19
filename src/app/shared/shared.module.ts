import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';

const sharedComponents = [
  LoadingComponent
];

@NgModule({
  declarations: [...sharedComponents],
  imports: [
    CommonModule
  ],
  exports: [...sharedComponents]
})
export class SharedModule { }
