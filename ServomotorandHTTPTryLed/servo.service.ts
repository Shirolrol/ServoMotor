import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const responseType = 'text';

export type Esp32ServoState = {
  name: number;
  isOn: OnOffState;
};

export type OnOffState = 0 | 1;

export type Esp32State = {
  servos: Esp32ServoState[];
  led: OnOffState;
};

@Injectable({
  providedIn: 'root',
})
export class ServoService {
  private apiUrl = 'http://192.168.0.164';
  // private apiUrl = '/Servo';
  constructor(private http: HttpClient) {}

  getCurentState(): Observable<Esp32State> {
    return this.http.get<Esp32State>(`${this.apiUrl}/Servo`);
  }

  servoOn(servo: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Servo/on`, {
      params: { servo, myparameter: 5 },
    });
  }

  servoOff(servo: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Servo/off`, {
      params: { servo },
    });
  }

  switchLed(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/led`);
  }
}
