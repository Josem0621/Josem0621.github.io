var sharksGroup;
var sharksPositions;
var crabsGroup;
var crabsPositions;
var minX;
var maxX;
var moneda_1, moneda_2, moneda_3, moneda_4, moneda_5, moneda_6, moneda_7;
var gema1, gema2;
var jugadorVivo;
var music, over, item;
var restartButton;
var score = 0;
var scoreText;

class Scene2 extends Phaser.Scene {

	constructor() {
		super("Scene2");

		this.overlay = null;
	}
	//Verifica la selección de personajes
	init(data) {
		// Cargar los personajes seleccionados desde la pantalla anterior
		if (data) {
			this.player1Character = data.character;  // Personaje del jugador 1
			this.player2Character = data.character2; // Personaje del jugador 2
		}
	}

	preload() {
		if (player1Character) {
			this.load.spritesheet(player1Character, characterSprites[player1Character], {
				frameWidth: 32,
				frameHeight: 48
			});
		}
		if (player2Character != null) {
			if (player2Character) {
				this.load.spritesheet(player2Character, characterSprites[player2Character], {
					frameWidth: 32,
					frameHeight: 48
				});
			}
		}
		this.load.image('bomb2', 'assets/bomb.png');
		this.load.pack("pack3", "assets/asset-pack-scene2.json")

		this.load.image('leftButton', 'assets/leftButton.png');
		this.load.image('rightButton', 'assets/rightButton.png');
		this.load.image('upButton', 'assets/upButton.png');
		this.load.image('downButton', 'assets/downButton.png');
		this.load.image('toggleControlsacua', 'assets/toggleControlsacua.png'); // botón para mostrar/ocultar controles
		this.load.image('fullscreenButtonacua', 'assets/fullscreenButtonacua.png'); //Pantalla completa
	}

	create() {

		let Preload2 = this.scene.get('main');
        if (Preload2) {
            // Destruir los assets de main
            Preload2.destroyAssetPack();

			// Detener y eliminar Preload2
            this.scene.stop('Preload2');
            this.scene.remove('Preload2');

            // Verificar en la consola si los assets fueron eliminados
            console.log('Textures:', this.textures.list); // Lista de texturas
            console.log('Sounds:', this.sound.sounds); // Lista de sonidos
            console.log('JSON Cache:', this.cache.json.entries); // Lista de JSONs
        }

		this.editorCreate();

		bombs = this.physics.add.group();

		scoreText = this.add.text(15, 13, "S C O R E : 0", {
			fontSize: '32px'
		})

		pointText = this.add.text(15, 40, "N E X T  L E V E L : 400", {
			fontSize: '32px'
		})

		this.physics.add.overlap(player, moneda_1, this.collectCoin, null, this);
		this.physics.add.overlap(player, moneda_2, this.collectCoin, null, this);
		this.physics.add.overlap(player, moneda_3, this.collectCoin, null, this);
		this.physics.add.overlap(player, moneda_4, this.collectCoin, null, this);
		this.physics.add.overlap(player, moneda_5, this.collectCoin, null, this);
		this.physics.add.overlap(player, moneda_6, this.collectCoin, null, this);
		this.physics.add.overlap(player, moneda_7, this.collectCoin, null, this);
		this.physics.add.overlap(player, gema1, this.collectGem, null, this);
		this.physics.add.overlap(player, gema2, this.collectGem, null, this);

		if (player2Character != null) {
			this.physics.add.overlap(player2, moneda_1, this.collectCoin, null, this);
			this.physics.add.overlap(player2, moneda_2, this.collectCoin, null, this);
			this.physics.add.overlap(player2, moneda_3, this.collectCoin, null, this);
			this.physics.add.overlap(player2, moneda_4, this.collectCoin, null, this);
			this.physics.add.overlap(player2, moneda_5, this.collectCoin, null, this);
			this.physics.add.overlap(player2, moneda_6, this.collectCoin, null, this);
			this.physics.add.overlap(player2, moneda_7, this.collectCoin, null, this);
			this.physics.add.overlap(player2, gema1, this.collectGem, null, this);
			this.physics.add.overlap(player2, gema2, this.collectGem, null, this);			
		}

		// Añadir colisión con las bombas
		this.physics.add.collider(bombs, platforms);
		this.physics.add.collider(player, bombs, this.hitBomb, null, this);

		
		if (player2Character != null) {
			this.physics.add.collider(player2, bombs, this.hitBomb, null, this);
		}

		// Añadir colisión con tiburones y cangrejos
		this.physics.add.collider(player, this.tiburon, this.playerDeath, null, this);
		this.physics.add.collider(player, this.cangrejos, this.playerDeath, null, this);
		this.physics.add.collider(player, this.lava, this.playerDeath, null, this);

		if (player2Character != null) {
			this.physics.add.collider(player2, this.tiburon, this.playerDeath, null, this);
			this.physics.add.collider(player2, this.cangrejos, this.playerDeath, null, this);
			this.physics.add.collider(player2, this.lava, this.playerDeath, null, this);
		}

		this.plataformas.forEach(platform => {
			this.physics.add.collider(bombs, platform);
		});

		// Crear animación de monedas
		this.anims.create({
			key: 'msilver',
			frameRate: 10,
			repeat: -1
		});

		// Reproducir animación de monedas
		moneda_1.children.iterate(function (child) {
			child.play('msilver');
		});
		moneda_2.children.iterate(function (child) {
			child.play('msilver');
		});
		moneda_3.children.iterate(function (child) {
			child.play('msilver');
		});
		moneda_4.children.iterate(function (child) {
			child.play('msilver');
		});
		moneda_5.children.iterate(function (child) {
			child.play('msilver');
		});
		moneda_6.children.iterate(function (child) {
			child.play('msilver');
		});
		moneda_7.children.iterate(function (child) {
			child.play('msilver');
		});
	}

	update() {
		// Iterar sobre cada shark y manejar su movimiento
		sharksGroup.getChildren().forEach(shark => {
			const { minX, maxX, direction } = shark.customData;

			if (shark.x <= minX) {
				shark.body.velocity.x = 100; // Cambiar dirección a la derecha
				shark.customData.direction = 1;
				shark.setFlipX(true); // Voltear imagen si es necesario
			} else if (shark.x >= maxX) {
				shark.body.velocity.x = -100; // Cambiar dirección a la izquierda
				shark.customData.direction = -1;
				shark.setFlipX(false); // Voltear imagen si es necesario
			}
		});

		// Iterar sobre cada shark y manejar su movimiento
		crabsGroup.getChildren().forEach(crab => {
			const { minX, maxX, direction } = crab.customData;

			if (crab.x <= minX) {
				crab.body.velocity.x = 50; // Cambiar dirección a la derecha
				crab.customData.direction = 1;
				crab.setFlipX(true); // Voltear imagen si es necesario
			} else if (crab.x >= maxX) {
				crab.body.velocity.x = -50; // Cambiar dirección a la izquierda
				crab.customData.direction = -1;
				crab.setFlipX(false); // Voltear imagen si es necesario
			}
		});
		if (cursors.left.isDown) {
			player.setVelocityX(-160);
			player.anims.play("left", true);
		} else if (cursors.right.isDown) {
			player.setVelocityX(160);
			player.anims.play("right", true);
		} else {
			player.setVelocityX(0);
			player.anims.play("turn");
		}
		if (cursors.up.isDown && player.body.touching.down) {
			player.setVelocityY(-330);
		}
		if (cursors.down.isDown) {
			player.setVelocityY(330);
		}

		// Detección de múltiples teclas al mismo tiempo
		if (cursors.right.isDown && cursors.up.isDown && player.body.touching.down) {
			// Asegúrate de que el personaje pueda moverse hacia la derecha mientras salta
			player.setVelocityX(170);
			player.setVelocityY(-290);
			player.anims.play("right", true);
		} else if (cursors.left.isDown && cursors.up.isDown && player.body.touching.down) {
			// Asegúrate de que el personaje pueda moverse hacia la izquierda mientras salta
			player.setVelocityX(-170);
			player.setVelocityY(-290);
			player.anims.play("left", true);
		}

		if (player2Character != null) {
			// Movimiento para el segundo personaje (con teclas ASDW)
			if (wasd.left.isDown) {
				player2.setVelocityX(-160);
				player2.anims.play("left2", true);
			} else if (wasd.right.isDown) {
				player2.setVelocityX(160);
				player2.anims.play("right2", true);
			} else {
				player2.setVelocityX(0);
				player2.anims.play("turn2");
			}
			if (wasd.up.isDown && player2.body.touching.down) {
				player2.setVelocityY(-330);
			}
			if (wasd.down.isDown) {
				player2.setVelocityY(330);
			}
		}
	}

	//funcion para coleccionar las monedas
	collectCoin(player, coin) {
		coin.disableBody(true, true);
		score += 10;
		scoreText.setText('S C O R E: ' + score);
		this.checkAllCollected();
		item.play()
	}

	collectCoin2(player2, coin) {
		coin.disableBody(true, true);
		score += 10;
		scoreText.setText('S C O R E: ' + score);
		this.checkAllCollected();
		item.play()
	}

	//funcion para coleccionar las gemas
	collectGem(player, gem) {
		gem.disableBody(true, true);
		score += 30;
		scoreText.setText('S C O R E: ' + score);
		this.checkAllCollected();
		item.play()
	}

	collectGem2(player2, gem) {
		gem.disableBody(true, true);
		score += 30;
		scoreText.setText('S C O R E: ' + score);
		this.checkAllCollected();
		item.play()
	}

	showCongratulationsAndChangeScene() {
		over.stop()
		music.stop()
		// Mensaje para mostrar en pantalla
		let felicitacionesText = this.add.text(300, 350, 'Felicidades, pasaste al nivel 3!', { fontSize: '72px', fill: '#ffffff' });
		felicitacionesText.setDepth(1000)
		this.pauseButton.setVisible(false)
		this.resumeButton.setVisible(false)

		// Temporizador para eliminar el texto después de 3 segundos
		this.time.delayedCall(3000, function () {
			felicitacionesText.destroy();
			this.cameras.main.fadeOut(1000); // Ejemplo de desvanecimiento de pantalla
			this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
				this.scene.start('Preload3');
				score = 0
				this.scene.remove('Scene2')

			});
		}, [], this);
	}

	// Función para cambiar de escena cuando el jugador muere y se cumplen ciertos puntos
	changeSceneIfConditionsMet() {
		// Define la cantidad de puntos requerida para cambiar de escena
		const puntosParaCambio = 400;


		// Verifica si el jugador ha muerto (usando la variable jugadorVivo)
		if (!jugadorVivo) {
			if (score >= puntosParaCambio) {
				// Cambiar a la siguiente escena
				this.showCongratulationsAndChangeScene();

			} else {
				music.stop()
				// Muestra el texto "GAME OVER" y el puntaje
				const gameOverText = this.add.text(950, 350, "GAME OVER", {
					fontSize: "72px",
					fontFamily: "arial",
					fill: "red",
				});
				gameOverText.setDepth(1000)
				gameOverText.setOrigin(0.5);
				this.pauseButton.setVisible(false)
				this.resumeButton.setVisible(false)
				// Muestra el puntaje alcanzado
				const scoreDisplay = this.add.text(950, 420, "Tu Puntaje: " + score, {
					fontSize: "36px",
					fontFamily: "arial",
					fill: "red",
				});
				scoreDisplay.setOrigin(0.5);
				scoreDisplay.setDepth(1000)

				// Reinicia la escena de juego cuando se hace clic en el botón
				restartButton = this.add.image(950, 500, "acuarestartButton");
				restartButton.setInteractive(); // Hacer el botón interactivo
				restartButton.on("pointerdown", () => {
					this.scene.restart();
					score = null;
				});
				// Animación del texto "COMENZAR"
				restartButton.on('pointerover', () => {
					this.tweens.add({
						targets: restartButton,
						scaleX: 1.5,
						scaleY: 1.5,
						duration: 300,
						ease: 'Quad.easeInOut'
					});
				});

				restartButton.on('pointerout', () => {
					this.tweens.add({
						targets: restartButton,
						scaleX: 1,
						scaleY: 1,
						duration: 300,
						ease: 'Quad.easeInOut'
					});
				});
				restartButton.setDepth(1000)

			}

		}

	}

	//funcion para verificar si el jugador choca con las sierras 
	playerDeath(player, sharksGroup, crabsGroup, lava) {
		this.physics.pause();
		player.setTint(0xff0000);
		player.anims.play('turn');
		// Asume que jugadorVivo se establece en false cuando el jugador muere
		jugadorVivo = false;
		music.stop()
		this.pauseButton.setVisible(false)
		this.resumeButton.setVisible(false)
		// Llama a la función para cambiar de escena si se cumplen las condiciones
		this.changeSceneIfConditionsMet();
		this.overlay.setVisible(true);
		// Play death sound only once
		if (!this.deathSoundPlayed) {
			over.play();
			this.deathSoundPlayed = true; // Ensure sound is played only once
		}
	}
	//Verifica si se ha recolectado todas las monedas y gemas
	//Y las hace reaparecer, cuando pasa se lanza una bomba
	checkAllCollected() {
		// Verificar si todas las monedas y gemas fueron recolectadas
		if (this.allCollected(moneda_1) && this.allCollected(moneda_2) && this.allCollected(moneda_3) &&
			this.allCollected(moneda_4) && this.allCollected(moneda_5) && this.allCollected(moneda_6) &&
			this.allCollected(moneda_7) && this.allCollected(gema1) && this.allCollected(gema2)) {

			// Reaparecer todas las monedas y gemas
			this.respawnCollectibles(moneda_1);
			this.respawnCollectibles(moneda_2);
			this.respawnCollectibles(moneda_3);
			this.respawnCollectibles(moneda_4);
			this.respawnCollectibles(moneda_5);
			this.respawnCollectibles(moneda_6);
			this.respawnCollectibles(moneda_7);
			this.respawnCollectibles(gema1);
			this.respawnCollectibles(gema2);

			// Lanzar bombas
			this.launchBombs();
		}
	}
	//Función para verificar si se ha llegado a 0
	allCollected(group) {
		return group.countActive(true) === 0;
	}
	//Función para volver a reaparecer las gemas y monedas
	respawnCollectibles(group) {
		group.children.iterate(function (child) {
			child.enableBody(true, child.x, child.y, true, true);
		});
	}
	//Función para lanzar las bombas
	launchBombs() {
		var x = player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
		var bomb = bombs.create(x, 50, "bomb2");
		bomb.setBounce(1);
		bomb.setCollideWorldBounds(true);
		bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
		bomb.setScale(1.5);
		bomb.setCircle(7);
		bomb.setOffset(4,3);
	}
	//Funcion para verificar si el jugador toca la bomba
	hitBomb(player, bomb) {
		this.physics.pause();
		player.setTint(0xff0000);
		player.anims.play("turn");
		music.stop();
		// Llama a la función para cambiar de escena si se cumplen las condiciones
		this.changeSceneIfConditionsMet();
		this.overlay.setVisible(true);
		// Play death sound only once
		if (!this.deathSoundPlayed) {
			over.play();
			this.deathSoundPlayed = true; // Ensure sound is played only once
		}
	}
	/** @returns {void} */
	editorCreate() {
		music = this.sound.add("aguasound", {loop : true});
		music.play();
		over = this.sound.add("oversound");
		this.deathSoundPlayed = false;
		item = this.sound.add("items");


		// underwater_fantasy_preview
		this.add.image(952, 494, "underwater-fantasy-preview");

		this.overlay = this.add.rectangle(954, 504, 128, 128);
		this.overlay.scaleX = 15.007477053750433;
		this.overlay.scaleY = 7.8740055126274155;
		this.overlay.isFilled = true;
		this.overlay.fillColor = 0;
		this.overlay.setDepth(1000);
		this.overlay.setAlpha(0.5)
		this.overlay.setVisible(false)

		// plataforma_grande
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const plataforma_grande = this.add.image(489, 759, "plataforma_grande");
		this.physics.add.existing(plataforma_grande, true);
		plataforma_grande.body.setSize(356, 67, false);

		// plataforma_chica
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const plataforma_chica = this.add.image(821, 803, "plataforma_chica");
		this.physics.add.existing(plataforma_chica, true);
		plataforma_chica.body.setSize(36, 35, false);

		// plataforma_chica_1
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const plataforma_chica_1 = this.add.image(993, 713, "plataforma_chica");
		this.physics.add.existing(plataforma_chica_1, true);
		plataforma_chica_1.body.setSize(36, 35, false);

		// plataforma_chica_2
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const plataforma_chica_2 = this.add.image(1158, 817, "plataforma_chica");
		this.physics.add.existing(plataforma_chica_2, true);
		plataforma_chica_2.body.setSize(36, 35, false);

		// plataforma_mediana
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const plataforma_mediana = this.add.image(1382, 779, "plataforma_mediana");
		this.physics.add.existing(plataforma_mediana, true);
		plataforma_mediana.body.setSize(108, 35, false);

		// plataforma_chica_3
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const plataforma_chica_3 = this.add.image(1563, 692, "plataforma_chica");
		this.physics.add.existing(plataforma_chica_3, true);
		plataforma_chica_3.body.setSize(36, 35, false);

		// plataforma_grande_1
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const plataforma_grande_1 = this.add.image(1860, 538, "plataforma_grande");
		this.physics.add.existing(plataforma_grande_1, true);
		plataforma_grande_1.body.setSize(356, 67, false);

		// plataforma_chica_4
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const plataforma_chica_4 = this.add.image(1894, 404, "plataforma_chica");
		this.physics.add.existing(plataforma_chica_4, true);
		plataforma_chica_4.body.setSize(36, 35, false);

		// plataforma_chica_5
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const plataforma_chica_5 = this.add.image(1823, 267, "plataforma_chica");
		this.physics.add.existing(plataforma_chica_5, true);
		plataforma_chica_5.body.setSize(36, 35, false);

		// platagua1
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platagua1 = this.add.image(1522, 312, "platagua1");
		this.physics.add.existing(platagua1, true);
		platagua1.body.setSize(216, 108, false);

		// platagua2
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platagua2 = this.add.image(1520, 240, "platagua2");
		this.physics.add.existing(platagua2, true);
		platagua2.body.setSize(144, 36, false);

		// plataforma_mediana_1
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const plataforma_mediana_1 = this.add.image(1228, 479, "plataforma_mediana");
		this.physics.add.existing(plataforma_mediana_1, true);
		plataforma_mediana_1.body.setSize(108, 35, false);

		// plataforma_chica_6
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const plataforma_chica_6 = this.add.image(1222, 208, "plataforma_chica");
		this.physics.add.existing(plataforma_chica_6, true);
		plataforma_chica_6.body.setSize(36, 35, false);

		// plataforma_chica_7
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const plataforma_chica_7 = this.add.image(1025, 270, "plataforma_chica");
		this.physics.add.existing(plataforma_chica_7, true);
		plataforma_chica_7.body.setSize(36, 35, false);

		// plataforma_chica_8
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const plataforma_chica_8 = this.add.image(796, 169, "plataforma_chica");
		this.physics.add.existing(plataforma_chica_8, true);
		plataforma_chica_8.body.setSize(36, 35, false);

		// plataforma_mediana_2
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const plataforma_mediana_2 = this.add.image(546, 230, "plataforma_mediana");
		this.physics.add.existing(plataforma_mediana_2, true);
		plataforma_mediana_2.body.setSize(108, 35, false);

		// plataforma_chica_9
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const plataforma_chica_9 = this.add.image(784, 423, "plataforma_chica");
		this.physics.add.existing(plataforma_chica_9, true);
		plataforma_chica_9.body.setSize(36, 35, false);

		// plataforma_grande_2
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const plataforma_grande_2 = this.add.image(110, 396, "plataforma_grande");
		this.physics.add.existing(plataforma_grande_2, true);
		plataforma_grande_2.body.setSize(356, 67, false);

		// Crear grupo para todos los sharks
		sharksGroup = this.physics.add.group();

		// Crear sharks y agregarlos al grupo
		const sharksData = [
			{ x: 1854, y: 592, startDirection: -1, minX: 50, maxX: 1800 }, // Ejemplo de tiburón con límites personalizados
			{ x: 1852, y: 60, startDirection: -1, minX: 50, maxX: 1800 },
			{ x: 37, y: 644, startDirection: 1, minX: 50, maxX: 1800 }, // Ejemplo de tiburón con límites personalizados diferentes
			{ x: 41, y: 123, startDirection: 1, minX: 50, maxX: 1800 },
			{ x: 1352, y: 366, startDirection: -1, minX: 400, maxX: 1300 }
		];

		sharksData.forEach(data => {
			let shark = sharksGroup.create(data.x, data.y, 'sharks');
			shark.body.velocity.x = -100 * data.startDirection;
			shark.body.allowGravity = false;
			shark.body.collideWorldBounds = true;
			shark.body.setSize(72, 41, false);
			shark.play('shark'); // Asumiendo que tienes una animación llamada 'shark' configurada
			shark.customData = {
				minX: data.minX,
				maxX: data.maxX,
				direction: data.startDirection
			};
		});

		gema1 = this.physics.add.group({
			key: "gem1",
			repeat: 0,
			setXY: { x: 786, y: 329, stepX: 70 },
			bounceY: 0.5
		})

		gema2 = this.physics.add.group({
			key: "gem1",
			repeat: 0,
			setXY: { x: 1226, y: 376, stepX: 70 },
			bounceY: 0.5
		})

		// decomediana
		this.add.image(1415, 737, "decomediana");

		// decomediana_1
		this.add.image(1262, 437, "decomediana");

		// decomediana_2
		this.add.image(581, 189, "decomediana");

		// decoagua
		this.add.image(1518, 215, "decoagua");

		// decoagua_1
		this.add.image(376, 718, "decoagua");

		// decoagua_2
		const decoagua_2 = this.add.image(591, 719, "decoagua");
		decoagua_2.flipX = true;

		// decoagua_3
		const decoagua_3 = this.add.image(470, 718, "decoagua");
		decoagua_3.flipX = true;

		// decoagua_4
		this.add.image(45, 355, "decoagua");

		// decoagua_5
		this.add.image(1749, 498, "decoagua");

		// decoagua_6
		this.add.image(1888, 498, "decoagua");

		// Crear grupo para todos los crabs
		crabsGroup = this.physics.add.group();

		// Crear crabs y agregarlos al grupo
		const crabsData = [
			{ x: 1910, y: 491, startDirection: -1, minX: 1700, maxX: 1870 }, // Ejemplo de tiburón con límites personalizados
			{ x: 631, y: 712, startDirection: -1, minX: 330, maxX: 630 },
		];

		crabsData.forEach(data => {
			let crab = crabsGroup.create(data.x, data.y, 'crabs');
			crab.body.velocity.x = -50 * data.startDirection;
			crab.body.allowGravity = false;
			crab.body.collideWorldBounds = true;
			crab.body.setSize(44, 26, false);
			crab.play('crabs'); // Asumiendo que tienes una animación llamada 'crab' configurada
			crab.customData = {
				minX: data.minX,
				maxX: data.maxX,
				direction: data.startDirection
			};
		});

		moneda_1 = this.physics.add.group({
			key: "monedas",
			repeat: 3,
			setXY: { x: 356, y: 602, stepX: 70 },
			bounceY: 0.5
		})

		moneda_2 = this.physics.add.group({
			key: "monedas",
			repeat: 0,
			setXY: { x: 992, y: 593, stepX: 70 },
			bounceY: 0.5
		})

		moneda_3 = this.physics.add.group({
			key: "monedas",
			repeat: 1,
			setXY: { x: 1340, y: 667, stepX: 70 },
			bounceY: 0.5
		})

		moneda_4 = this.physics.add.group({
			key: "monedas",
			repeat: 1,
			setXY: { x: 1724, y: 381, stepX: 70 },
			bounceY: 0.5
		})

		moneda_5 = this.physics.add.group({
			key: "monedas",
			repeat: 1,
			setXY: { x: 1479, y: 110, stepX: 70 },
			bounceY: 0.5
		})

		moneda_6 = this.physics.add.group({
			key: "monedas",
			repeat: 0,
			setXY: { x: 538, y: 79, stepX: 70 },
			bounceY: 0.5
		})

		moneda_7 = this.physics.add.group({
			key: "monedas",
			repeat: 2,
			setXY: { x: 55, y: 254, stepX: 70 },
			bounceY: 0.5
		})

		const lava = this.add.image(936, 1030, "arena")
		lava.scaleY = 0.47652280382412204;

		//Jugador
		player = this.physics.add.sprite(400, 570, player1Character);
		player.setCollideWorldBounds(true);
		player.setSize(22, 36);
		player.setOffset(5, 12);
		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers(player1Character, {
				start: 0,
				end: 3
			}),
			frameRate: 10,
			repeat: -1
		})
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers(player1Character, {
				start: 5,
				end: 8
			}),
			frameRate: 10,
			repeat: -1
		})
		this.anims.create({
			key: 'turn',
			frames: [{ key: player1Character, frame: 4 }],
			frameRate: 20,
		})
		cursors = this.input.keyboard.createCursorKeys();

		if (player2Character != null) {
			// Jugador 2
			player2 = this.physics.add.sprite(80, 200, player2Character); // Ajusta la posición inicial y el sprite
			player2.setCollideWorldBounds(true);
			player2.setSize(22, 36);
			player2.setOffset(5, 12);
			this.anims.create({
				key: 'left2',
				frames: this.anims.generateFrameNumbers(player2Character, { start: 0, end: 3 }),
				frameRate: 10,
				repeat: -1
			});
			this.anims.create({
				key: 'right2',
				frames: this.anims.generateFrameNumbers(player2Character, { start: 5, end: 8 }),
				frameRate: 10,
				repeat: -1
			});
			this.anims.create({
				key: 'turn2',
				frames: [{ key: player2Character, frame: 4 }],
				frameRate: 20,
			});

			// Configura las teclas ASDW para el segundo personaje
			wasd = this.input.keyboard.addKeys({
				up: Phaser.Input.Keyboard.KeyCodes.W,
				down: Phaser.Input.Keyboard.KeyCodes.S,
				left: Phaser.Input.Keyboard.KeyCodes.A,
				right: Phaser.Input.Keyboard.KeyCodes.D
			});
		}

		// Botones táctiles
		this.leftButton = this.add.image(300, 865, 'leftButton').setInteractive().setVisible(false);
		this.rightButton = this.add.image(520, 865, 'rightButton').setInteractive().setVisible(false);
		this.upButton = this.add.image(1700, 750, 'upButton').setInteractive().setVisible(false);
		this.downButton = this.add.image(1695, 920, 'downButton').setInteractive().setVisible(false);
		
		// Botón para mostrar/ocultar controles
		this.toggleControlsButton = this.add.image(1782, 35, 'toggleControlsacua').setInteractive();
		
		this.showControls = false;  // Control para mostrar/ocultar los botones
	
		// Evento para mostrar/ocultar los controles
		this.toggleControlsButton.on('pointerdown', () => {
			this.showControls = !this.showControls;
			this.leftButton.setVisible(this.showControls);
			this.rightButton.setVisible(this.showControls);
			this.upButton.setVisible(this.showControls);
			this.downButton.setVisible(this.showControls);
		});
	
		// Eventos de movimiento de los botones táctiles
		this.leftButton.on('pointerdown', () => cursors.left.isDown = true);
		this.leftButton.on('pointerup', () => cursors.left.isDown = false);
	
		this.rightButton.on('pointerdown', () => cursors.right.isDown = true);
		this.rightButton.on('pointerup', () => cursors.right.isDown = false);
	
		this.upButton.on('pointerdown', () => cursors.up.isDown = true);
		this.upButton.on('pointerup', () => cursors.up.isDown = false);
	
		this.downButton.on('pointerdown', () => cursors.down.isDown = true);
		this.downButton.on('pointerup', () => cursors.down.isDown = false);
	
		// Crear botón de pantalla completa
		let fullscreenButtonacua = this.add.image(1855, 35, 'fullscreenButtonacua').setInteractive();

		// Evento para activar/desactivar pantalla completa
		fullscreenButtonacua.on('pointerdown', () => {
			if (this.scale.isFullscreen) {
				this.scale.stopFullscreen(); // Salir de pantalla completa
			} else {
				this.scale.startFullscreen(); // Activar pantalla completa
			}
		});

		// lists
		const plataformas = [plataforma_grande, plataforma_grande_2, plataforma_chica_9, plataforma_mediana_2, plataforma_chica_8, plataforma_chica_7, plataforma_chica_6, plataforma_mediana_1, platagua2, platagua1, plataforma_chica_5, plataforma_chica_4, plataforma_grande_1, plataforma_chica_3, plataforma_mediana, plataforma_chica_2, plataforma_chica_1, plataforma_chica];
		const tiburon = [sharksGroup];
		const cangrejos = [crabsGroup];
		const monedas = [moneda_1, moneda_2, moneda_3, moneda_4, moneda_5, moneda_6, moneda_7];
		const gemas = [gema1, gema2];

		// collider
		this.physics.add.collider(plataformas, monedas);
		this.physics.add.collider(plataformas, gemas);
		this.physics.add.collider(plataformas, tiburon);
		this.physics.add.collider(player, plataformas);
		if (player2Character != null) {
			this.physics.add.collider(player2, plataformas);
		}
		this.lava = this.physics.add.staticGroup([lava]);

		this.plataformas = plataformas;
		this.tiburon = tiburon;
		this.cangrejos = cangrejos;
		this.monedas = monedas;
		this.gemas = gemas;
		this.lava = lava

		this.resumeButton = this.add.image(980, 35, "acuarplayButton")
		this.resumeButton.setInteractive();
		this.resumeButton.setVisible(false);
		this.resumeButton.on("pointerdown", () => this.resumeGame())

		// Agrega un botón de pausa y lo hace una propiedad del objeto de juego
		this.pauseButton = this.add.image(980, 35, "acuarstopButton");
		this.pauseButton.setInteractive();
		this.pauseButton.on("pointerdown", () => this.pauseGame());
		this.events.emit("scene-awake");

		// Crea las imágenes para sonido y silencio
		const soundOnImage = this.add.image(1700, 35, "acuasoundButton");
		const soundOffImage = this.add.image(1700, 35, "acuamuteButton");
	
		// Inicializa la visibilidad de las imágenes
		soundOnImage.setVisible(true);
		soundOffImage.setVisible(false);
	
		// Asigna eventos de clic a las imágenes
		soundOnImage.setInteractive();
		soundOffImage.setInteractive();
	
		soundOnImage.on("pointerdown", toggleSound);
		soundOffImage.on("pointerdown", toggleSound);
	
		// Variable para controlar el estado del sonido
		let soundEnabled = true;
	
		// Función para alternar entre sonido y silencio
		function toggleSound() {
		  soundEnabled = !soundEnabled;
		  if (soundEnabled) {
			soundOnImage.setVisible(true);
			soundOffImage.setVisible(false);
			music.resume(); // Reanuda la música si estaba pausada
			item.setMute(false)
		  } else {
			soundOnImage.setVisible(false);
			soundOffImage.setVisible(true);
			music.pause(); // Pausa la música
			item.setMute(true)
		  }
		}
	}

	pauseGame() {
		// Hace visible el botón de reanudar
		this.resumeButton.setVisible(true);
		// Esconde el botón de pausa
		this.pauseButton.setVisible(false); // Ahora pauseButton es accesible como this.pauseButton
		// Pausa la física y la música
		this.physics.pause();
		music.pause();
	}

	resumeGame() {
		// Hace visible el botón de pausa
		this.pauseButton.setVisible(true); // Ahora pauseButton es accesible como this.pauseButton
		// Esconde el botón de reanudar
		this.resumeButton.setVisible(false);
		// Reanuda la física y la música
		this.physics.resume();
		music.resume();
	}

	/** @type {Phaser.GameObjects.Image[]} */
	plataformas;
	/** @type {Phaser.GameObjects.Sprite[]} */
	tiburon;
	/** @type {Phaser.GameObjects.Sprite[]} */
	monedas;
	/** @type {Phaser.GameObjects.Image[]} */
	gemas;

	/* START-USER-CODE */

	// Write your code here



	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
