#include <ESP32Servo.h>

Servo servo1;  // Створюємо об'єкт Servo для керування сервомотором на піні 12
Servo servo2;  // Створюємо об'єкт Servo для керування сервомотором на піні 14
Servo servo3;  // Створюємо об'єкт Servo для керування сервомотором на піні 27
Servo servo4;  // Створюємо об'єкт Servo для керування сервомотором на піні 26

bool isServo1;

void setup() {
  servo1.attach(12);  // Приєднуємо сервомотор до піна 12
  servo2.attach(14);  // Приєднуємо сервомотор до піна 14
  servo3.attach(27);  // Приєднуємо сервомотор до піна 27
  servo4.attach(33);  // Приєднуємо сервомотор до піна 26
  Serial.begin(115200);
}

void loop() { 
  if (isServo1){
    servo1.write(90);
    Serial.println("90 Градусів");
  }
  else {
    servo1.write(0);
     Serial.println("0 Градусів");
  }
  isServo1=!isServo1;

  // servo2.write(60);  
  // servo3.write(40);  
  // servo4.write(80);  

  delay(1000);  // Затримка 1 секунда (1000 мілісекунд)
}