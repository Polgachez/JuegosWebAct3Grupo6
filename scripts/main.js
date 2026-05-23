import Nivel1 from './escenas/nivel1.js';
import Nivel2 from './escenas/nivel2.js';
import Nivel3 from './escenas/nivel3.js';
import Nivel4 from './escenas/nivel4.js';

// Configuración general del juego
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },

    scene: [Nivel1, Nivel2, Nivel3, Nivel4]
};

// Crear el juego
const game = new Phaser.Game(config);

// Botón para reiniciar la escena actual
document.getElementById('btn-restart').addEventListener('click', () => {
    const escenaActual = game.scene.getScenes(true)[0];

    if (escenaActual) {
        escenaActual.scene.restart();
    }
});