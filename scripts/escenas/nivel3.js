
import EscenaNivel from '../base/escenaNivel.js';

export default class Nivel3 extends EscenaNivel {
    constructor() {
        super({ key: 'Nivel3' });

        this.siguienteNivel = 'Nivel4';
    }

    create() {

        super.create();

        this.totalGemas = 5;
        this.textoPuntos.setText('Gemas: 0/5');

        this.crearSueloNivel3();
        this.crearPlataformasNivel3();
        this.crearEscalerasNivel3();
        this.crearObstaculosNivel3();
        this.crearGemasNivel3();

        // puerta arriba derecha
        this.crearMetaYLlave(
            740,
            100,
            100,
            500,
            'llave_azul'
        );

        this.crearEnemigosNivel3();

        this.crearJugador(100,500);

        this.crearColisiones();
    }

    crearSueloNivel3(){

        const escala=0.5;
        const separacion=32;

        let x=16;

        while(x<=800){

            this.plataformas.create(
                x,
                580,
                'top'
            )
            .setScale(escala)
            .refreshBody();

            x+=separacion;
        }
    }

    crearPlataformasNivel3(){

        // plataforma izquierda
        this.crearPlataformaFija(
            280,
            350,
            3
        );

        // plataforma centro
        this.crearPlataformaFija(
            520,
            450,
            2
        );

        // plataforma final
        this.crearPlataformaFija(
            720,
            150,
            2
        );
    }

    crearEscalerasNivel3(){

        // izquierda
        this.crearEscalera(
            200,
            540
        );

        // derecha
        this.crearEscalera(
            650,
            250
        );
    }

    crearObstaculosNivel3(){

        const pincho=this.pinchos.create(
            300,
            525,
            'pinchos'
        )
        .setScale(0.45)
        .refreshBody();

        this.ajustarColliderPincho(pincho);
    }

    crearGemasNivel3() {
        this.crearGemaAzul(280, 300);
        this.crearGemaAzul(520, 400);
        this.crearGemaAzul(700, 100);
        this.crearGemaAzul(200, 520);
        this.crearGemaAzul(600, 520);
    }

    crearGemaAzul(x, y) {
        return this.gemas.create(x, y, 'gema_azul')
            .setScale(0.4)
            .refreshBody();
    }

    crearEnemigosNivel3(){

        this.crearAbejaHorizontal(
            450,
            350,
            350,
            600
        );
    }
}