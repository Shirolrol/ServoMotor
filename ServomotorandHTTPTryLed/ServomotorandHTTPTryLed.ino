#include <WebServer.h>
#include <WiFiManager.h>
#include <ESP32Servo.h>
#include "HTML.h"
#define TRIGGER_PIN 35
#define LED 4

int timeout = 120;

Servo servo1;  // Серводвигун на піні 12
Servo servo2;  // Серводвигун на піні 14
Servo servo3;  // Серводвигун на піні 27
Servo servo4;  // Серводвигун на піні 26

bool isServo1;
bool isServo2;
bool isServo3;
bool isServo4;

bool led;

// Створення об'єкта веб-сервера на порту 80
WebServer server(80);

bool rotate(int servoNumber, int angle) {
  Serial.println(servoNumber);
  if (servoNumber == 1) {
    servo1.write(angle);
  } else if (servoNumber == 2) {
    servo2.write(angle);
  } else if (servoNumber == 3) {
    servo3.write(angle);
  } else if (servoNumber == 4) {
    servo4.write(angle);
  } else {
    return false;
  }
  return true;
}

void handleServoOn() {
  if (server.hasArg("servo")) {
    int servoNumber = server.arg("servo").toInt();
    if (servoNumber == 1) {
      isServo1 = true;
    } else if (servoNumber == 2) {
      isServo2 = true;
    } else if (servoNumber == 3) {
      isServo3 = true;
    } else if (servoNumber == 4) {
      isServo4 = true;
    }

    if (rotate(servoNumber, 90)) {
      Serial.println("Servo " + String(servoNumber) + " is on");
      server.sendHeader("Access-Control-Allow-Origin", "*");
      String json = "{\"name\":" + String(servoNumber) + ",\"isOn\":" + String(true) + "}";
      server.send(200, "application/json", json);
    } else {
      Serial.println("Number parameter is wrong");
      server.sendHeader("Access-Control-Allow-Origin", "*");
      server.send(400, "text/plain", "Servo " + String(servoNumber) + " does not exist");
    }
  } else {
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.send(400, "text/plain", "Number parameter is missing");
  }
}

void handleServoOff() {
  if (server.hasArg("servo")) {
    int servoNumber = server.arg("servo").toInt();
    if (servoNumber == 1) {
      isServo1 = false;
    } else if (servoNumber == 2) {
      isServo2 = false;
    } else if (servoNumber == 3) {
      isServo3 = false;
    } else if (servoNumber == 4) {
      isServo4 = false;
    }


    if (rotate(servoNumber, 0)) {
      Serial.println("Servo " + String(servoNumber) + " is off");
      server.sendHeader("Access-Control-Allow-Origin", "*");
      String json = "{\"name\":" + String(servoNumber) + ",\"isOn\":" + String(false) + "}";
      server.send(200, "application/json", json);
    } else {
      Serial.println("Number parameter is wrong");
      server.sendHeader("Access-Control-Allow-Origin", "*");
      server.send(400, "text/plain", "Servo " + String(servoNumber) + " does not exist");
    }
  } else {
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.send(400, "text/plain", "Number parameter is missing");
  }
}

void handleServoState() {
  String json = "{\"servos\":[{\"name\":1,\"isOn\":" + String(isServo1) + "}," + "{\"name\":2,\"isOn\":" + String(isServo2) + "}," + "{\"name\":3,\"isOn\":" + String(isServo3) + "}," + "{\"name\":4,\"isOn\":" + String(isServo4) + "}],\"led\":" + String(led) + "}";
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "application/json", json);
}

void handleLed() {
  led = !led;
  String json = "{}";
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "application/json", json);
}


void handleRoot() {
  server.sendHeader("Content-Encoding", "gzip");
  server.send_P(200, "text/html", (const char*)angular_gz, angular_gz_len);
}

void setup() {
  pinMode(LED, OUTPUT);
  delay(100);
  servo1.attach(12);
  delay(100);
  servo2.attach(14);
  delay(100);
  servo3.attach(27);
  delay(100);
  servo4.attach(33);
  delay(100);
  Serial.begin(115200);

  WiFi.mode(WIFI_STA);  // explicitly set mode, esp defaults to STA+AP
  pinMode(TRIGGER_PIN, INPUT_PULLUP);
  WiFiManager wm;
  // wm.resetSettings();
  bool res = wm.autoConnect("Servo", "256722shiro");
  if (!res) {
    Serial.println("Failed to connect");
  } else {
    Serial.println("connected...yeey :)");
  }

  server.on("/Servo/on", HTTP_GET, handleServoOn);
  server.on("/Servo/off", HTTP_GET, handleServoOff);
  server.on("/Servo", HTTP_GET, handleServoState);
  server.on("/led", HTTP_GET, handleLed);
  server.on("/", HTTP_GET, handleRoot);

  server.begin();
  Serial.println("Server started");
}

void loop() {
  if (led) {
    digitalWrite(LED, HIGH);
  } else {
    digitalWrite(LED, LOW);
  }
  delay(100);
  server.handleClient();
  if (digitalRead(TRIGGER_PIN) == HIGH) {
    WiFiManager wm;

    //reset settings - for testing
    //wm.resetSettings();

    // set configportal timeout
    wm.setConfigPortalTimeout(timeout);


    if (!wm.startConfigPortal("OnDemandAP")) {
      Serial.println("failed to connect and hit timeout");
      delay(3000);
      //reset and try again, or maybe put it to deep sleep
      ESP.restart();
      delay(5000);
    }
  }
}