import { Injectable } from '@angular/core';
import { MqttClient } from 'mqtt/*';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public mqttClient: MqttClient | null = null;

  constructor() { }
}
