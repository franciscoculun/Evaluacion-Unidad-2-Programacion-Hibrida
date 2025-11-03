/**
 * Componente de formulario para crear una nueva cita.
 * Expone un @Output (onCitaAgregada) para notificar al padre cuando se agrega una cita válida.
 * Incluye validaciones básicas (requerido y mínimos) usando Template-driven Forms.
 */

import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IonInput, IonButton, IonItem, IonList, IonIcon, IonLabel, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-cita',
  templateUrl: './formulario-cita.component.html',
  standalone: true,
  imports: [CommonModule, IonIcon, FormsModule, IonList, IonItem, IonInput, IonButton, IonText]
})
export class FormularioCitaComponent {
  frase: string = '';
  autor: string = '';

  @Output() onCitaAgregada = new EventEmitter<{ frase: string; autor: string }>();

  constructor() {
    addIcons({ addCircleOutline });
  }

  agregarCita(form: NgForm) {
    if (form.valid) {
      this.onCitaAgregada.emit({ frase: this.frase, autor: this.autor });
      this.frase = '';
      this.autor = '';
      form.resetForm();
    }
  }
}
