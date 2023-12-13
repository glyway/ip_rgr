import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings/settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private readonly settingsService: SettingsService,
    private router: Router){ 

    }
  protected temperature: number = 0;
  protected targetTemperature: number = 0;
  protected power: boolean | null = null;
  protected active: boolean | null = null;

  

  async ngOnInit(): Promise<void> {
    if (this.settingsService.mqttClient === null) {
      this.router.navigateByUrl('welcome');
    }
    else {
      await this.settingsService.mqttClient.subscribeAsync('cooler/+');
      this.settingsService.mqttClient.on('message', this.onMessage.bind(this))
    }
  }

  protected onMessage(topic: string, payload: Buffer): void {
    if (topic === 'cooler/temp'){
      this.temperature =  parseFloat(payload.toString());
    }
    else if (topic === 'cooler/targetTemp'){
      this.targetTemperature =  parseFloat(payload.toString());
    }
    else if (topic === 'cooler/power'){
      this.power =  payload.toString().toLowerCase() === 'true';
    }
    else if (topic === 'cooler/active'){
      this.active =  payload.toString().toLowerCase() === 'true';
    }
  }

  protected onTargetTemperature() {
    if (this.settingsService.mqttClient === null){
      return;
    }
    this.settingsService.mqttClient.publish('cooler/targetTemp', this.targetTemperature?.toFixed(0))
  }

  protected onPower() {
    if (this.settingsService.mqttClient === null){
      return;
    }
    this.power = !this.power;
    this.settingsService.mqttClient.publish('cooler/power', this.power === true ? 'true' : 'false')
  }

  protected async disconnect(): Promise<void> {
    if (this.settingsService.mqttClient === null){
      return;
    }
    await this.settingsService.mqttClient.endAsync();
    this.settingsService.mqttClient = null;
    this.router.navigateByUrl('welcome');
  }

}
