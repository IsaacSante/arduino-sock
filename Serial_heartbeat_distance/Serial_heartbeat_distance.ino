#define USE_ARDUINO_INTERRUPTS true    // Set-up low-level interrupts for most acurate BPM math.
#include <PulseSensorPlayground.h>     // Includes the PulseSensorPlayground Library.   

//  Variables
const int PulseWire = 0;       // PulseSensor PURPLE WIRE connected to ANALOG PIN 0          
const int LED13 = 13;          // The on-board Arduino LED, close to PIN 13.

int Threshold = 550;           // Determine which Signal to "count as a heartbeat" and which to ignore.
            
const int trigPin = 9;           //disance sensor pins
const int echoPin = 10; 

float duration, distance;   
                               
PulseSensorPlayground pulseSensor;  // Creates an instance of the PulseSensorPlayground object called "pulseSensor"


void setup() {   
  Serial.begin(9600);            

  pinMode(trigPin, OUTPUT); 
  pinMode(echoPin, INPUT); 
  
  pulseSensor.analogInput(PulseWire);   
  pulseSensor.blinkOnPulse(LED13); //don't worry abt plugging in led, just makes code run smoother       
  pulseSensor.setThreshold(Threshold);   
  
  if (pulseSensor.begin()) {
    Serial.println("PULSENSOR OBJ BEGIN");  //This prints one time at Arduino power-up,  or on Arduino reset.  
  }
 
}



void loop() {
  
    digitalWrite(trigPin, LOW); 
    delayMicroseconds(2); 
    digitalWrite(trigPin, HIGH); 
    delayMicroseconds(10); 
    digitalWrite(trigPin, LOW); 
     
    duration = pulseIn(echoPin, HIGH);
    distance = (duration*.0343)/2;
    
    if (distance<1000){
      Serial.print("DistanceOne");//change to "DistanceTwo" if client 2
      Serial.println(distance);
      delay(1000);                    
    }

    int myBPM = pulseSensor.getBeatsPerMinute();  // Calls function on our pulseSensor object that returns BPM as int

    if (pulseSensor.sawStartOfBeat()) { // if a beat happened print BPM
       Serial.print("Client One");//change to "Client TWO" if client 2
       Serial.println(myBPM);     
    }
      delay(20);               

}

  