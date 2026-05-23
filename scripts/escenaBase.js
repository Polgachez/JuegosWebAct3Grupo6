import Personaje from './personaje.js';

export default class EscenaBase extends Phaser.Scene {
    constructor() {
        super({ key: 'EscenaBase' });
    }

    preload() {
        // Fondos
        this.load.image('cielo', 'assets/tiles/background_solid_cloud.png');
        this.load.image('desierto', 'assets/tiles/background_color_desert.png');

        // Terreno
        this.load.image('top_left', 'assets/items/terrain_purple_block_top_left.png');
        this.load.image('top', 'assets/items/terrain_purple_block_top.png');
        this.load.image('top_right', 'assets/items/terrain_purple_block_top_right.png');
        this.load.image('bloque', 'assets/items/terrain_purple_block.png');
        this.load.image('nube', 'assets/items/terrain_purple_cloud.png');

        // Plataformas
        this.load.image('movil_left', 'assets/items/terrain_purple_horizontal_overhang_left.png');
        this.load.image('movil_right', 'assets/items/terrain_purple_horizontal_overhang_right.png');
        this.load.image('horizontal_left', 'assets/items/terrain_purple_horizontal_left.png');
        this.load.image('horizontal_middle', 'assets/items/terrain_purple_horizontal_middle.png');
        this.load.image('horizontal_right', 'assets/items/terrain_purple_horizontal_right.png');

        // Obstáculos
        this.load.image('lava', 'assets/items/lava_top.png');
        this.load.image('cactus', 'assets/items/cactus.png');
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
        this.load.image('gema', 'assets/items/gem_red.png');
        this.load.image('llave', 'assets/items/key_red.png');
        this.load.image('puerta_cerrada', 'assets/items/door_closed_top.png');
        this.load.image('puerta_abierta', 'assets/items/door_open_top.png');

        // Enemigos
        this.load.image('bee_a', 'assets/enemy/bee_a.png');
        this.load.image('bee_b', 'assets/enemy/bee_b.png');
    }

    create() {
        this.crearFondo();
        this.iniciarVariables();
        this.crearGrupos();
        this.crearSuelo();
        this.crearObstaculos();
        this.crearEscaleras();
        this.crearPlataformas();
        this.crearGemas();
        this.crearMetaYLlave();
        this.crearAnimaciones();
        this.crearEnemigos();
        this.crearJugador();
        this.crearColisiones();
    }

    update() {
        this.actualizarEscalera();
        this.actualizarPlataformaMovil();
        this.actualizarAbejas();

        this.jugador.update(this.enEscalera);
    }

    crearFondo() {
        this.add.image(400, 300, 'cielo').setDisplaySize(800, 600);

        for (let x = 100; x <= 900; x += 205) {
            this.add.image(x, 500, 'desierto').setScale(0.4);
        }
    }

    iniciarVariables() {
        this.puntos = 0;
        this.totalGemas = 6;
        this.tieneLlave = false;
        this.enEscalera = false;
        this.velocidadAbeja = 80;

        this.textoPuntos = this.add.text(16, 16, 'Gemas: 0/6', {
            fontSize: '24px',
            fill: '#9825df'
        });
    }

    crearGrupos() {
        this.plataformas = this.physics.add.staticGroup();
        this.lava = this.physics.add.staticGroup();
        this.cactus = this.physics.add.staticGroup();
        this.escalera = this.physics.add.staticGroup();
        this.pinchos = this.physics.add.staticGroup();

        this.nubes = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        this.plataformasMoviles = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        this.gemas = this.physics.add.staticGroup();

        this.enemigos = this.physics.add.group({
            allowGravity: false
        });
    }

    crearSuelo() {
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

    crearObstaculos() {
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

    ajustarColliderPincho(pincho) {
        pincho.body.setSize(pincho.width * 0.4, pincho.height * 0.28);
        pincho.body.setOffset(pincho.width * 0.03, pincho.height * 0.2);
    }

    crearEscaleras() {
        this.crearEscalera(760, 545);
        this.crearEscalera(138, 308);

        this.plataformas.create(30, 95, 'bloque')
            .setScale(0.4)
            .refreshBody();
    }

    crearEscalera(x, yInferior) {
        this.escalera.create(x, yInferior, 'ladder_bottom')
            .setScale(0.4)
            .refreshBody();

        this.escalera.create(x, yInferior - 50, 'ladder_middle')
            .setScale(0.4)
            .refreshBody();

        this.escalera.create(x, yInferior - 100, 'ladder_middle')
            .setScale(0.4)
            .refreshBody();

        this.escalera.create(x, yInferior - 150, 'ladder_middle')
            .setScale(0.4)
            .refreshBody();

        this.escalera.create(x, yInferior - 200, 'ladder_top')
            .setScale(0.4)
            .refreshBody();
    }

    crearPlataformas() {
        this.crearPlataformaFija(540, 340, 3);
        this.crearPlataformaFija(50, 340, 2);
        this.crearPlataformaFija(690, 125, 2);

        this.crearPlataformaMovil();
        this.crearNubesFalsas();
    }

    crearPlataformaFija(xInicial, y, piezasCentro) {
        const escala = 0.5;
        const separacion = 32;
        let x = xInicial;

        this.plataformas.create(x, y, 'horizontal_left')
            .setScale(escala)
            .refreshBody();

        x += separacion;

        for (let i = 0; i < piezasCentro; i++) {
            this.plataformas.create(x, y, 'horizontal_middle')
                .setScale(escala)
                .refreshBody();

            x += separacion;
        }

        this.plataformas.create(x, y, 'horizontal_right')
            .setScale(escala)
            .refreshBody();
    }

    crearPlataformaMovil() {
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

    crearNubesFalsas() {
        const escalaNube = 0.4;
        const yNube = 130;

        this.nubes.create(285, yNube, 'nube').setScale(escalaNube);
        this.nubes.create(415, yNube, 'nube').setScale(escalaNube);
        this.nubes.create(545, yNube, 'nube').setScale(escalaNube);

        this.nubes.children.iterate((nube) => {
            nube.refreshBody();
        });
    }

    crearGemas() {
        const posiciones = [
            [33, 210],
            [245, 500],
            [430, 500],
            [630, 500],
            [350, 210],
            [550, 285]
        ];

        posiciones.forEach(([x, y]) => {
            this.gemas.create(x, y, 'gema')
                .setScale(0.4)
                .refreshBody();
        });
    }

    crearMetaYLlave() {
        this.meta = this.physics.add.staticSprite(750, 65, 'puerta_cerrada');
        this.meta.setScale(0.45);
        this.meta.refreshBody();

        this.llave = this.physics.add.staticSprite(30, 45, 'llave');
        this.llave.setScale(0.4);
        this.llave.refreshBody();
        this.llave.disableBody(true, true);
    }

    crearAnimaciones() {
        this.anims.create({
            key: 'abeja_volar',
            frames: [
                { key: 'bee_a' },
                { key: 'bee_b' }
            ],
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'caminar',
            frames: [
                { key: 'jugador_walk1' },
                { key: 'jugador_walk2' }
            ],
            frameRate: 6,
            repeat: -1
        });
    }

    crearEnemigos() {
        this.crearAbejaVertical(85, 240, 40, 240);
        this.crearAbejaVertical(350, 200, 40, 260);
        this.crearAbejaVertical(480, 160, 40, 260);
        this.crearAbejaHorizontal(1, 450, 90, 800);
    }

    crearAbejaVertical(x, y, limiteArriba, limiteAbajo) {
        const abeja = this.enemigos.create(x, y, 'bee_a');

        abeja.setScale(0.3);
        abeja.play('abeja_volar');
        abeja.body.allowGravity = false;
        abeja.setVelocityY(this.velocidadAbeja);

        abeja.tipoMovimiento = 'vertical';
        abeja.limiteArriba = limiteArriba;
        abeja.limiteAbajo = limiteAbajo;

        return abeja;
    }

    crearAbejaHorizontal(x, y, limiteIzq, limiteDer) {
        const abeja = this.enemigos.create(x, y, 'bee_a');

        abeja.setScale(0.3);
        abeja.play('abeja_volar');
        abeja.body.allowGravity = false;
        abeja.setVelocityX(this.velocidadAbeja);

        abeja.tipoMovimiento = 'horizontal';
        abeja.limiteIzq = limiteIzq;
        abeja.limiteDer = limiteDer;

        return abeja;
    }

    crearJugador() {
        this.jugador = new Personaje(this, 100, 450);
    }

    crearColisiones() {
        this.physics.add.collider(this.jugador.sprite, this.plataformas);
        this.physics.add.collider(this.jugador.sprite, this.plataformasMoviles);
        this.physics.add.collider(this.gemas, this.plataformas);
        this.physics.add.collider(this.enemigos, this.plataformas);

        this.physics.add.collider(
            this.jugador.sprite,
            this.enemigos,
            this.perderJuego,
            null,
            this
        );

        this.physics.add.overlap(
            this.jugador.sprite,
            this.cactus,
            this.perderJuego,
            null,
            this
        );

        this.physics.add.overlap(
            this.jugador.sprite,
            this.lava,
            this.perderJuego,
            null,
            this
        );

        this.physics.add.overlap(
            this.jugador.sprite,
            this.pinchos,
            this.perderJuego,
            null,
            this
        );

        this.physics.add.collider(
            this.jugador.sprite,
            this.nubes,
            this.tocarNube,
            null,
            this
        );

        this.physics.add.overlap(
            this.jugador.sprite,
            this.gemas,
            this.recogerGema,
            null,
            this
        );

        this.physics.add.overlap(
            this.jugador.sprite,
            this.llave,
            this.recogerLlave,
            null,
            this
        );

        this.physics.add.overlap(
            this.jugador.sprite,
            this.meta,
            this.ganarJuego,
            null,
            this
        );
    }

    actualizarEscalera() {
        this.enEscalera = false;

        this.physics.overlap(
            this.jugador.sprite,
            this.escalera,
            () => {
                this.enEscalera = true;
            }
        );
    }

    actualizarPlataformaMovil() {
        if (this.movilLeft.x > 380) {
            this.movilDireccion = -1;
        }

        if (this.movilLeft.x < 265) {
            this.movilDireccion = 1;
        }

        this.movilLeft.setVelocityX(80 * this.movilDireccion);
        this.movilRight.setVelocityX(80 * this.movilDireccion);
    }

    actualizarAbejas() {
        this.enemigos.children.iterate((abeja) => {
            if (!abeja) return;

            if (abeja.tipoMovimiento === 'vertical') {
                this.actualizarAbejaVertical(abeja);
            }

            if (abeja.tipoMovimiento === 'horizontal') {
                this.actualizarAbejaHorizontal(abeja);
            }
        });
    }

    actualizarAbejaVertical(abeja) {
        if (abeja.y >= abeja.limiteAbajo) {
            abeja.setVelocityY(-this.velocidadAbeja);
        }

        if (abeja.y <= abeja.limiteArriba) {
            abeja.setVelocityY(this.velocidadAbeja);
        }
    }

    actualizarAbejaHorizontal(abeja) {
        if (abeja.x >= abeja.limiteDer) {
            abeja.setVelocityX(-this.velocidadAbeja);
            abeja.flipX = true;
        }

        if (abeja.x <= abeja.limiteIzq) {
            abeja.setVelocityX(this.velocidadAbeja);
            abeja.flipX = false;
        }
    }

    tocarNube(jugador, nube) {
        if (nube.activada) return;

        nube.activada = true;
        nube.setTint(0xffaaaa);

        this.time.delayedCall(750, () => {
            nube.body.allowGravity = true;
            nube.setImmovable(false);
        });

        this.time.delayedCall(1500, () => {
            nube.disableBody(true, true);
        });
    }

    recogerGema(jugador, gema) {
        gema.disableBody(true, true);

        this.puntos++;
        this.textoPuntos.setText(`Gemas: ${this.puntos}/6`);

        if (this.puntos === this.totalGemas) {
            this.llave.enableBody(false, 700, 90, true, true);
        }
    }

    recogerLlave(jugador, llave) {
        llave.disableBody(true, true);

        this.tieneLlave = true;
        this.meta.setTexture('puerta_abierta');
        this.meta.refreshBody();
    }

    ganarJuego() {
        if (!this.tieneLlave) return;

        this.add.text(400, 300, '¡HAS GANADO!', {
            fontSize: '80px',
            fontFamily: 'Arial Black',
            color: '#ffff00',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);

        this.physics.pause();
    }

    perderJuego() {
        this.add.text(400, 300, 'GAME OVER', {
            fontSize: '80px',
            fontFamily: 'Arial Black',
            color: '#ff0000',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);

        this.physics.pause();
    }
}