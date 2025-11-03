/**
 * Página de inicio.
 * Muestra una cita aleatoria y permite eliminarla si la configuración lo permite.
 * Se comunica con los servicios de configuración y citas.
 */

import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { Cita } from 'src/app/modelo/cita';
import { CitasService } from 'src/app/servicios/citas.service';
import { Component, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
  IonContent, IonFab, IonFabButton
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { settingsOutline, addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    RouterModule, CommonModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonIcon, IonContent, IonFab, IonFabButton
  ]
})
export class HomePage implements OnInit {

  cita!: Cita;
  permitirBorrarInicio = false;

  constructor(
    private citasService: CitasService,
    private configuracionService: ConfiguracionService
  ) {
    addIcons({ settingsOutline, addOutline });
  }

  async ngOnInit() {
    await this.actualizar();
  }

  async ionViewWillEnter() {
    await this.actualizar();
  }

  async actualizar() {
    const cita = await this.citasService.getCitaAleatoria();
    this.cita = cita ?? { frase: 'No hay citas disponibles', autor: '—' };
    this.permitirBorrarInicio = await this.configuracionService.getPermitirBorrarInicio();
  }

  eliminarCitaActual() {
    if (!this.cita?.id) return;
    this.citasService.eliminarCita(this.cita.id);
    this.actualizar();
  }
}
