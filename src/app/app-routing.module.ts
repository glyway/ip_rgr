import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{ path: '', pathMatch: 'full', redirectTo: 'welcome' },
{ path: 'welcome', component: WelcomeComponent },
{ path: 'dashboard', component: DashboardComponent },
{ path: '**', redirectTo: 'welcome' },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
