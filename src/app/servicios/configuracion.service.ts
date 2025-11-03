/**
 * Servicio que gestiona la configuración de la aplicación.
 * Usa el plugin Preferences para guardar si se permite o no eliminar citas desde la pantalla de inicio.
 * Los datos se mantienen al cerrar y volver a abrir la app.
 */

import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  private readonly KEY_BORRAR_INICIO = 'permitir_borrar_inicio';
  private permitirBorrarInicio: boolean = false;

  constructor() {
    this.cargarConfiguracion();
  }

  // Guarda el valor en memoria y en almacenamiento
  async setPermitirBorrarInicio(valor: boolean) {
    this.permitirBorrarInicio = valor;
    await Preferences.set({
      key: this.KEY_BORRAR_INICIO,
      value: JSON.stringify(valor)
    });
  }

  getPermitirBorrarInicio(): boolean {
    return this.permitirBorrarInicio;
  }

  // Cargar configuración al iniciar la app
  async cargarConfiguracion() {
    const { value } = await Preferences.get({ key: this.KEY_BORRAR_INICIO });
    if (value !== null) {
      this.permitirBorrarInicio = JSON.parse(value);
    }
  }
}
