
// You can write more code here

/* START OF COMPILED CODE */

class Final extends Phaser.Scene {

	constructor() {
		super("Final");

	}

	/** @returns {void} */
	editorCreate() {

		// fondofinal
		this.add.image(954, 495, "fondofinal");

		// text_1
		const text_1 = this.add.text(412, 133, "", {});
		text_1.text = "Gracias Por Jugar";
		text_1.setStyle({ "color": "#00fb64ff", "fontSize": "100px", "fontStyle": "bold", "stroke": "#000000ff", "strokeThickness":2});

		// text_2
		const text_2 = this.add.text(588, 356, "", {});
		text_2.text = "Desarrollado Por:";
		text_2.setStyle({ "color": "#df0505ff", "fontSize": "70px", "fontStyle": "bold", "stroke": "#000000ff", "strokeThickness":2});

		// text_3
		const text_3 = this.add.text(155, 482, "", {});
		text_3.text = "Isaac Serna Tamayo";
		text_3.setStyle({ "color": "#20aa03ff", "fontSize": "60px", "fontStyle": "bold", "stroke": "#000000ff", "strokeThickness":3});

		// text_4
		const text_4 = this.add.text(272, 789, "", {});
		text_4.text = "Jose Manuel Carmona Mendez";
		text_4.setStyle({ "color": "#43f225ff", "fontSize": "60px", "fontStyle": "bold", "stroke": "#000000ff", "strokeThickness":2});

		// text_5
		const text_5 = this.add.text(973, 494, "", {});
		text_5.text = "(Backend - Frontend)";
		text_5.setStyle({ "color": "#ffffffff", "fontSize": "60px", "fontStyle": "bold", "stroke": "#000000ff", "strokeThickness":2});

		// text_6
		const text_6 = this.add.text(1253, 787, "", {});
		text_6.text = "(Frontend)";
		text_6.setStyle({ "color": "#13a9ffff", "fontSize": "60px", "fontStyle": "bold", "stroke": "#000000ff", "strokeThickness":2});

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
