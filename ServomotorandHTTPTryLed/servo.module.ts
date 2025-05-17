import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServoComponent } from './servo.component';



@NgModule({
  declarations: [
    ServoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ServoComponent
  ]
})
export class ServoModule { }
