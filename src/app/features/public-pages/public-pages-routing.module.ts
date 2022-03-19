import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicPagesWrapperComponent } from './public-pages-wrapper.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { SolutionsModule } from './solutions/solutions.module';


const routes: Routes = [
  {
    path: '',
    component: PublicPagesWrapperComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
         pathMatch: 'full',
        data: {
          title: 'Home'
        },
      },
      {
        path: 'contact',
        component: ContactPageComponent,
        data: {
          title: 'Contact'
        }
      },

      // {
      //   path: 'browse',
      //   loadChildren: () => SolutionsModule, // Eager Loading
      // },

      {
        path: 'solutions',
        loadChildren: () => import('@app/features/public-pages/solutions/solutions.module')
          .then(m => m.SolutionsModule),
      },

    ]

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicPagesRoutingModule { }
