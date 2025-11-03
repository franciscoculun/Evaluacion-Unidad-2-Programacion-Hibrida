import { Injectable } from '@angular/core';
import { SqliteService } from './sqlite.service';
import { Cita } from '../modelo/cita';

@Injectable({
  providedIn: 'root'
})
export class CitaDbService {

  constructor(private sqliteService: SqliteService) {}

  /** Obtiene todas las citas desde la base de datos */
  async getCitas(): Promise<Cita[]> {
    const result = await this.sqliteService.db.query('SELECT * FROM citas');
    return result.values as Cita[];
  }

  /** Agrega una nueva cita */
  async agregarCita(cita: Cita): Promise<void> {
    const sql = 'INSERT INTO citas (frase, autor) VALUES (?, ?)';
    await this.sqliteService.db.run(sql, [cita.frase, cita.autor]);
  }

  /** Elimina una cita por su id */
  async eliminarCita(id: number): Promise<void> {
    const sql = 'DELETE FROM citas WHERE id = ?';
    await this.sqliteService.db.run(sql, [id]);
  }
}
