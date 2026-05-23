import EscenaNivel from '../base/escenaNivel.js';

export default class Nivel2 extends EscenaNivel {
    constructor() {
    super({ key: 'Nivel2' });

    this.siguienteNivel = 'Nivel3';
    }
}