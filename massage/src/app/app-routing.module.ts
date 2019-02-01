import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [

  //Site routes goes here
  {
    path: '', component: HomeLayoutComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always', children: [
      {path: 'text', loadChildren: './pages/text/text.module#TextModule' }
     ]
  },
  //no layout routes
  { path: 'login', component: LoginComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '/' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
