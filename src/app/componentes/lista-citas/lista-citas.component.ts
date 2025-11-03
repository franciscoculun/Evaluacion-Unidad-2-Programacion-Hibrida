/**
 * Componente que muestra la lista completa de citas.
 * Emite un evento al eliminar una cita para que el componente padre actualice la vista.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cita } from 'src/app/modelo/cita';
import { CitasService } from 'src/app/servicios/citas.service';
import { IonList, IonItem, IonButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.scss'],
  standalone: true,
  imports: [CommonModule, IonList, IonItem, IonButton, IonIcon, IonLabel]
})
export class ListaCitasComponent {
  @Input() citas: Cita[] = [];
  @Output() onEliminar = new EventEmitter<number>();

  constructor(private citasService: CitasService) {
    addIcons({ trashOutline });
  }

  async eliminarCita(id: number) {
    await this.citasService.eliminarCita(id);
    this.onEliminar.emit(id);
  }
}
