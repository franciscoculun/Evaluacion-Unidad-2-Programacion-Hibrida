/**
 * Página de configuración.
 * Permite activar o desactivar la opción para eliminar citas desde el inicio.
 * Guarda el valor de manera persistente con Preferences.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonItem, IonLabel, IonToggle
} from '@ionic/angular/standalone';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonContent, IonItem, IonLabel, IonToggle
  ]
})
export class ConfigPage implements OnInit {

  permitirEliminarInicio = false;

  constructor(private configService: ConfiguracionService) {}

  async ngOnInit() {
    await this.configService.cargarConfiguracion();
    this.permitirEliminarInicio = this.configService.getPermitirBorrarInicio();
  }

  async onToggleChange() {
    await this.configService.setPermitirBorrarInicio(this.permitirEliminarInicio);
  }
}
