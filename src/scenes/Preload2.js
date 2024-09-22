
// You can write more code here

/* START OF COMPILED CODE */

class Preload2 extends Phaser.Scene {

	constructor() {
		super("Preload2");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorPreload(){
		this.preload()
	}

	/** @returns {void} */
	editorCreate() {

		let Scene1 = this.scene.get('main');
        if (Scene1) {
            // Destruir los assets de main
            Scene1.destroyAssetPack();

			// Detener y eliminar Scene1
            this.scene.stop('Scene1');
            this.scene.remove('Scene1');

            // Verificar en la consola si los assets fueron eliminados
            console.log('Textures:', this.textures.list); // Lista de texturas
            console.log('Sounds:', this.sound.sounds); // Lista de sonidos
            console.log('JSON Cache:', this.cache.json.entries); // Lista de JSONs
        }

		// underwater_fantasy_preview
		this.add.image(958, 489, "underwater-fantasy-preview");

		// progressBar
		const progressBar = this.add.rectangle(472, 480, 256, 20);
		progressBar.scaleX = 4;
		progressBar.scaleY = 4;
		progressBar.setOrigin(0, 0);
		progressBar.isFilled = true;
		progressBar.fillColor = 14737632;

		// preloadUpdater
		new PreloadBarUpdaterScript(progressBar);

		// progressBarBg
		const progressBarBg = this.add.rectangle(472, 480, 256, 20);
		progressBarBg.scaleX = 4;
		progressBarBg.scaleY = 4;
		progressBarBg.setOrigin(0, 0);
		progressBarBg.fillColor = 14737632;
		progressBarBg.isStroked = true;

		// loadingText
		const loadingText = this.add.text(456, 366, "", {});
		loadingText.scaleX = 4;
		loadingText.scaleY = 4;
		loadingText.text = "Loading...";
		loadingText.setStyle({ "color": "#e0e0e0", "fontFamily": "arial", "fontSize": "20px" });

		// crab
		const crab = this.add.sprite(1590, 250, "crab1");
		crab.scaleX = 3.4594762345506886;
		crab.scaleY = 3.4594762345506886;
		crab.angle = 26;
		crab.play("crabs");

		// crab_1
		const crab_1 = this.add.sprite(1413, 114, "crab1");
		crab_1.scaleX = 3.4594762345506886;
		crab_1.scaleY = 3.4594762345506886;
		crab_1.angle = 26;
		crab_1.play("crabs");

		// crab_2
		const crab_2 = this.add.sprite(1246, 241, "crab1");
		crab_2.scaleX = 3.4594762345506886;
		crab_2.scaleY = 3.4594762345506886;
		crab_2.angle = -26;
		crab_2.play("crabs");

		// crab_3
		const crab_3 = this.add.sprite(1032, 120, "crab1");
		crab_3.scaleX = 3.4594762345506886;
		crab_3.scaleY = 3.4594762345506886;
		crab_3.angle = 26;
		crab_3.play("crabs");

		// crab_4
		const crab_4 = this.add.sprite(814, 229, "crab1");
		crab_4.scaleX = 3.4594762345506886;
		crab_4.scaleY = 3.4594762345506886;
		crab_4.angle = 26;
		crab_4.play("crabs");

		// crab_5
		const crab_5 = this.add.sprite(593, 113, "crab1");
		crab_5.scaleX = 3.4594762345506886;
		crab_5.scaleY = 3.4594762345506886;
		crab_5.angle = -26;
		crab_5.play("crabs");

		// crab_6
		const crab_6 = this.add.sprite(401, 237, "crab1");
		crab_6.scaleX = 3.4594762345506886;
		crab_6.scaleY = 3.4594762345506886;
		crab_6.angle = 26;
		crab_6.play("crabs");

		// crab_7
		const crab_7 = this.add.sprite(210, 117, "crab1");
		crab_7.scaleX = 3.4594762345506886;
		crab_7.scaleY = 3.4594762345506886;
		crab_7.angle = 26;
		crab_7.play("crabs");

		// crab_9
		const crab_9 = this.add.sprite(1725, 120, "crab1");
		crab_9.scaleX = 3.4594762345506886;
		crab_9.scaleY = 3.4594762345506886;
		crab_9.angle = -26;
		crab_9.play("crabs");

		// sharks_1
		const sharks_1 = this.add.sprite(336, 903, "sharks");
		sharks_1.scaleX = 2.308751334614091;
		sharks_1.scaleY = 2.308751334614091;
		sharks_1.flipX = true;
		sharks_1.play("shark");

		// sharks_2
		const sharks_2 = this.add.sprite(343, 804, "sharks");
		sharks_2.scaleX = 2.308751334614091;
		sharks_2.scaleY = 2.308751334614091;
		sharks_2.play("shark");

		// sharks_3
		const sharks_3 = this.add.sprite(543, 893, "sharks");
		sharks_3.scaleX = 2.308751334614091;
		sharks_3.scaleY = 2.308751334614091;
		sharks_3.play("shark");

		// sharks_4
		const sharks_4 = this.add.sprite(550, 794, "sharks");
		sharks_4.scaleX = 2.308751334614091;
		sharks_4.scaleY = 2.308751334614091;
		sharks_4.flipX = true;
		sharks_4.play("shark");

		// sharks_5
		const sharks_5 = this.add.sprite(136, 907, "sharks");
		sharks_5.scaleX = 2.308751334614091;
		sharks_5.scaleY = 2.308751334614091;
		sharks_5.play("shark");

		// sharks_6
		const sharks_6 = this.add.sprite(143, 808, "sharks");
		sharks_6.scaleX = 2.308751334614091;
		sharks_6.scaleY = 2.308751334614091;
		sharks_6.flipX = true;
		sharks_6.play("shark");

		// sharks_7
		const sharks_7 = this.add.sprite(1376, 907, "sharks");
		sharks_7.scaleX = 2.308751334614091;
		sharks_7.scaleY = 2.308751334614091;
		sharks_7.flipX = true;
		sharks_7.play("shark");

		// sharks_8
		const sharks_8 = this.add.sprite(1383, 808, "sharks");
		sharks_8.scaleX = 2.308751334614091;
		sharks_8.scaleY = 2.308751334614091;
		sharks_8.play("shark");

		// sharks_9
		const sharks_9 = this.add.sprite(1590, 910, "sharks");
		sharks_9.scaleX = 2.308751334614091;
		sharks_9.scaleY = 2.308751334614091;
		sharks_9.play("shark");

		// sharks_10
		const sharks_10 = this.add.sprite(1597, 811, "sharks");
		sharks_10.scaleX = 2.308751334614091;
		sharks_10.scaleY = 2.308751334614091;
		sharks_10.flipX = true;
		sharks_10.play("shark");

		// sharks_11
		const sharks_11 = this.add.sprite(1787, 907, "sharks");
		sharks_11.scaleX = 2.308751334614091;
		sharks_11.scaleY = 2.308751334614091;
		sharks_11.flipX = true;
		sharks_11.play("shark");

		// sharks_12
		const sharks_12 = this.add.sprite(1794, 808, "sharks");
		sharks_12.scaleX = 2.308751334614091;
		sharks_12.scaleY = 2.308751334614091;
		sharks_12.play("shark");

		// sharks
		const sharks = this.add.sprite(760, 898, "sharks");
		sharks.scaleX = 2.308751334614091;
		sharks.scaleY = 2.308751334614091;
		sharks.flipX = true;
		sharks.play("shark");

		// sharks_13
		const sharks_13 = this.add.sprite(767, 799, "sharks");
		sharks_13.scaleX = 2.308751334614091;
		sharks_13.scaleY = 2.308751334614091;
		sharks_13.play("shark");

		// sharks_14
		const sharks_14 = this.add.sprite(974, 901, "sharks");
		sharks_14.scaleX = 2.308751334614091;
		sharks_14.scaleY = 2.308751334614091;
		sharks_14.play("shark");

		// sharks_15
		const sharks_15 = this.add.sprite(981, 802, "sharks");
		sharks_15.scaleX = 2.308751334614091;
		sharks_15.scaleY = 2.308751334614091;
		sharks_15.flipX = true;
		sharks_15.play("shark");

		// sharks_16
		const sharks_16 = this.add.sprite(1171, 898, "sharks");
		sharks_16.scaleX = 2.308751334614091;
		sharks_16.scaleY = 2.308751334614091;
		sharks_16.flipX = true;
		sharks_16.play("shark");

		// sharks_17
		const sharks_17 = this.add.sprite(1178, 799, "sharks");
		sharks_17.scaleX = 2.308751334614091;
		sharks_17.scaleY = 2.308751334614091;
		sharks_17.play("shark");

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {
		this.editorPreload()
		this.editorCreate();
	}

	preload() {

		this.load.pack("pack7", "assets/asset-pack-preload1.json")
		

		this.editorCreate();

		setTimeout(() => {
			this.scene.start("Scene2");
		}, 2000);
	}
}

/* END OF COMPILED CODE */

// You can write more code here
