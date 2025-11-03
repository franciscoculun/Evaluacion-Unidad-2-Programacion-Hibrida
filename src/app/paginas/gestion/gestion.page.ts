/**
 * Página que permite gestionar las citas existentes.
 * Contiene el formulario para agregar nuevas y muestra la lista completa.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent } from '@ionic/angular/standalone';
import { GestorCitasComponent } from 'src/app/componentes/gestor-citas/gestor-citas.component';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.page.html',
  styleUrls: ['./gestion.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent,
    GestorCitasComponent 
  ]
})
export class GestionPage {}

