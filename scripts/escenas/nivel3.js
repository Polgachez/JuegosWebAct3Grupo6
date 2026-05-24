
import EscenaNivel from '../base/escenaNivel.js';

export default class Nivel3 extends EscenaNivel {
    constructor() {
        super({ key: 'Nivel3' });

        this.siguienteNivel = 'Nivel4';
    }

create() {
        super.create();

        this.totalGemas = 4;
        this.textoPuntos.setText('Gemas: 0/4');

        this.crearSueloNivel3();
        this.crearPlataformasNivel3();
        this.crearEscalerasNivel3();
        this.crearObstaculosNivel3();
        this.crearGemasNivel3();
        this.crearMetaYLlave(740, 70, 30, 45);
        this.crearEnemigosNivel3();

        this.crearJugador(70, 500);

        this.crearColisiones();
    }

    crearSueloNivel3() {
        const escalaTile = 0.5;
        const separacion = 64 * escalaTile;
        const ySuelo = 580;

        for (let x = 16; x <= 820; x += separacion) {
            if (x > 320 && x < 480) {
                this.lava.create(x, ySuelo, 'lava')
                    .setScale(escalaTile)
                    .refreshBody();
            } else {
                this.plataformas.create(x, ySuelo, 'top')
                    .setScale(escalaTile)
                    .refreshBody();
            }
        }
    }

    crearPlataformasNivel3() {
        this.crearPlataformaFija(700, 125, 5);
        this.crearNubesNivel3();
    }

    crearNubesNivel3() {
        const escalaNube = 0.4;

        this.nubes.create(150, 140, 'nube').setScale(escalaNube);
        this.nubes.create(300, 140, 'nube').setScale(escalaNube);
        this.nubes.create(580, 140, 'nube').setScale(escalaNube);
        this.nubes.create(470, 140, 'nube').setScale(escalaNube);

        this.nubes.children.iterate((nube) => {
            nube.refreshBody();
        });
    }

    crearEscalerasNivel3() {
        this.crearEscalera(140, 545);
        this.crearEscalera(40, 300);
        this.crearEscalera(310, 455);
        this.crearEscalera(680, 450);

    }

    crearObstaculosNivel3() {
        this.cactus.create(240, 520, 'cactus')
            .setScale(0.45)
            .refreshBody();

        this.cactus.create(550, 520, 'cactus')
            .setScale(0.45)
            .refreshBody();

        this.cactus.create(700, 520, 'cactus')
            .setScale(0.45)
            .refreshBody();


    }

    crearGemasNivel3() {
        this.crearGema(140, 390);
        this.crearGema(310, 300);
        this.crearGema(680, 230);
        this.crearGema(750, 520);



    }

    crearEnemigosNivel3() {
        this.crearAbejaHorizontal(220, 320, 180, 430);



        this.crearAbejaVertical(600, 180, 60, 300);
    }
}