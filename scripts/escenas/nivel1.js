import EscenaNivel from '../base/escenaNivel.js';

export default class Nivel1 extends EscenaNivel {
    constructor() {
        super({ key: 'Nivel1' });

        this.siguienteNivel = 'Nivel2';
    }

    create() {
        super.create();

        this.totalGemas = 6;
        this.textoPuntos.setText('Gemas: 0/6');

        this.crearSueloOriginal();
        this.crearObstaculosOriginales();
        this.crearEscalerasOriginales();
        this.crearPlataformasOriginales();
        this.crearGemasOriginales();
        this.crearMetaYLlave(750, 65, 30, 45);
        this.crearEnemigosOriginales();

        this.crearJugador(100, 450);

        this.crearColisiones();
    }

    crearSueloOriginal() {
        const escalaTile = 0.5;
        const separacion = 64 * escalaTile;
        const ySuelo = 580;
        let xSuelo = 16;

        for (let i = 0; i < 7; i++) {
            this.plataformas.create(xSuelo, ySuelo, 'top')
                .setScale(escalaTile)
                .refreshBody();

            xSuelo += separacion;
        }

        this.plataformas.create(xSuelo, ySuelo, 'top_right')
            .setScale(escalaTile)
            .refreshBody();

        xSuelo += separacion * 2;

        for (let i = 0; i < 2; i++) {
            this.lava.create(xSuelo, ySuelo, 'lava')
                .setScale(escalaTile)
                .refreshBody();

            xSuelo += separacion * 2;
        }

        this.plataformas.create(xSuelo, ySuelo, 'top_left')
            .setScale(escalaTile)
            .refreshBody();

        xSuelo += separacion;

        while (xSuelo <= 820) {
            this.plataformas.create(xSuelo, ySuelo, 'top')
                .setScale(escalaTile)
                .refreshBody();

            xSuelo += separacion;
        }
    }

    crearObstaculosOriginales() {
        this.cactus.create(485, 520, 'cactus')
            .setScale(0.45)
            .refreshBody();

        this.cactus.create(190, 520, 'cactus')
            .setScale(0.45)
            .refreshBody();

        const pincho1 = this.pinchos.create(605, 280, 'pinchos')
            .setScale(0.45)
            .refreshBody();

        const pincho2 = this.pinchos.create(80, 280, 'pinchos')
            .setScale(0.45)
            .refreshBody();

        this.ajustarColliderPincho(pincho1);
        this.ajustarColliderPincho(pincho2);
    }

    crearEscalerasOriginales() {
        this.crearEscalera(760, 545);
        this.crearEscalera(138, 308);

        this.plataformas.create(30, 95, 'bloque')
            .setScale(0.4)
            .refreshBody();
    }

    crearPlataformasOriginales() {
        this.crearPlataformaFija(540, 340, 3);
        this.crearPlataformaFija(50, 340, 2);
        this.crearPlataformaFija(690, 125, 2);

        this.crearPlataformaMovilOriginal();
        this.crearNubesFalsasOriginales();
    }

    crearPlataformaMovilOriginal() {
        const escala = 0.5;
        const y = 340;
        const xInicial = 380;
        const separacion = 43;

        this.movilLeft = this.plataformasMoviles.create(xInicial, y, 'movil_left')
            .setScale(escala)
            .setImmovable(true);

        this.movilRight = this.plataformasMoviles.create(xInicial + separacion, y, 'movil_right')
            .setScale(escala)
            .setImmovable(true);

        this.movilLeft.body.allowGravity = false;
        this.movilRight.body.allowGravity = false;

        this.movilDireccion = 1;
    }

    crearNubesFalsasOriginales() {
        const escalaNube = 0.4;
        const yNube = 130;

        this.nubes.create(285, yNube, 'nube').setScale(escalaNube);
        this.nubes.create(415, yNube, 'nube').setScale(escalaNube);
        this.nubes.create(545, yNube, 'nube').setScale(escalaNube);

        this.nubes.children.iterate((nube) => {
            nube.refreshBody();
        });
    }

    crearGemasOriginales() {
        this.crearGema(33, 210);
        this.crearGema(245, 500);
        this.crearGema(430, 500);
        this.crearGema(630, 500);
        this.crearGema(350, 210);
        this.crearGema(550, 285);
    }

    crearEnemigosOriginales() {
        this.crearAbejaVertical(85, 240, 40, 240);
        this.crearAbejaVertical(350, 200, 40, 260);
        this.crearAbejaVertical(480, 160, 40, 260);
        this.crearAbejaHorizontal(1, 450, 90, 800);
    }
}