import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OnOffState } from '../servo.service';

@Component({
  selector: 'app-led',
  templateUrl: './led.component.html',
  styleUrls: ['./led.component.scss'],
})
export class LedComponent {
  @Input() isOn?: OnOffState;
  @Output() ledClick = new EventEmitter<void>();

  onLedClick() {
    this.ledClick.emit();
  }
}
