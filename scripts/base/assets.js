export function cargarAssets(scene) {
    // Fondos
    scene.load.image('cielo', 'assets/tiles/background_solid_cloud.png');
    scene.load.image('desierto', 'assets/tiles/background_color_desert.png');

    // Terreno
    scene.load.image('top_left', 'assets/items/terrain_purple_block_top_left.png');
    scene.load.image('top', 'assets/items/terrain_purple_block_top.png');
    scene.load.image('top_right', 'assets/items/terrain_purple_block_top_right.png');
    scene.load.image('bloque', 'assets/items/terrain_purple_block.png');
    scene.load.image('nube', 'assets/items/terrain_purple_cloud.png');

    // Plataformas
    scene.load.image('movil_left', 'assets/items/terrain_purple_horizontal_overhang_left.png');
    scene.load.image('movil_right', 'assets/items/terrain_purple_horizontal_overhang_right.png');
    scene.load.image('horizontal_left', 'assets/items/terrain_purple_horizontal_left.png');
    scene.load.image('horizontal_middle', 'assets/items/terrain_purple_horizontal_middle.png');
    scene.load.image('horizontal_right', 'assets/items/terrain_purple_horizontal_right.png');

    // Obstáculos
    scene.load.image('lava', 'assets/items/lava_top.png');
    scene.load.image('cactus', 'assets/items/cactus.png');
    scene.load.image('pinchos', 'assets/items/spikes.png');

    // Escaleras
    scene.load.image('ladder_bottom', 'assets/items/ladder_bottom.png');
    scene.load.image('ladder_middle', 'assets/items/ladder_middle.png');
    scene.load.image('ladder_top', 'assets/items/ladder_top.png');

    // Jugador
    scene.load.image('jugador_idle', 'assets/player/character_green_idle.png');
    scene.load.image('jugador_walk1', 'assets/player/character_green_walk_a.png');
    scene.load.image('jugador_walk2', 'assets/player/character_green_walk_b.png');
    scene.load.image('jugador_jump', 'assets/player/character_green_jump.png');
    scene.load.image('jugador_climb', 'assets/player/character_green_climb_a.png');

    // Objetos
    scene.load.image('gema', 'assets/items/gem_red.png');
    scene.load.image('llave', 'assets/items/key_red.png');
    scene.load.image('puerta_cerrada', 'assets/items/door_closed_top.png');
    scene.load.image('puerta_abierta', 'assets/items/door_open_top.png');

    // Enemigos
    scene.load.image('bee_a', 'assets/enemy/bee_a.png');
    scene.load.image('bee_b', 'assets/enemy/bee_b.png');
}