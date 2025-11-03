/**
 * Servicio principal que maneja la lógica de las citas.
 * Se comunica con el servicio SQLite para guardar y recuperar los datos.
 * También permite obtener una cita aleatoria.
 */

import { Injectable } from '@angular/core';
import { Cita } from '../modelo/cita';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(private sqliteService: SqliteService) {}

  async getCitas(): Promise<Cita[]> {
    return await this.sqliteService.obtenerTodos();
  }

  async agregarCita(cita: Cita) {
    await this.sqliteService.insertar(cita);
  }

  async eliminarCita(id: number) {
    await this.sqliteService.eliminar(id);
  }

  async getCitaAleatoria(): Promise<Cita | null> {
    const citas = await this.getCitas();
    if (!citas || citas.length === 0) {
      return null;
    }
    const index = Math.floor(Math.random() * citas.length);
    return citas[index];
  }
}
