import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: HomeLayoutComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always', children: [
      {path: 'text', loadChildren: './pages/text/text.module#TextModule' }
     ]
  },
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
