
// You can write more code here

/* START OF COMPILED CODE */

class Preload5 extends Phaser.Scene {

	constructor() {
		super("Preload5");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// space_Background__1_
		this.add.image(957, 508, "Space Background (1)");

		// progressBar
		const progressBar = this.add.rectangle(486, 471, 256, 20);
		progressBar.scaleX = 4;
		progressBar.scaleY = 4;
		progressBar.setOrigin(0, 0);
		progressBar.isFilled = true;
		progressBar.fillColor = 14737632;

		// preloadUpdater
		new PreloadBarUpdaterScript(progressBar);

		// progressBarBg
		const progressBarBg = this.add.rectangle(486, 471, 256, 20);
		progressBarBg.scaleX = 4;
		progressBarBg.scaleY = 4;
		progressBarBg.setOrigin(0, 0);
		progressBarBg.fillColor = 14737632;
		progressBarBg.isStroked = true;

		// loadingText
		const loadingText = this.add.text(470, 357, "", {});
		loadingText.scaleX = 4;
		loadingText.scaleY = 4;
		loadingText.text = "Loading...";
		loadingText.setStyle({ "color": "#e0e0e0", "fontFamily": "arial", "fontSize": "20px" });

		// diamante
		const diamante = this.add.image(1014, 346, "Diamante");
		diamante.scaleX = 4.519269829976841;
		diamante.scaleY = 4.519269829976841;

		// diamante_1
		const diamante_1 = this.add.image(1413.4255196306324, 348.7974987296354, "Diamante");
		diamante_1.scaleX = 4.519269829976841;
		diamante_1.scaleY = 4.519269829976841;

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
			this.scene.start("Scene5");
		}, 2000);
	}
}

/* END OF COMPILED CODE */

// You can write more code here
