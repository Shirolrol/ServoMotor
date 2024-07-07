#include <ESP32Servo.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>

Servo servo1;  // Створюємо об'єкт Servo для керування сервомотором на піні 12
Servo servo2;  // Створюємо об'єкт Servo для керування сервомотором на піні 14
Servo servo3;  // Створюємо об'єкт Servo для керування сервомотором на піні 27
Servo servo4;  // Створюємо об'єкт Servo для керування сервомотором на піні 26

bool isServo1;
bool isServo2;
bool isServo3;
bool isServo4;

// Задайте свої параметри Wi-Fi
const char* ssid = "TP-Link _B4C0";
const char* password = "21012101";

// Створення об'єкта веб-сервера на порту 80
// AsyncWebServer server(80);


void setup() {
  servo1.attach(12);  // Приєднуємо сервомотор до піна 12
  delay(100);
  servo2.attach(14);  // Приєднуємо сервомотор до піна 14
  delay(100);
  servo3.attach(27);  // Приєднуємо сервомотор до піна 27
  delay(100);
  servo4.attach(33);  // Приєднуємо сервомотор до піна 26
  delay(100);
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Вивід IP-адреси в серійний монітор
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
  delay(100);
  // Налаштування маршруту для GET-запиту
  // server.on("/Servo/1/on", HTTP_GET, [](AsyncWebServerRequest* request) {
  //   Serial.println("/Servo/1/on ");
  //     servo1.write(90);  // Поверніть сервомотор на 90 градусів
  //   request->send(200, "text/plain", "Servo is on");
  // });
  // Запуск сервера
  // server.begin();
}

void loop() {
}