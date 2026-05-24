import EscenaNivel from '../base/escenaNivel.js';

export default class Nivel1 extends EscenaNivel {
    constructor() {
        super({ key: 'Nivel1' });

        this.siguienteNivel = 'Nivel2';
    }

    create() {
        super.create();

        this.totalGemas = 5;
        this.textoPuntos.setText('Gemas: 0/5');

        this.crearSueloOriginal();
        this.crearObstaculosOriginales();
        this.crearEscalerasOriginales();
        this.crearPlataformasOriginales();
        this.crearGemasOriginales();
        this.crearMetaYLlave(750, 65, 50, 450, 'llave_verde');
        this.crearEnemigosOriginales();

        this.crearJugador(100, 500);

        this.crearColisiones();
    }

    
    crearSueloOriginal() {
        const escalaTile = 0.5;
        const separacion = 64 * escalaTile;
        const ySuelo = 580;
        let xSuelo = 16;

        for (let i = 0; i < 7; i++) {
            this.plataformas.create(xSuelo, ySuelo, 'grass_top')
                .setScale(escalaTile)
                .refreshBody();

            xSuelo += separacion;
        }

        this.plataformas.create(xSuelo, ySuelo, 'grass_top_right')
            .setScale(escalaTile)
            .refreshBody();

        xSuelo += separacion * 2;

        for (let i = 0; i < 2; i++) {
            this.lava.create(xSuelo, ySuelo, 'agua')
                .setScale(escalaTile)
                .refreshBody();

            xSuelo += separacion * 2;
        }

        this.plataformas.create(xSuelo, ySuelo, 'grass_top_left')
            .setScale(escalaTile)
            .refreshBody();

        xSuelo += separacion;

        while (xSuelo <= 820) {
            this.plataformas.create(xSuelo, ySuelo, 'grass_top')
                .setScale(escalaTile)
                .refreshBody();

            xSuelo += separacion;
        }
    }

    crearPlataformaFijaVerde(xInicial, y, piezasCentro) {
        const escala = 0.5;
        const separacion = 32;
        let x = xInicial;

        this.plataformas.create(x, y, 'grass_horizontal_left')
            .setScale(escala)
            .refreshBody();

        x += separacion;

        for (let i = 0; i < piezasCentro; i++) {
            this.plataformas.create(x, y, 'grass_horizontal_middle')
                .setScale(escala)
                .refreshBody();

            x += separacion;
        }

        this.plataformas.create(x, y, 'grass_horizontal_right')
            .setScale(escala)
            .refreshBody();
    }

    crearObstaculosOriginales() {
        const arbusto = this.pinchos.create(530, 520, 'arbusto')
            .setScale(0.45)
            .refreshBody();

        const pincho1 = this.pinchos.create(605, 290, 'pinchos')
            .setScale(0.45)
            .refreshBody();

        const pincho2 = this.pinchos.create(80, 290, 'pinchos')
            .setScale(0.45)
            .refreshBody();

        this.ajustarColliderPincho(arbusto);
        this.ajustarColliderPincho(pincho1);
        this.ajustarColliderPincho(pincho2);
    }

    crearEscalerasOriginales() {
        this.crearEscalera(760, 545);
        this.crearEscalera(138, 318);
    }

    crearPlataformasOriginales() {
        this.crearPlataformaFijaVerde(540, 350, 3);
        this.crearPlataformaFijaVerde(30, 350, 3);
        this.crearPlataformaFijaVerde(690, 125, 2);
        this.crearPlataformaFijaVerde(275, 145, 0);
        this.crearPlataformaFijaVerde(500, 145, 0);

        this.crearPlataformaMovilOriginal();
        this.crearNubesFalsasOriginales();
    }

    crearPlataformaMovilOriginal() {
        const escala = 0.5;
        const y = 340;
        const xInicial = 380;
        const separacion = 63;

        this.movilLeft = this.plataformasMoviles.create(xInicial, y, 'grass_movil_left')
            .setScale(escala)
            .setImmovable(true);

        this.movilRight = this.plataformasMoviles.create(xInicial + separacion, y, 'grass_movil_right')
            .setScale(escala)
            .setImmovable(true);

        this.movilLeft.body.allowGravity = false;
        this.movilRight.body.allowGravity = false;

        this.movilDireccion = 1;
    }

    crearNubesFalsasOriginales() {
    }

    crearGemasOriginales() {
        this.crearGemaVerde(30, 60);
        this.crearGemaVerde(330, 450);
        this.crearGemaVerde(630, 500);
        this.crearGemaVerde(350, 220);
        this.crearGemaVerde(550, 285);
    }

    crearGemaVerde(x, y) {
    return this.gemas.create(x, y, 'gema_verde')
        .setScale(0.4)
        .refreshBody();
}

    crearEnemigosOriginales() {
        this.crearAbejaHorizontal(240, 230, 240, 500);
        this.crearAbejaHorizontal(240, 20, 100, 580);
    }
}