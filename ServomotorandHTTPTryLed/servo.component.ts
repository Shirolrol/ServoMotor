import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-servo',
  templateUrl: './servo.component.html',
  styleUrls: ['./servo.component.scss'],
})
export class ServoComponent {
  @Input() name?: number;
  @Input() isOn?: 0 | 1;

  @Output() buttonOnClick = new EventEmitter<number>();
  @Output() buttonOffClick = new EventEmitter<number>();

  onButtonOnClick() {
    this.buttonOnClick.emit(this.name);
  }

  onButtonOffClick() {
    this.buttonOffClick.emit(this.name);
  }
}
