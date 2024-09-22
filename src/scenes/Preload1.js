
// You can write more code here

/* START OF COMPILED CODE */

class Preload1 extends Phaser.Scene {

	constructor() {
		super("Preload1");
	}

	editorPreload(){
		this.preload()
	}

	/** @returns {void} */
	editorCreate() {

		let Players = this.scene.get('main');
        if (Players) {
            // Destruir los assets de main
            Players.destroyAssetPack();

			// Detener y eliminar Preload
            this.scene.stop('Players');
            this.scene.remove('Players');

            // Verificar en la consola si los assets fueron eliminados
            console.log('Textures:', this.textures.list); // Lista de texturas
            console.log('Sounds:', this.sound.sounds); // Lista de sonidos
            console.log('JSON Cache:', this.cache.json.entries); // Lista de JSONs
        }

		// mountains_b
		this.add.image(961, 508, "mountains_b");

		// progressBar
		const progressBar = this.add.rectangle(460, 491, 256, 20);
		progressBar.scaleX = 4;
		progressBar.scaleY = 4;
		progressBar.setOrigin(0, 0);
		progressBar.isFilled = true;
		progressBar.fillColor = 14737632;

		// preloadUpdater
		new PreloadBarUpdaterScript(progressBar);

		// progressBarBg
		const progressBarBg = this.add.rectangle(460, 491, 256, 20);
		progressBarBg.scaleX = 4;
		progressBarBg.scaleY = 4;
		progressBarBg.setOrigin(0, 0);
		progressBarBg.fillColor = 14737632;
		progressBarBg.isStroked = true;

		// loadingText
		const loadingText = this.add.text(444, 377, "", {});
		loadingText.scaleX = 4;
		loadingText.scaleY = 4;
		loadingText.text = "Loading...";
		loadingText.setStyle({ "color": "#e0e0e0", "fontFamily": "arial", "fontSize": "20px" });

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	preload() {
		this.load.pack("pack", "assets/asset-pack-preload1.json")
		
		this.editorCreate();

		setTimeout(() => {
			this.scene.start("Scene1");
		}, 2000);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
