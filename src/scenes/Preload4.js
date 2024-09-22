
// You can write more code here

/* START OF COMPILED CODE */

class Preload4 extends Phaser.Scene {

	constructor() {
		super("Preload4");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// fondocielo
		const fondocielo = this.add.image(955, 495, "fondocielo");
		fondocielo.scaleX = 1.2741146646423067;
		fondocielo.scaleY = 1.2741146646423067;

		// progressBar
		const progressBar = this.add.rectangle(467, 491, 256, 20);
		progressBar.scaleX = 4;
		progressBar.scaleY = 4;
		progressBar.setOrigin(0, 0);
		progressBar.isFilled = true;
		progressBar.fillColor = 14737632;

		// preloadUpdater
		new PreloadBarUpdaterScript(progressBar);

		// progressBarBg
		const progressBarBg = this.add.rectangle(467, 491, 256, 20);
		progressBarBg.scaleX = 4;
		progressBarBg.scaleY = 4;
		progressBarBg.setOrigin(0, 0);
		progressBarBg.fillColor = 14737632;
		progressBarBg.isStroked = true;

		// loadingText
		const loadingText = this.add.text(451, 377, "", {});
		loadingText.scaleX = 4;
		loadingText.scaleY = 4;
		loadingText.text = "Loading...";
		loadingText.setStyle({ "color": "#e0e0e0", "fontFamily": "arial", "fontSize": "20px" });

		// giphy_1
		const giphy_1 = this.add.sprite(1631, 347, "giphy-1");
		giphy_1.scaleX = 2.9300471643633195;
		giphy_1.scaleY = 2.9300471643633195;
		giphy_1.play("buho");

		// giphy
		const giphy = this.add.sprite(285, 351, "giphy-1");
		giphy.scaleX = 2.9300471643633195;
		giphy.scaleY = 2.9300471643633195;
		giphy.flipX = true;
		giphy.play("buho");

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	preload() {

		this.editorCreate();

		setTimeout(() => {
			this.scene.start("Scene4");
		}, 2000);
	}
}
