/**
 * Modelo de datos que representa una cita.
 * Cada cita tiene un identificador, una frase y un autor.
 * Es utilizado por los servicios y componentes de la aplicación.
 */

export interface Cita {
  id?: number;
  frase: string;
  autor: string;
}