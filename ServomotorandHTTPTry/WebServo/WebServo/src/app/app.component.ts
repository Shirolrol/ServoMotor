import { Component, OnInit } from '@angular/core';
import { Esp32ServoState, OnOffState, ServoService } from './servo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'WebServo';
  activeServos?: Esp32ServoState[];
  led?: OnOffState;

  constructor(private servoService: ServoService) {}

  ngOnInit(): void {
    this.getCurrentState();
  }

  servoOn(servo: number) {
    this.servoService.servoOn(servo).subscribe((response) => {
      this.getCurrentState();
    });
  }

  servoOff(servo: number) {
    this.servoService.servoOff(servo).subscribe((response) => {
      this.getCurrentState();
    });
  }

  onButtonOnClick(servoName: number) {
    this.servoOn(servoName);
  }

  onButtonOffClick(servoName: number) {
    this.servoOff(servoName);
  }

  onLedClick() {
    this.servoService.switchLed().subscribe((response) => {
      this.getCurrentState();
    });
  }

  private getCurrentState() {
    this.servoService.getCurentState().subscribe((response) => {
      this.activeServos = response.servos;
      this.led = response.led;
    });
  }
}
