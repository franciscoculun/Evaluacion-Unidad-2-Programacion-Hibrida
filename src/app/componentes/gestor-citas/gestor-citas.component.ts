/**
 * Componente contenedor/gestor de citas.
 * Orquesta el formulario (agregar) y la lista (ver/eliminar).
 * Se apoya en CitasService para persistir y recuperar datos, sin cambiar diseño.
 */

import { Component, OnInit } from '@angular/core';
import { CitasService } from 'src/app/servicios/citas.service';
import { Cita } from 'src/app/modelo/cita';
import { FormularioCitaComponent } from '../formulario-cita/formulario-cita.component';
import { ListaCitasComponent } from '../lista-citas/lista-citas.component';
import { IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestor-citas',
  templateUrl: './gestor-citas.component.html',
  styleUrls: ['./gestor-citas.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCard, IonCardHeader, IonCardTitle, FormularioCitaComponent, ListaCitasComponent]
})
export class GestorCitasComponent implements OnInit {
  citas: Cita[] = [];

  constructor(private citasService: CitasService) {}

  async ngOnInit() {
    await this.cargarCitas();
  }

  async cargarCitas() {
    this.citas = await this.citasService.getCitas();
  }

  async agregarCita(event: { frase: string; autor: string }) {
    await this.citasService.agregarCita({ frase: event.frase, autor: event.autor });
    await this.cargarCitas();
  }

  eliminarCita(id: number) {
  this.citasService.eliminarCita(id);
  this.citasService.getCitas().then(citas => this.citas = citas);
}

}
