if (typeof player1Character === 'undefined') {
    let player1Character = null;
}  // Almacena el personaje seleccionado por el jugador 1
if (typeof player2Character === 'undefined') {
    let player2Character = null;
}  // Almacena el personaje seleccionado por el jugador 1
if (typeof currentPlayer === 'undefined') {
    let currentPlayer = 1;
}
if (typeof characterSprites === 'undefined') {
    //Sprites de personajes
    let characterSprites = {
        dude1: 'assets/gato-frames.png',
        dude2: 'assets/koala-frames.png',
        dude3: 'assets/panda-frames.png',
        dude4: 'assets/Toro-frames.png'
    }
}


class Scene6 extends Phaser.Scene {

    constructor() {
        super("Scene6");
        /* START-USER-CTR-CODE */
        // Define las variables aquí para que estén disponibles en toda la clase
        this.triangles = [];
        this.rectangles = [];

        this.gato = [];
        this.koala = [];
        this.panda = [];
        this.toro = [];

        this.titulo1 = null;
        this.titulo2 = null;

        // Variables específicas de la clase


        this.player1Text = null;  // Texto para el jugador 1
        this.player2Text = null;  // Texto para el jugador 2

        this.selectedCharacter = null;
        /* END-USER-CTR-CODE */
    }

    preload() {
        this.load.pack("pack", "assets/asset-pack-players.json");
    }

    editorPreload() {
        this.load.spritesheet("dude1", "assets/gato-frames.png", { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet("dude2", "assets/koala-frames.png", { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet("dude3", "assets/panda-frames.png", { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet("dude4", "assets/Toro-frames.png", { frameWidth: 32, frameHeight: 48 });

        this.preload();
        this.editorCreate();
    }

    editorCreate() {
        let Level = this.scene.get('main');
        if (Level) {
            Level.destroyAssetPack();
            this.scene.stop('Level');
            this.scene.remove('Level');
            console.log('Textures:', this.textures.list);
            console.log('Sounds:', this.sound.sounds);
            console.log('JSON Cache:', this.cache.json.entries);
        }

        // triangle_1
        const triangle_1 = this.add.triangle(520, 1321, 0, 128, 64, 0, 128, 128);
        triangle_1.scaleY = 1.075113036089567;
        triangle_1.angle = -180;
        triangle_1.isFilled = true;
        this.triangles.push(triangle_1);

        // triangle
        const triangle = this.add.triangle(796, 1321, 0, 128, 64, 0, 128, 128);
        triangle.scaleY = 1.075113036089567;
        triangle.angle = -180;
        triangle.isFilled = true;
        this.triangles.push(triangle);

        // triangle_2
        const triangle_2 = this.add.triangle(1063, 1321, 0, 128, 64, 0, 128, 128);
        triangle_2.scaleY = 1.075113036089567;
        triangle_2.angle = -180;
        triangle_2.isFilled = true;
        this.triangles.push(triangle_2);

        // triangle_3
        const triangle_3 = this.add.triangle(1337, 1321, 0, 128, 64, 0, 128, 128);
        triangle_3.scaleY = 1.075113036089567;
        triangle_3.angle = -180;
        triangle_3.isFilled = true;
        this.triangles.push(triangle_3);

        // rectangle_6
        const rectangle_6 = this.add.rectangle(529, 1595, 128, 128);
        rectangle_6.scaleX = 1.9145069138058972;
        rectangle_6.scaleY = 2.3941674599711265;
        rectangle_6.isFilled = true;
        this.rectangles.push(rectangle_6);

        // rectangle_7
        const rectangle_7 = this.add.rectangle(793, 1595, 128, 128);
        rectangle_7.scaleX = 1.9145069138058972;
        rectangle_7.scaleY = 2.3941674599711265;
        rectangle_7.isFilled = true;
        this.rectangles.push(rectangle_7);

        // rectangle_8
        const rectangle_8 = this.add.rectangle(1060, 1595, 128, 128);
        rectangle_8.scaleX = 1.9145069138058972;
        rectangle_8.scaleY = 2.3941674599711265;
        rectangle_8.isFilled = true;
        this.rectangles.push(rectangle_8);

        // rectangle_9
        const rectangle_9 = this.add.rectangle(1349, 1595, 128, 128);
        rectangle_9.scaleX = 1.9145069138058972;
        rectangle_9.scaleY = 2.3941674599711265;
        rectangle_9.isFilled = true;
        this.rectangles.push(rectangle_9);

        // gato
        const gato = this.add.image(520, 1600, "gato").setInteractive();
        gato.on('pointerdown', () => this.selectCharacter('dude1', 'Gato'));
        this.gato.push(gato);

        // koala
        const koala = this.add.image(793, 1600, "koala").setInteractive();
        koala.on('pointerdown', () => this.selectCharacter('dude2', 'Koala'));
        this.koala.push(koala);

        // panda
        const panda = this.add.image(1060, 1600, "panda").setInteractive();
        panda.on('pointerdown', () => this.selectCharacter('dude3', 'Panda'));
        this.panda.push(panda);

        // toro
        const toro = this.add.image(1349, 1600, "Toro").setInteractive();
        toro.on('pointerdown', () => this.selectCharacter('dude4', 'Toro'));
        this.toro.push(toro);

        // titulo1
        this.titulo1 = this.add.text(400, -199, "", {});
        this.titulo1.text = "S E L E C C I O N A R";
        this.titulo1.setStyle({ "color": "#e40000ff", "fontSize": "90px", "fontStyle": "bold", "stroke": "#000000ff", "strokeThickness": 0.5 });

        // titulo2
        this.titulo2 = this.add.text(815, 1838, "", {});
        this.titulo2.text = "J U G A R";
        this.titulo2.setStyle({ "color": "#e20000ff", "fontSize": "60px", "fontStyle": "bold", "stroke": "#000000ff", "strokeThickness": 0.5 });
        this.titulo2.setInteractive();
        this.titulo2.on('pointerdown', () => {
            this.cameras.main.fadeOut(1000);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start('Preload1');
                var music = this.sound.get('menu_music');
                if (music && music.isPlaying) {
                    music.stop();
                }
            });
        });

        // Texto para mostrar las selecciones de jugadores
        this.player1Text = this.add.text(500, 25, "Jugador 1: Ningún personaje seleccionado", { color: "#73c6b6", fontSize: "40px", fontStyle: "bold" });
        this.player2Text = this.add.text(500, 50, "Jugador 2: Ningún personaje seleccionado", { color: "#85c1e9", fontSize: "40px", fontStyle: "bold" });

        this.events.emit("scene-awake");
    }

    selectCharacter(character, characterName) {
        if (currentPlayer === 1) {
            player1Character = character;
            this.player1Text.text = `Jugador 1: ${characterName}`;
            currentPlayer = 2;  // Cambiamos al jugador 2
        } else if (currentPlayer === 2) {
            player2Character = character;
            this.player2Text.text = `Jugador 2: ${characterName}`;
            currentPlayer = 1;  // Volvemos al jugador 1
        }

        // Cambiar colores de los triángulos y rectángulos según el jugador
        this.updateSelectionVisuals(character);
    }

    updateSelectionVisuals(character) {
        // Limpiamos todos los colores para evitar conflictos visuales
        this.triangles.forEach(triangle => triangle.setFillStyle(0xffffff));
        this.rectangles.forEach(rectangle => rectangle.setFillStyle(0xffffff));

        // Cambiamos el color según el personaje seleccionado 
        switch (character) {
            case 'dude1':
                this.triangles[0].setFillStyle(currentPlayer === 1 ? 0xFF85C1E9 : 0xFF73C6B6);  // Jugador 1 amarillo, Jugador 2 azul
                this.rectangles[0].setFillStyle(currentPlayer === 1 ? 0xFF85C1E9 : 0xFF73C6B6);
                break;
            case 'dude2':
                this.triangles[1].setFillStyle(currentPlayer === 1 ? 0xFF85C1E9 : 0xFF73C6B6);
                this.rectangles[1].setFillStyle(currentPlayer === 1 ? 0xFF85C1E9 : 0xFF73C6B6);
                break;
            case 'dude3':
                this.triangles[2].setFillStyle(currentPlayer === 1 ? 0xFF85C1E9 : 0xFF73C6B6);
                this.rectangles[2].setFillStyle(currentPlayer === 1 ? 0x0000ff : 0xFF73C6B6);
                break;
            case 'dude4':
                this.triangles[3].setFillStyle(currentPlayer === 1 ? 0xFF85C1E9 : 0xFF73C6B6);
                this.rectangles[3].setFillStyle(currentPlayer === 1 ? 0xFF85C1E9 : 0xFF73C6B6);
                break;
        }
    }

    /* START-USER-CODE */

    // Write your code here

    create() {
        this.editorCreate();

        // Animación de entrada para los elementos de la escena
        this.animateSceneEntry();
    }

    animateSceneEntry() {
        // Tween para los triángulos
        this.tweens.add({
            targets: this.triangles,
            y: '-=1000', // Mueve los triángulos hacia abajo
            alpha: 1, // Hace que los triángulos sean completamente visibles
            duration: 1000,
            ease: 'Power2',
            delay: 1000,
            stagger: 200 // Añade un pequeño retraso entre cada triángulo
        });

        // Tween para los rectángulos
        this.tweens.add({
            targets: this.rectangles,
            y: '-=1000', // Mueve los rectángulos hacia abajo
            alpha: 1, // Hace que los rectángulos sean completamente visibles
            duration: 1000,
            ease: 'Power2',
            delay: 1000,
            stagger: 200 // Añade un pequeño retraso entre cada rectángulo
        });

        // Tween para las imágenes
        this.tweens.add({
            targets: this.gato,
            y: '-=1000', // Mueve las imágenes hacia abajo
            alpha: 1, // Hace que las imágenes sean completamente visibles
            duration: 1000,
            ease: 'Power2',
            delay: 1000,
            stagger: 200 // Añade un pequeño retraso entre cada imagen
        });

        // Tween para las imágenes
        this.tweens.add({
            targets: this.koala,
            y: '-=1000', // Mueve las imágenes hacia abajo
            alpha: 1, // Hace que las imágenes sean completamente visibles
            duration: 1000,
            ease: 'Power2',
            delay: 1000,
            stagger: 200 // Añade un pequeño retraso entre cada imagen
        });

        // Tween para las imágenes
        this.tweens.add({
            targets: this.panda,
            y: '-=1000', // Mueve las imágenes hacia abajo
            alpha: 1, // Hace que las imágenes sean completamente visibles
            duration: 1000,
            ease: 'Power2',
            delay: 1000,
            stagger: 200 // Añade un pequeño retraso entre cada imagen
        });

        // Tween para las imágenes
        this.tweens.add({
            targets: this.toro,
            y: '-=1000', // Mueve las imágenes hacia abajo
            alpha: 1, // Hace que las imágenes sean completamente visibles
            duration: 1000,
            ease: 'Power2',
            delay: 1000,
            stagger: 200 // Añade un pequeño retraso entre cada imagen
        });

        // Tween para los títulos
        this.tweens.add({
            targets: [this.titulo1],
            y: '+=298', // Mueve los títulos hacia arriba
            alpha: 1, // Hace que los títulos sean completamente visibles
            duration: 800,
            ease: 'Power2',
            delay: 1000
        });

        // Tween para los títulos
        this.tweens.add({
            targets: [this.titulo2],
            y: '-=1000', // Mueve los títulos hacia arriba
            alpha: 1, // Hace que los títulos sean completamente visibles
            duration: 800,
            ease: 'Power2',
            delay: 1000
        });
    }

    /* END-USER-CODE */
}