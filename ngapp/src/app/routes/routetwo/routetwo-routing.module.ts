import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutetwoComponent } from './routetwo.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RoutetwoComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [RoutetwoComponent],
})
export class RoutetwoRoutingModule {}
