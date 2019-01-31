import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextDetailsComponent } from './text-details/text-details.component';

const routes: Routes = [
  { path: 'details/:id', component: TextDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TextRoutingModule { }
