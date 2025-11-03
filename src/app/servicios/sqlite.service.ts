/**
 * Servicio encargado de manejar la conexión y operaciones con la base de datos SQLite.
 * Permite crear la base de datos, insertar, obtener y eliminar citas.
 */


import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { Cita } from '../modelo/cita';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private platform: string = '';
  iniciado: boolean = false;

  private readonly DB_NAME = 'citas_db';
  private readonly DB_VERSION = 1;
  private readonly DB_ENCRYPTION = false;
  private readonly DB_MODE = 'no-encryption';
  private readonly DB_READ_ONLY = false;

  private readonly DB_TABLE_NAME = 'citas';
  private readonly DB_COL_ID = 'id';
  private readonly DB_COL_FRASE = 'frase';
  private readonly DB_COL_AUTOR = 'autor';

  private readonly DB_SQL_TABLES = `
    CREATE TABLE IF NOT EXISTS ${this.DB_TABLE_NAME}(
      ${this.DB_COL_ID} INTEGER PRIMARY KEY AUTOINCREMENT,
      ${this.DB_COL_FRASE} TEXT NOT NULL,
      ${this.DB_COL_AUTOR} TEXT NOT NULL
    );
  `;

  constructor() {}

  async iniciarPlugin() {
  try {
    console.log("SqliteService::iniciarPlugin");
    this.platform = Capacitor.getPlatform();

    if (this.platform === 'web') {
      await customElements.whenDefined('jeep-sqlite');
      const jeepSqliteEl = document.querySelector('jeep-sqlite');
      if (jeepSqliteEl) {
        console.log("SqliteService::initWebStore()");
        await this.sqlite.initWebStore();
      }
    }

    // Crear conexión o recuperar existente
    const ret = await this.sqlite.checkConnectionsConsistency();
    const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result;
    if (ret.result && isConn) {
      this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY);
    } else {
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        this.DB_ENCRYPTION,
        this.DB_MODE,
        this.DB_VERSION,
        this.DB_READ_ONLY
      );
    }

    await this.db.open();
    await this.db.execute(this.DB_SQL_TABLES);

    // Insertar citas por defecto si no existen
    const { values } = await this.db.query(`SELECT COUNT(*) as total FROM ${this.DB_TABLE_NAME}`);
    const total = values?.[0]?.total ?? 0;

    if (total === 0) {
      console.log("Insertando citas por defecto...");
      await this.insertar({ frase: "El éxito consiste en obtener lo que se desea. La felicidad en disfrutar lo que se obtiene.", autor: "Ralph Waldo Emerson" });
      await this.insertar({ frase: "Las personas no son recordadas por el número de veces que fracasan, sino por el número de veces que tienen éxito.", autor: "Thomas Edison" });
      await this.insertar({ frase: "Ningún viento es bueno para el barco que no sabe adónde va.", autor: "Séneca" });

      if (this.platform === 'web') {
        await this.sqlite.saveToStore(this.DB_NAME);
      }
    } else {
      console.log("Las citas por defecto ya existen, no se insertan nuevamente.");
    }

    this.iniciado = true;
  } catch (e) {
    console.error(e);
  }
}


  async cerrarConexion() {
    if (this.db) {
      await this.db.close();
    }
  }

  async obtenerTodos(): Promise<Cita[]> {
  if (!this.db) {
    console.warn('Base de datos no inicializada. Llamando iniciarPlugin() automáticamente.');
    await this.iniciarPlugin();
  }

  const sql = `SELECT * FROM ${this.DB_TABLE_NAME}`;
  const resultado = (await this.db.query(sql)).values;
  return resultado ?? [];
}


  async insertar(cita: Cita) {
    const sql = `INSERT INTO ${this.DB_TABLE_NAME}(${this.DB_COL_FRASE}, ${this.DB_COL_AUTOR}) VALUES(?,?)`;
    await this.db.run(sql, [cita.frase, cita.autor]);
  }

  async eliminar(id: number) {
    const sql = `DELETE FROM ${this.DB_TABLE_NAME} WHERE ${this.DB_COL_ID} = ?`;
    await this.db.run(sql, [id]);
  }
}
