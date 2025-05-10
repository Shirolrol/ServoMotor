import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LedComponent } from './led.component';



@NgModule({
  declarations: [
    LedComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LedComponent
  ]
})
export class LedModule { }
