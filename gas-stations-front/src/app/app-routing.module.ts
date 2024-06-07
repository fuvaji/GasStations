import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DataViewComponent } from './data-view/data-view.component';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'service', component: DataViewComponent},
  {path: 'chart', component: ChartComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
