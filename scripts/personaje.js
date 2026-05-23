export default class Personaje {
    constructor(scene, x, y) {
        this.scene = scene;

        // Configuración del personaje
        this.escala = 0.28;
        this.velocidad = 180;
        this.velocidadEscalera = 150;
        this.fuerzaSalto = -300;

        // Posición inicial del jugador
        this.xInicial = x;
        this.yInicial = y;

        // Estado del jugador
        this.bloqueado = false;

        // Crear sprite con físicas
        this.sprite = scene.physics.add.sprite(x, y, 'jugador_idle');
        this.sprite.setScale(this.escala);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setBounce(0.1);

        // Ajustar collider del jugador
        this.sprite.body.setSize(
            this.sprite.width * 0.5,
            this.sprite.height * 0.75
        );

        this.sprite.body.setOffset(
            this.sprite.width * 0.25,
            this.sprite.height * 0.2
        );

        // Controles del teclado
        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    update(enEscalera) {
        if (this.bloqueado) {
            this.sprite.setVelocity(0, 0);
            return;
        }

        if (enEscalera) {
            this.moverEnEscalera();
            return;
        }

        this.moverNormal();
    }

    moverEnEscalera() {
        this.sprite.body.allowGravity = false;
        this.sprite.setTexture('jugador_climb');
        this.sprite.setScale(this.escala);

        // Movimiento vertical en escalera
        if (this.cursors.up.isDown) {
            this.sprite.setVelocityY(-this.velocidadEscalera);
        } else if (this.cursors.down.isDown) {
            this.sprite.setVelocityY(this.velocidadEscalera);
        } else {
            this.sprite.setVelocityY(0);
        }

        // Movimiento horizontal en escalera
        this.moverHorizontal();
    }

    moverNormal() {
        this.sprite.body.allowGravity = true;

        this.moverHorizontal();
        this.actualizarAnimacion();

        // Salto
        if (this.cursors.up.isDown && this.sprite.body.blocked.down) {
            this.sprite.setVelocityY(this.fuerzaSalto);
        }
    }

    moverHorizontal() {
        if (this.cursors.left.isDown) {
            this.sprite.setVelocityX(-this.velocidad);
            this.sprite.flipX = true;
        } else if (this.cursors.right.isDown) {
            this.sprite.setVelocityX(this.velocidad);
            this.sprite.flipX = false;
        } else {
            this.sprite.setVelocityX(0);
        }
    }

    actualizarAnimacion() {
        if (!this.sprite.body.blocked.down) {
            this.sprite.setTexture('jugador_jump');
            this.sprite.setScale(this.escala);
        } else if (this.cursors.left.isDown || this.cursors.right.isDown) {
            this.sprite.anims.play('caminar', true);
        } else {
            this.sprite.setTexture('jugador_idle');
            this.sprite.setScale(this.escala);
        }
    }

    reiniciarPosicion() {
        this.sprite.setPosition(this.xInicial, this.yInicial);
        this.sprite.setVelocity(0, 0);
        this.sprite.body.allowGravity = true;
        this.sprite.setTexture('jugador_idle');
        this.sprite.setScale(this.escala);
    }

    bloquear() {
        this.bloqueado = true;
        this.sprite.setVelocity(0, 0);
    }

    desbloquear() {
        this.bloqueado = false;
    }
}