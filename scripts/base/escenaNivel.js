import Personaje from '../personaje.js';
import { cargarAssets } from './assets.js';

export default class EscenaNivel extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    preload() {
        cargarAssets(this);
    }

    create() {
        this.crearFondo();
        this.iniciarVariables();
        this.crearGrupos();
        this.crearAnimaciones();
    }

    update() {
        this.actualizarEscalera();
        this.actualizarPlataformaMovil();
        this.actualizarAbejas();

        if (this.jugador) {
            this.jugador.update(this.enEscalera);
        }
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

    crearJugador(x = 100, y = 450) {
        this.jugador = new Personaje(this, x, y);
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

        this.physics.add.overlap(this.jugador.sprite, this.cactus, this.perderJuego, null, this);
        this.physics.add.overlap(this.jugador.sprite, this.lava, this.perderJuego, null, this);
        this.physics.add.overlap(this.jugador.sprite, this.pinchos, this.perderJuego, null, this);

        this.physics.add.collider(
            this.jugador.sprite,
            this.nubes,
            this.tocarNube,
            null,
            this
        );

        this.physics.add.overlap(this.jugador.sprite, this.gemas, this.recogerGema, null, this);
        this.physics.add.overlap(this.jugador.sprite, this.llave, this.recogerLlave, null, this);
        this.physics.add.overlap(this.jugador.sprite, this.meta, this.ganarJuego, null, this);
    }

    actualizarEscalera() {
        this.enEscalera = false;

        if (!this.jugador || !this.escalera) return;

        this.physics.overlap(
            this.jugador.sprite,
            this.escalera,
            () => {
                this.enEscalera = true;
            }
        );
    }

    actualizarPlataformaMovil() {
        if (!this.movilLeft || !this.movilRight) return;

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
        if (!this.enemigos) return;

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
            abeja.flipX = false;
        }

        if (abeja.x <= abeja.limiteIzq) {
            abeja.setVelocityX(this.velocidadAbeja);
            abeja.flipX = true;
        }
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

    crearGema(x, y) {
        return this.gemas.create(x, y, 'gema')
            .setScale(0.4)
            .refreshBody();
    }

    ajustarColliderPincho(pincho) {
        pincho.body.setSize(pincho.width * 0.4, pincho.height * 0.28);
        pincho.body.setOffset(pincho.width * 0.03, pincho.height * 0.2);
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

    crearMetaYLlave(xPuerta, yPuerta, xLlave, yLlave, texturaLlave = 'llave') {

        // Puerta
        this.meta = this.physics.add.staticSprite(
            xPuerta,
            yPuerta,
            'puerta_cerrada'
        );

        this.meta.setScale(0.45);
        this.meta.refreshBody();

        // Llave
        this.llave = this.physics.add.staticSprite(
            xLlave,
            yLlave,
            texturaLlave
        );

        this.llave.setScale(0.4);
        this.llave.refreshBody();
        this.llave.disableBody(true, true);
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
        this.textoPuntos.setText(`Gemas: ${this.puntos}/${this.totalGemas}`);

        if (this.puntos === this.totalGemas && this.llave) {
            this.llave.enableBody(false, this.llave.x, this.llave.y, true, true);
        }
    }

    recogerLlave(jugador, llave) {
        llave.disableBody(true, true);

        this.tieneLlave = true;

        if (this.meta) {
            this.meta.setTexture('puerta_abierta');
            this.meta.refreshBody();
        }
    }

    ganarJuego() {
        if (!this.tieneLlave) return;

        this.physics.pause();

        // Último nivel
        if (!this.siguienteNivel) {

            this.add.text(400, 300, '¡HAS COMPLETADO EL JUEGO!', {
                fontSize: '60px',
                fontFamily: 'Arial Black',
                color: '#00ff88',
                stroke: '#000000',
                strokeThickness: 8
            }).setOrigin(0.5);

            return;
        }

        // Niveles normales
        this.add.text(400, 300, '¡NIVEL COMPLETADO!', {
            fontSize: '54px',
            fontFamily: 'Arial Black',
            color: '#ffff00',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);

        // Cambiar de nivel tras 2 segundos
        this.time.delayedCall(2000, () => {
            this.scene.start(this.siguienteNivel);
        });
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