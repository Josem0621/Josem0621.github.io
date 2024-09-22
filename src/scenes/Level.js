// You can write more code here
var music;
/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");
	}

	preload(){
		this.load.audio('menu_music', 'assets/menu_music.mp3');
		this.load.image('retro', 'assets/fondo.png')

	}

	/** @returns {void} */
	editorPreload() {
		this.preload()
	}

	/** @returns {void} */
	editorCreate() {
		let Preload = this.scene.get('main');
        if (Preload) {
            // Destruir los assets de main
            Preload.destroyAssetPack();

			// Detener y eliminar Preload
            this.scene.stop('Preload');
            this.scene.remove('Preload');

            // Verificar en la consola si los assets fueron eliminados
            console.log('Textures:', this.textures.list); // Lista de texturas
            console.log('Sounds:', this.sound.sounds); // Lista de sonidos
            console.log('JSON Cache:', this.cache.json.entries); // Lista de JSONs
        }

		music = this.sound.add("menu_music")
		music.play()

		// retro
		const retro = this.add.image(960, 496, "retro");
		retro.scaleX = 1.0235107911156331;
		retro.scaleY = 0.9536372126157046;

		// text_1
		const text_1 = this.add.text(384, 128, "", {});
		text_1.text = "A N I M A L S  J U M P ";
		text_1.setStyle({ "color": "#f39c12", "fontSize": "90px", "fontStyle": "bold", "stroke": "#000000ff", "strokeThickness":0.5});

		// text
		const text = this.add.text(960, 608, "", {});
		text.setOrigin(0.5, 0.5);
		text.text = "1 J U G A D O R";
		text.setStyle({ "color": "#45b39d", "fontSize": "70px", "fontStyle": "bold", "stroke": "#000000ff", "strokeThickness":0.5});
		text.setInteractive();
		text.on('pointerdown', () => {
		    // Agregar una animación o transición aquí
			this.cameras.main.fadeOut(1000); // Ejemplo de desvanecimiento de pantalla
			this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
				this.scene.start('Players');
				this.scene.remove("Level")
			});
		})
		// Animación del texto "COMENZAR"
		text.on('pointerover', () => {
			this.tweens.add({
				targets: text,
				scaleX: 1.5,
				scaleY: 1.5,
				duration: 300,
				ease: 'Quad.easeInOut'
			});
		});
	
		text.on('pointerout', () => {
			this.tweens.add({
				targets: text,
				scaleX: 1,
				scaleY: 1,
				duration: 300,
				ease: 'Quad.easeInOut'
			});
		});

		// text
		const text2 = this.add.text(960, 708, "", {});
		text2.setOrigin(0.5, 0.5);
		text2.text = "2 J U G A D O R E S";
		text2.setStyle({ "color": "#e74c3c", "fontSize": "70px", "fontStyle": "bold", "stroke": "#000000ff", "strokeThickness":0.5});
		text2.setInteractive();
		text2.on('pointerdown', () => {
		    // Agregar una animación o transición aquí
			this.cameras.main.fadeOut(1000); // Ejemplo de desvanecimiento de pantalla
			this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
				this.scene.start('Scene6');
				this.scene.remove("Level")
			});
		})
		// Animación del texto "COMENZAR"
		text2.on('pointerover', () => {
			this.tweens.add({
				targets: text2,
				scaleX: 1.5,
				scaleY: 1.5,
				duration: 300,
				ease: 'Quad.easeInOut'
			});
		});
	
		text2.on('pointerout', () => {
			this.tweens.add({
				targets: text2,
				scaleX: 1,
				scaleY: 1,
				duration: 300,
				ease: 'Quad.easeInOut'
			});
		});

		this.events.emit("scene-awake");


	}

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here