import EscenaNivel from '../base/escenaNivel.js';

export default class Nivel2 extends EscenaNivel {
    constructor() {
    super({ key: 'Nivel2' });

    this.siguienteNivel = 'Nivel3';
    }
    preload() {
        // Fondos
        this.load.image('cielo', 'assets/tiles/background_solid_cloud.png');
        this.load.image('desierto', 'assets/tiles/background_color_trees.png');

        // Terreno
        this.load.image('top_left', 'assets/items/terrain_grass_block_top_left.png');
        this.load.image('top', 'assets/items/terrain_grass_block_top.png');
        this.load.image('top_right', 'assets/items/terrain_grass_block_top_right.png');
        this.load.image('bloque', 'assets/items/terrain_grass_block.png');
        this.load.image('nube', 'assets/items/terrain_grass_cloud.png');

        // Plataformas
        this.load.image('movil_left', 'assets/items/terrain_grass_horizontal_overhang_left.png');
        this.load.image('movil_right', 'assets/items/terrain_grass_horizontal_overhang_right.png');
        this.load.image('horizontal_left', 'assets/items/terrain_grass_horizontal_left.png');
        this.load.image('horizontal_middle', 'assets/items/terrain_grass_horizontal_middle.png');
        this.load.image('horizontal_right', 'assets/items/terrain_grass_horizontal_right.png');

        // Obstáculos
        this.load.image('lava', 'assets/items/water_top.png');
        this.load.image('arbusto', 'assets/items/bush.png');
        this.load.image('pinchos', 'assets/items/spikes.png');

        // Escaleras
        this.load.image('ladder_bottom', 'assets/items/ladder_bottom.png');
        this.load.image('ladder_middle', 'assets/items/ladder_middle.png');
        this.load.image('ladder_top', 'assets/items/ladder_top.png');

        // Jugador
        this.load.image('jugador_idle', 'assets/player/character_green_idle.png');
        this.load.image('jugador_walk1', 'assets/player/character_green_walk_a.png');
        this.load.image('jugador_walk2', 'assets/player/character_green_walk_b.png');
        this.load.image('jugador_jump', 'assets/player/character_green_jump.png');
        this.load.image('jugador_climb', 'assets/player/character_green_climb_a.png');

        // Objetos
        this.load.image('gema', 'assets/items/gem_green.png');
        this.load.image('llave', 'assets/items/key_green.png');
        this.load.image('puerta_cerrada', 'assets/items/door_closed_top.png');
        this.load.image('puerta_abierta', 'assets/items/door_open_top.png');

        // Enemigos
        this.load.image('bee_a', 'assets/enemy/bee_a.png');
        this.load.image('bee_b', 'assets/enemy/bee_b.png');
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
        this.crearMetaYLlave(750, 65, 50, 450);
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
        this.crearPlataformaFija(540, 350, 3);
        this.crearPlataformaFija(30, 350, 3);
        this.crearPlataformaFija(690, 125, 2);
        this.crearPlataformaFija(275, 145, 0);
        this.crearPlataformaFija(500, 145, 0);

        this.crearPlataformaMovilOriginal();
        this.crearNubesFalsasOriginales();
    }

    crearPlataformaMovilOriginal() {
        const escala = 0.5;
        const y = 340;
        const xInicial = 380;
        const separacion = 63;

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
       /* const escalaNube = 0.4;
        const yNube = 130;

        this.nubes.create(285, yNube, 'nube').setScale(escalaNube);
        this.nubes.create(415, yNube, 'nube').setScale(escalaNube);
        this.nubes.create(545, yNube, 'nube').setScale(escalaNube);

        this.nubes.children.iterate((nube) => {
            nube.refreshBody();
        });*/
    }

    crearGemasOriginales() {
        this.crearGema(30, 60);
        this.crearGema(330, 450);
        this.crearGema(630, 500);
        this.crearGema(350, 220);
        this.crearGema(550, 285);
    }

    crearEnemigosOriginales() {
        this.crearAbejaHorizontal(240, 230, 240, 500);
        this.crearAbejaHorizontal(240, 20, 100, 580);
    }
}