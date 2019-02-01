import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '', component: HomeLayoutComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always', children: [
      {path: 'text', loadChildren: './pages/text/text.module#TextModule' }
     ]
  },
  //no layout routes
  { path: 'login', component: LoginComponent },
  // otherwise redirect to home
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
