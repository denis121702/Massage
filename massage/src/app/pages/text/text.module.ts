import { NgModule } from '@angular/core';

import { TextRoutingModule } from './text-routing.module';
import { TextDetailsComponent } from './text-details/text-details.component';

@NgModule({
  imports: [
    TextRoutingModule
  ],
  declarations: [
    TextDetailsComponent
  ]
})

export class TextModule { }
