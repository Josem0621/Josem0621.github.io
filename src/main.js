


window.addEventListener('load', function () {

	var game = new Phaser.Game({
		width: 1910,
		height: 1000,
		type: Phaser.AUTO,
		backgroundColor: "#242424",
		physics: {
			default: 'arcade',
			arcade: {
				gravity: { y: 300 },
				debug: false
			}
		},
		scene: [Boot, Preload, Preload1, Preload2, Preload3, Preload4, Preload5, Level, Players, Scene1, Scene2, Scene3, Scene4, Scene5, Final, Scene6],
		
		scale: {
			mode: Phaser.Scale.NO_SCALE,
			autoCenter: Phaser.Scale.CENTER_BOTH
		}
	});
});

class Boot extends Phaser.Scene {

	preload() {

		this.load.image("crab1", "assets/crab1.png")
		this.load.image("sharks", "assets/sharks.png")

		// Guardar las claves de los assets cargados
        this.assetKeys = [];
        this.load.on('filecomplete', (key, type) => {
            this.assetKeys.push(key);
        });
		
	}

	create() {
		this.scene.start("Level");
		this.scene.stop("main")
		this.scene.remove("main")
	}

	destroyAssetPack() {
        // Recorrer las claves de los assets y eliminar cada uno
        this.assetKeys.forEach(key => {
            this.textures.remove(key); // Eliminar imágenes, spritesheets, etc.
            this.sound.remove(key); // Eliminar sonidos
            this.cache.json.remove(key); // Eliminar JSON data
            this.cache.bitmapFont.remove(key); // Eliminar bitmap fonts
            // Otros tipos de recursos pueden requerir métodos específicos
        });

        // Vaciar el array de claves después de la eliminación
        this.assetKeys = [];
    }
}