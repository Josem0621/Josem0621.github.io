
// You can write more code here

/* START OF COMPILED CODE */

class Preload3 extends Phaser.Scene {

	constructor() {
		super("Preload3");

	}

	/** @returns {void} */
	editorCreate() {

		// jungle
		const jungle = this.add.image(961, 514, "Jungle");
		jungle.scaleX = 1.927092607278662;
		jungle.scaleY = 1.6847823225337388;

		// deco2jungle
		const deco2jungle = this.add.image(919, 415, "deco2jungle");
		deco2jungle.scaleX = 4.3220945990871815;
		deco2jungle.scaleY = 4.3220945990871815;

		// progressBar
		const progressBar = this.add.rectangle(450, 478, 256, 20);
		progressBar.scaleX = 4;
		progressBar.scaleY = 4;
		progressBar.setOrigin(0, 0);
		progressBar.isFilled = true;
		progressBar.fillColor = 14737632;

		// preloadUpdater
		new PreloadBarUpdaterScript(progressBar);

		// progressBarBg
		const progressBarBg = this.add.rectangle(450, 478, 256, 20);
		progressBarBg.scaleX = 4;
		progressBarBg.scaleY = 4;
		progressBarBg.setOrigin(0, 0);
		progressBarBg.fillColor = 14737632;
		progressBarBg.isStroked = true;

		// loadingText
		const loadingText = this.add.text(434, 364, "", {});
		loadingText.scaleX = 4;
		loadingText.scaleY = 4;
		loadingText.text = "Loading...";
		loadingText.setStyle({ "color": "#e0e0e0", "fontFamily": "arial", "fontSize": "20px" });

		// gorilas
		const gorilas = this.add.sprite(930, 362, "gorila");
		gorilas.scaleX = 3.0746112469698534;
		gorilas.scaleY = 3.0746112469698534;
		gorilas.play("Gorila");

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	editorPreload(){
		this.preload()
	}

	preload() {

		this.load.pack("pack4", "assets/asset-pack-preload3.json")
		this.load.image("gorila", "assets/gorila-1.png")
		this.editorCreate();


		setTimeout(() => {
			this.scene.start("Scene3");
		}, 2000);
	}
}

/* END OF COMPILED CODE */

// You can write more code here
