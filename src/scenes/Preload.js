
// You can write more code here

/* START OF COMPILED CODE */

class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

		/** @returns {void} */
	editorPreload() {



		// Load crab textures
		this.load.image('crab1', 'assets/crab1.png');
		this.load.image('crab2', 'assets/crab2.png');
		this.load.image('crab3', 'assets/crab3.png');
		this.load.image('crab4', 'assets/crab4.png');
		this.load.image('crab5', 'assets/crab5.png');
		this.load.image('crab6', 'assets/crab6.png');
		this.load.image('crab7', 'assets/crab7.png');

		// Load shark textures
		this.load.image('sharks1', 'assets/sharks1.png');
		this.load.image('sharks2', 'assets/sharks2.png');
		this.load.image('sharks3', 'assets/sharks3.png');
		this.load.image('sharks4', 'assets/sharks4.png');

		// Continue with creating animations after textures are loaded
		this.load.on('complete', () => {
			// Create the animations for the sharks
			this.anims.create({
				key: 'shark',
				frames: [
					{ key: 'sharks1' },
					{ key: 'sharks2' },
					{ key: 'sharks3' },
					{ key: 'sharks4' }
				],
				frameRate: 5,
				repeat: -1
			});

			// Create the animations for the crabs
			this.anims.create({
				key: 'crabs',
				frames: [
					{ key: 'crab1' },
					{ key: 'crab2' },
					{ key: 'crab3' },
					{ key: 'crab4' },
					{ key: 'crab5' },
					{ key: 'crab6' },
					{ key: 'crab7' }
				],
				frameRate: 10,
				repeat: -1
			});
			
			// Now that animations are created, we can proceed to editorCreate
			this.editorCreate();
		});

		this.load.start();
	}

	/** @returns {void} */
	editorCreate() {

		// progressBar
		const progressBar = this.add.rectangle(479, 497, 256, 20);
		progressBar.scaleX = 4;
		progressBar.scaleY = 4;
		progressBar.setOrigin(0, 0);
		progressBar.isFilled = true;
		progressBar.fillColor = 14737632;

		// preloadUpdater
		new PreloadBarUpdaterScript(progressBar);

		// progressBarBg
		const progressBarBg = this.add.rectangle(479, 497, 256, 20);
		progressBarBg.scaleX = 4;
		progressBarBg.scaleY = 4;
		progressBarBg.setOrigin(0, 0);
		progressBarBg.fillColor = 14737632;
		progressBarBg.isStroked = true;

		// loadingText
		const loadingText = this.add.text(463, 383, "", {});
		loadingText.scaleX = 4;
		loadingText.scaleY = 4;
		loadingText.text = "Loading...";
		loadingText.setStyle({ "color": "#e0e0e0", "fontFamily": "arial", "fontSize": "20px" });

		// crab
		const crab = this.add.sprite(1597, 267, "crab1");
		crab.scaleX = 3.4594762345506886;
		crab.scaleY = 3.4594762345506886;
		crab.angle = 26;
		crab.play("crabs");

		// crab_1
		const crab_1 = this.add.sprite(1420, 131, "crab1");
		crab_1.scaleX = 3.4594762345506886;
		crab_1.scaleY = 3.4594762345506886;
		crab_1.angle = 26;
		crab_1.play("crabs");

		// crab_2
		const crab_2 = this.add.sprite(1253, 258, "crab1");
		crab_2.scaleX = 3.4594762345506886;
		crab_2.scaleY = 3.4594762345506886;
		crab_2.angle = -26;
		crab_2.play("crabs");

		// crab_3
		const crab_3 = this.add.sprite(1039, 137, "crab1");
		crab_3.scaleX = 3.4594762345506886;
		crab_3.scaleY = 3.4594762345506886;
		crab_3.angle = 26;
		crab_3.play("crabs");

		// crab_4
		const crab_4 = this.add.sprite(821, 246, "crab1");
		crab_4.scaleX = 3.4594762345506886;
		crab_4.scaleY = 3.4594762345506886;
		crab_4.angle = 26;
		crab_4.play("crabs");

		// crab_5
		const crab_5 = this.add.sprite(600, 130, "crab1");
		crab_5.scaleX = 3.4594762345506886;
		crab_5.scaleY = 3.4594762345506886;
		crab_5.angle = -26;
		crab_5.play("crabs");

		// crab_6
		const crab_6 = this.add.sprite(408, 254, "crab1");
		crab_6.scaleX = 3.4594762345506886;
		crab_6.scaleY = 3.4594762345506886;
		crab_6.angle = 26;
		crab_6.play("crabs");

		// crab_7
		const crab_7 = this.add.sprite(217, 134, "crab1");
		crab_7.scaleX = 3.4594762345506886;
		crab_7.scaleY = 3.4594762345506886;
		crab_7.angle = 26;
		crab_7.play("crabs");

		// crab_9
		const crab_9 = this.add.sprite(1732, 137, "crab1");
		crab_9.scaleX = 3.4594762345506886;
		crab_9.scaleY = 3.4594762345506886;
		crab_9.angle = -26;
		crab_9.play("crabs");

		// sharks_1
		const sharks_1 = this.add.sprite(343, 920, "sharks");
		sharks_1.scaleX = 2.308751334614091;
		sharks_1.scaleY = 2.308751334614091;
		sharks_1.flipX = true;
		sharks_1.play("shark");

		// sharks_2
		const sharks_2 = this.add.sprite(350, 821, "sharks");
		sharks_2.scaleX = 2.308751334614091;
		sharks_2.scaleY = 2.308751334614091;
		sharks_2.play("shark");

		// sharks_3
		const sharks_3 = this.add.sprite(550, 910, "sharks");
		sharks_3.scaleX = 2.308751334614091;
		sharks_3.scaleY = 2.308751334614091;
		sharks_3.play("shark");

		// sharks_4
		const sharks_4 = this.add.sprite(557, 811, "sharks");
		sharks_4.scaleX = 2.308751334614091;
		sharks_4.scaleY = 2.308751334614091;
		sharks_4.flipX = true;
		sharks_4.play("shark");

		// sharks_5
		const sharks_5 = this.add.sprite(143, 924, "sharks");
		sharks_5.scaleX = 2.308751334614091;
		sharks_5.scaleY = 2.308751334614091;
		sharks_5.play("shark");

		// sharks_6
		const sharks_6 = this.add.sprite(150, 825, "sharks");
		sharks_6.scaleX = 2.308751334614091;
		sharks_6.scaleY = 2.308751334614091;
		sharks_6.flipX = true;
		sharks_6.play("shark");

		// sharks_7
		const sharks_7 = this.add.sprite(1383, 924, "sharks");
		sharks_7.scaleX = 2.308751334614091;
		sharks_7.scaleY = 2.308751334614091;
		sharks_7.flipX = true;
		sharks_7.play("shark");

		// sharks_8
		const sharks_8 = this.add.sprite(1390, 825, "sharks");
		sharks_8.scaleX = 2.308751334614091;
		sharks_8.scaleY = 2.308751334614091;
		sharks_8.play("shark");

		// sharks_9
		const sharks_9 = this.add.sprite(1597, 927, "sharks");
		sharks_9.scaleX = 2.308751334614091;
		sharks_9.scaleY = 2.308751334614091;
		sharks_9.play("shark");

		// sharks_10
		const sharks_10 = this.add.sprite(1604, 828, "sharks");
		sharks_10.scaleX = 2.308751334614091;
		sharks_10.scaleY = 2.308751334614091;
		sharks_10.flipX = true;
		sharks_10.play("shark");

		// sharks_11
		const sharks_11 = this.add.sprite(1794, 924, "sharks");
		sharks_11.scaleX = 2.308751334614091;
		sharks_11.scaleY = 2.308751334614091;
		sharks_11.flipX = true;
		sharks_11.play("shark");

		// sharks_12
		const sharks_12 = this.add.sprite(1801, 825, "sharks");
		sharks_12.scaleX = 2.308751334614091;
		sharks_12.scaleY = 2.308751334614091;
		sharks_12.play("shark");

		// sharks
		const sharks = this.add.sprite(767, 915, "sharks");
		sharks.scaleX = 2.308751334614091;
		sharks.scaleY = 2.308751334614091;
		sharks.flipX = true;
		sharks.play("shark");

		// sharks_13
		const sharks_13 = this.add.sprite(774, 816, "sharks");
		sharks_13.scaleX = 2.308751334614091;
		sharks_13.scaleY = 2.308751334614091;
		sharks_13.play("shark");

		// sharks_14
		const sharks_14 = this.add.sprite(981, 918, "sharks");
		sharks_14.scaleX = 2.308751334614091;
		sharks_14.scaleY = 2.308751334614091;
		sharks_14.play("shark");

		// sharks_15
		const sharks_15 = this.add.sprite(988, 819, "sharks");
		sharks_15.scaleX = 2.308751334614091;
		sharks_15.scaleY = 2.308751334614091;
		sharks_15.flipX = true;
		sharks_15.play("shark");

		// sharks_16
		const sharks_16 = this.add.sprite(1178, 915, "sharks");
		sharks_16.scaleX = 2.308751334614091;
		sharks_16.scaleY = 2.308751334614091;
		sharks_16.flipX = true;
		sharks_16.play("shark");

		// sharks_17
		const sharks_17 = this.add.sprite(1185, 816, "sharks");
		sharks_17.scaleX = 2.308751334614091;
		sharks_17.scaleY = 2.308751334614091;
		sharks_17.play("shark");

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();

		this.editorPreload();

		setTimeout(() => {
			this.scene.start("Level");
		}, 2000);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
