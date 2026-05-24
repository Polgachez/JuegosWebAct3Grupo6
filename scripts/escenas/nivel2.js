import EscenaNivel from '../base/escenaNivel.js';

export default class Nivel2 extends EscenaNivel {
    constructor() {
    super({ key: 'Nivel2' });

    this.siguienteNivel = 'Nivel3';
    }

    create() {
        super.create();

        this.totalGemas = 4;
        this.textoPuntos.setText('Gemas: 0/4');

        this.crearSueloNivel2();
        this.crearPlataformasNivel2();
        this.crearEscalerasNivel2();
        this.crearObstaculosNivel2();
        this.crearGemasNivel2();
        this.crearMetaYLlave(740, 70, 30, 45, 'llave_amarilla');
        this.crearEnemigosNivel2();

        this.crearJugador(70, 500);

        this.crearColisiones();
    }

    crearSueloNivel2() {
    const escalaTile = 0.5;
    const separacion = 64 * escalaTile;
    const ySuelo = 580;
    let xSuelo = 16;

    // Suelo izquierdo
    while (xSuelo < 300) {
        this.plataformas.create(xSuelo, ySuelo, 'top')
            .setScale(escalaTile)
            .refreshBody();

        xSuelo += separacion;
    }

    // Mover zona de lava un poco a la izquierda
    xSuelo -= 20;

    // Borde izquierdo de la lava
    this.plataformas.create(xSuelo, ySuelo, 'top_right')
        .setScale(escalaTile)
        .refreshBody();

    xSuelo += separacion * 2;

    // Lava: 2 tiles
    for (let i = 0; i < 2; i++) {
        this.lava.create(xSuelo, ySuelo, 'lava')
            .setScale(escalaTile)
            .refreshBody();

        xSuelo += separacion * 2;
    }

    // Borde derecho de la lava
    this.plataformas.create(xSuelo, ySuelo, 'top_left')
        .setScale(escalaTile)
        .refreshBody();

    xSuelo += separacion;

    // Suelo derecho
    while (xSuelo <= 820) {
        this.plataformas.create(xSuelo, ySuelo, 'top')
            .setScale(escalaTile)
            .refreshBody();

        xSuelo += separacion;
    }
}

    crearPlataformasNivel2() {
        this.crearPlataformaFija(700, 125, 5);
        this.crearNubesNivel2();
    }

    crearNubesNivel2() {
        const escalaNube = 0.4;

        this.nubes.create(150, 140, 'nube').setScale(escalaNube);
        this.nubes.create(300, 140, 'nube').setScale(escalaNube);
        this.nubes.create(580, 140, 'nube').setScale(escalaNube);
        this.nubes.create(470, 140, 'nube').setScale(escalaNube);

        this.nubes.children.iterate((nube) => {
            nube.refreshBody();
        });
    }

    crearEscalerasNivel2() {
        this.crearEscalera(140, 545);
        this.crearEscalera(40, 300);
        this.crearEscalera(310, 455);
        this.crearEscalera(680, 450);

    }

    crearObstaculosNivel2() {
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

    crearGemasNivel2() {
        this.crearGemaAmarilla(140, 390);
        this.crearGemaAmarilla(310, 300);
        this.crearGemaAmarilla(680, 230);
        this.crearGemaAmarilla(750, 520);
    }

    crearGemaAmarilla(x, y) {
        return this.gemas.create(x, y, 'gema_amarilla')
            .setScale(0.4)
            .refreshBody();
    }

    crearEnemigosNivel2() {
        this.crearAbejaHorizontal(220, 320, 180, 430);



        this.crearAbejaVertical(600, 180, 60, 300);
    }
}