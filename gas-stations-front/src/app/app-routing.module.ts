import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DataViewComponent } from './data-view/data-view.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'service', component: DataViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
