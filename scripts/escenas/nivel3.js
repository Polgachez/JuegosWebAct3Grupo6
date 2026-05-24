
import EscenaNivel from '../base/escenaNivel.js';

export default class Nivel3 extends EscenaNivel {
    constructor() {
        super({ key: 'Nivel3' });

        this.siguienteNivel = 'Nivel4';
    }


}