import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings/settings.service';
import mqtt, { MqttClient } from 'mqtt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private readonly settingsService: SettingsService,
    private router: Router){ 
      
    }

  ngOnInit(): void {
  }

  protected ip: string = '';
  protected port: string = '1883';
  protected mqttClient: MqttClient | null = null;

  protected async connect(): Promise<void> {
    this.mqttClient = mqtt.connect(`ws://${this.ip}:${this.port}`, {
      protocol: 'ws'
    })
    this.mqttClient.once('connect', () => {
      this.settingsService.mqttClient = this.mqttClient;
      this.router.navigateByUrl('dashboard');
    })
  }

}
