var buhoGroup;
var buhoPositions;
var minX;
var maxX;
var moneda_1, moneda_2, moneda_3, moneda_4, moneda_5, moneda_6, moneda_7;
var gema1, gema2;
var jugadorVivo;
var music, over, item;
var restartButton;
var score = 0;
var scoreText, pointText;
var cursors;

class Scene4 extends Phaser.Scene {

	constructor() {
		super("Scene4");
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
		this.load.image('bomb1', 'assets/roca.png');
		this.load.pack("pack11", "assets/asset-pack-scene4.json")

		this.load.image('leftButton', 'assets/leftButton.png');
		this.load.image('rightButton', 'assets/rightButton.png');
		this.load.image('upButton', 'assets/upButton.png');
		this.load.image('downButton', 'assets/downButton.png');
		this.load.image('toggleControlsaire', 'assets/toggleControlsaire.png'); // botón para mostrar/ocultar controles
		this.load.image('fullscreenButtonaire', 'assets/fullscreenButtonaire.png'); //Pantalla completa
	}

	create() {
		this.editorCreate();

		bombs = this.physics.add.group();

		scoreText = this.add.text(15, 13, "S C O R E : 0", {
			fontSize: '32px'
		})

		pointText = this.add.text(15, 40, "N E X T  L E V E L : 500", {
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
			this.physics.add.collider(player2, bombs, this.hitBomb, null, this);	
			this.physics.add.collider(player2, this.buho, this.playerDeath, null, this);
			this.physics.add.collider(player2, this.lava, this.playerDeath, null, this);		
		}

		// Añadir colisión con las bombas
		this.physics.add.collider(bombs, platforms);
		this.physics.add.collider(player, bombs, this.hitBomb, null, this);

		// Añadir colisión con buho y lava
		this.physics.add.collider(player, this.buho, this.playerDeath, null, this);
		this.physics.add.collider(player, this.lava, this.playerDeath, null, this);

		this.plataformas.forEach(platform => {
			this.physics.add.collider(bombs, platform);
		});

		// Crear animación de monedas
		this.anims.create({
			key: 'star',
			frameRate: 10,
			repeat: -1
			
		});

		// Reproducir animación de monedas
		moneda_1.children.iterate(function (child) {
			child.play('stars');
			child.body.setAllowGravity(false);
        	child.body.immovable = true;
		
		});
		moneda_2.children.iterate(function (child) {
			child.play('stars');
			child.body.setAllowGravity(false);
        	child.body.immovable = true;
		
		});
		moneda_3.children.iterate(function (child) {
			child.play('stars');
			child.body.setAllowGravity(false);
        	child.body.immovable = true;
		
		});
		moneda_3.children.iterate(function (child) {
			child.play('stars');
			child.body.setAllowGravity(false);
        	child.body.immovable = true;
		
		});
		moneda_4.children.iterate(function (child) {
			child.play('stars');
			child.body.setAllowGravity(false);
        	child.body.immovable = true;
		
		});
		moneda_5.children.iterate(function (child) {
			child.play('stars');
			child.body.setAllowGravity(false);
        	child.body.immovable = true;
		
		});
		moneda_6.children.iterate(function (child) {
			child.play('stars');
			child.body.setAllowGravity(false);
        	child.body.immovable = true;
		
		});
		moneda_7.children.iterate(function (child) {
			child.play('stars');
			child.body.setAllowGravity(false);
        	child.body.immovable = true;
		
		});

		// Iterar sobre cada moneda en el grupo y aplicar las configuraciones adicionales
		gema1.children.iterate(function(child) {
			child.setBounceY(0);               // Eliminar el rebote vertical
			child.body.setAllowGravity(false); // Desactivar la gravedad
			child.body.setImmovable(true);     // Hacer el cuerpo estático
		});

		// Iterar sobre cada moneda en el grupo y aplicar las configuraciones adicionales
		gema2.children.iterate(function(child) {
			child.setBounceY(0);               // Eliminar el rebote vertical
			child.body.setAllowGravity(false); // Desactivar la gravedad
			child.body.setImmovable(true);     // Hacer el cuerpo estático
		});
		
	}
	update() {
		// Iterar sobre cada buho y manejar su movimiento
		buhoGroup.getChildren().forEach(buho => {
			const { minX, maxX, direction } = buho.customData;

			if (buho.x <= minX) {
				buho.body.velocity.x = 100; // Cambiar dirección a la derecha
				buho.customData.direction = 1;
				buho.setFlipX(true); // Voltear imagen si es necesario
			} else if (buho.x >= maxX) {
				buho.body.velocity.x = -100; // Cambiar dirección a la izquierda
				buho.customData.direction = -1;
				buho.setFlipX(false); // Voltear imagen si es necesario
			}
		});
		if (cursors.left.isDown) {
			player.setVelocityX(-165);
			player.anims.play("left", true);
		} else if (cursors.right.isDown) {
			player.setVelocityX(165);
			player.anims.play("right", true);
		} else {
			player.setVelocityX(0);
			player.anims.play("turn");
		}
		if (cursors.up.isDown && player.body.touching.down) {
			player.setVelocityY(-320);
		}
		if (cursors.down.isDown) {
			player.setVelocityY(330);
		}

		if (player2Character != null) {
			// Movimiento para el segundo personaje (con teclas ASDW)
			if (wasd.left.isDown) {
				player2.setVelocityX(-165);
				player2.anims.play("left2", true);
			} else if (wasd.right.isDown) {
				player2.setVelocityX(165);
				player2.anims.play("right2", true);
			} else {
				player2.setVelocityX(0);
				player2.anims.play("turn2");
			}
			if (wasd.up.isDown && player2.body.touching.down) {
				player2.setVelocityY(-320);
			}
			if (wasd.down.isDown) {
				player2.setVelocityY(300);
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
		score += 50;
		scoreText.setText('S C O R E: ' + score);
		this.checkAllCollected();
		item.play()
	}

	collectGem2(player2, gem) {
		gem.disableBody(true, true);
		score += 50;
		scoreText.setText('S C O R E: ' + score);
		this.checkAllCollected();
		item.play()
	}

	showCongratulationsAndChangeScene() {
		over.stop()
		// Mensaje para mostrar en pantalla
		let felicitacionesText = this.add.text(300, 350, 'Felicidades, pasaste al nivel 5!', { fontSize: '72px', fill: '#ffffff' });
		felicitacionesText.setDepth(1000)
		this.pauseButton.setVisible(false)
		this.resumeButton.setVisible(false)
		// Temporizador para eliminar el texto después de 3 segundos
		this.time.delayedCall(3000, function () {
			felicitacionesText.destroy();
			this.cameras.main.fadeOut(1000); // Ejemplo de desvanecimiento de pantalla
			this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
				this.scene.start('Preload5');
				this.scene.remove('Scene4')
				score = 0

			});
		}, [], this);
	}

	// Función para cambiar de escena cuando el jugador muere y se cumplen ciertos puntos
	changeSceneIfConditionsMet() {
		// Define la cantidad de puntos requerida para cambiar de escena
		const puntosParaCambio = 500;


		// Verifica si el jugador ha muerto (usando la variable jugadorVivo)
		if (!jugadorVivo) {
			if (score >= puntosParaCambio) {
				// Cambiar a la siguiente escena
				this.showCongratulationsAndChangeScene();

			} else {

				// Muestra el texto "GAME OVER" y el puntaje
				const gameOverText = this.add.text(950, 350, "GAME OVER", {
					fontSize: "72px",
					fontFamily: "arial",
					fill: "red",
				});
				gameOverText.setDepth(1000)
				gameOverText.setOrigin(0.5);

				// Muestra el puntaje alcanzado
				const scoreDisplay = this.add.text(950, 420, "Tu Puntaje: " + score, {
					fontSize: "36px",
					fontFamily: "arial",
					fill: "red",
				});
				scoreDisplay.setOrigin(0.5);
				scoreDisplay.setDepth(1000)
				this.pauseButton.setVisible(false)
				this.resumeButton.setVisible(false)
				// Reinicia la escena de juego cuando se hace clic en el botón
				restartButton = this.add.image(950, 500, "airerestartButton");
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
	playerDeath(player, buhoGroup, lava) {
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
		var bomb = bombs.create(x, 50, "bomb1");
		bomb.setBounce(1);
		bomb.setCollideWorldBounds(true);
		bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
		bomb.setScale(2);
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
		music = this.sound.add("SkyLevelSound");
		music.play();
		over = this.sound.add("oversound");
		this.deathSoundPlayed = false;
		item = this.sound.add("items");
		
		this.overlay = this.add.rectangle(954, 504, 128, 128);
		this.overlay.scaleX = 15.007477053750433;
		this.overlay.scaleY = 7.8740055126274155;
		this.overlay.isFilled = true;
		this.overlay.fillColor = 0;
		this.overlay.setDepth(1000);
		this.overlay.setAlpha(0.5)
		this.overlay.setVisible(false)

		// sky
		const sky = this.add.image(960, 514, "Sky");
		sky.scaleX = 1.019027873136727;
		sky.scaleY = 1.0830220525706495;

		// nube
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.Body }} */
		const nube = this.add.image(367, 612, "nube1");
		this.physics.add.existing(nube, false);
		nube.body.moves = false;
		nube.body.pushable = false;
		nube.body.immovable = true;
		nube.body.setOffset(10, 30);
		nube.body.setSize(320, 50, false);

		//Jugador 
		player = this.physics.add.sprite(520, 530, player1Character);
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
			player2 = this.physics.add.sprite(480, 530, player2Character); // Ajusta la posición inicial y el sprite
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
		// nube_1
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.Body }} */
		const nube_1 = this.add.image(901, 447, "nube2");
		this.physics.add.existing(nube_1, false);
		nube_1.body.moves = false;
		nube_1.body.pushable = false;
		nube_1.body.immovable = true;
		nube_1.body.setOffset(10, 30);
		nube_1.body.setSize(103, 30, false);

		// nube_2
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.Body }} */
		const nube_2 = this.add.image(1109, 605, "nube3");
		this.physics.add.existing(nube_2, false);
		nube_2.body.moves = false;
		nube_2.body.pushable = false;
		nube_2.body.immovable = true;
		nube_2.body.setOffset(10, 35);
		nube_2.body.setSize(155, 40, false);

		// nube_3
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.Body }} */
		const nube_3 = this.add.image(888, 723, "nube4");
		this.physics.add.existing(nube_3, false);
		nube_3.body.moves = false;
		nube_3.body.pushable = false;
		nube_3.body.immovable = true;
		nube_3.body.setOffset(10, 30);
		nube_3.body.setSize(135, 20, false);

		// nube_4
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.Body }} */
		const nube_4 = this.add.image(1345, 300, "nube5");
		this.physics.add.existing(nube_4, false);
		nube_4.body.moves = false;
		nube_4.body.pushable = false;
		nube_4.body.immovable = true;
		nube_4.body.setOffset(10, 20);
		nube_4.body.setSize(164, 27, false);

		// nube_5
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.Body }} */
		const nube_5 = this.add.image(1570, 611, "nube6");
		this.physics.add.existing(nube_5, false);
		nube_5.body.moves = false;
		nube_5.body.pushable = false;
		nube_5.body.immovable = true;
		nube_5.body.setOffset(10, 21);
		nube_5.body.setSize(228, 39, false);

		// nube_6
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.Body }} */
		const nube_6 = this.add.image(1693, 436, "nube1");
		this.physics.add.existing(nube_6, false);
		nube_6.body.moves = false;
		nube_6.body.pushable = false;
		nube_6.body.immovable = true;
		nube_6.body.setOffset(10, 50);
		nube_6.body.setSize(320, 30, false);

		// nube_7
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.Body }} */
		const nube_7 = this.add.image(713, 295, "nube6");
		this.physics.add.existing(nube_7, false);
		nube_7.body.moves = false;
		nube_7.body.pushable = false;
		nube_7.body.immovable = true;
		nube_7.body.setOffset(10, 30);
		nube_7.body.setSize(228, 31, false);

		// nube_8
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.Body }} */
		const nube_8 = this.add.image(244, 293, "nube4");
		this.physics.add.existing(nube_8, false);
		nube_8.body.moves = false;
		nube_8.body.pushable = false;
		nube_8.body.immovable = true;
		nube_8.body.setOffset(10, 30);
		nube_8.body.setSize(135, 20, false);

		// nube_9
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.Body }} */
		const nube_9 = this.add.image(277, 138, "nube1");
		this.physics.add.existing(nube_9, false);
		nube_9.body.moves = false;
		nube_9.body.pushable = false;
		nube_9.body.immovable = true;
		nube_9.body.setOffset(10, 50);
		nube_9.body.setSize(320, 30, false);

		// nube_10
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.Body }} */
		const nube_10 = this.add.image(496, 458, "nube3");
		this.physics.add.existing(nube_10, false);
		nube_10.body.moves = false;
		nube_10.body.pushable = false;
		nube_10.body.immovable = true;
		nube_10.body.setOffset(10, 35);
		nube_10.body.setSize(155, 40, false);
	

		moneda_1 = this.physics.add.group({
			key: "star",
			repeat: 3,
			
			setXY: { x: 336, y: 530, stepX: 50 },
			bounceY: 0.5
			
		})
		
		moneda_2 = this.physics.add.group({
			key: "star",
			repeat: 1,
			
			setXY: { x: 894, y: 382, stepX: 50 },
			bounceY: 0.5
			
		})
		moneda_3 = this.physics.add.group({
			key: "star",
			repeat: 2,
			
			setXY: { x: 660, y: 218, stepX: 50 },
			bounceY: 0.5
			
		})
		
		moneda_4 = this.physics.add.group({
			key: "star",
			repeat: 0,
			
			setXY: { x: 730, y: 691, stepX: 50 },
			bounceY: 0.5
			
		})
		
		moneda_5 = this.physics.add.group({
			key: "star",
			repeat: 2,
			setXY: { x: 1596, y: 346, stepX: 90 },
			bounceY: 0.5
			
		})
		
		moneda_6 = this.physics.add.group({
			key: "star",
			repeat: 1,
			
			setXY: { x: 1648, y: 381, stepX: 75 },
			bounceY: 0.5
			
		})
		
		moneda_7 = this.physics.add.group({
			key: "star",
			repeat: 1,
			
			setXY: { x: 1518, y: 527, stepX: 50 },
			bounceY: 0.5
			
		})

		gema1 = this.physics.add.group({
			key: "gem1",
			repeat: 0,
			setXY: { x: 240, y: 80, stepX: 70 },
			bounceY: 0.5
		})

		gema2 = this.physics.add.group({
			key: "gem1",
			repeat: 0,
			setXY: { x: 1660, y: 80, stepX: 70 },
			bounceY: 0.5
		})

		const lava = this.add.image(936, 1030, "arena")
		lava.visible = false;
		lava.scaleY = 0.47652280382412204;
		
		// Crear grupo para todos los buho
		buhoGroup = this.physics.add.group();

		// Crear buho y agregarlos al grupo
		const buhoData = [
			{ x: 52, y: 344, startDirection: 1, minX: 50, maxX: 1800 }, // Ejemplo de tiburón con límites personalizados
			
			{ x: 1869, y: 130, startDirection: 1, minX: 50, maxX: 1800 }, // Ejemplo de tiburón con límites personalizados diferentes
			
		];

		buhoData.forEach(data => {
			let buho = buhoGroup.create(data.x, data.y, 'giphy-1');
			buho.body.velocity.x = -100 * data.startDirection;
			buho.body.allowGravity = false;
			buho.body.collideWorldBounds = true;
			buho.body.setOffset(30, 30);
			buho.body.setSize(55, 40, false);
			buho.play('buho'); // Asumiendo que tienes una animación llamada 'buho' configurada
			buho.customData = {
				minX: data.minX,
				maxX: data.maxX,
				direction: data.startDirection
			};
		});


		// Movimiento de las nubes
		const nubesderecha = [nube, nube_1, nube_4, nube_8];
		const nubesizquierda = [nube_2, nube_5, nube_6, nube_7, nube_10]
		// Aplica la animación a todas las nubes
		nubesderecha.forEach((nube) => {
    		this.tweens.add({
        		targets: nube,
        		x: nube.x + 800, // Ajusta la distancia del movimiento según tus necesidades
        		duration: 8000, // Duración en milisegundos
        		yoyo: true, // Hacer que la animación se repita en sentido inverso
        		repeat: -1 // Repetir infinitamente
    		});
		});
		nubesizquierda.forEach((nube_2) => {
    		this.tweens.add({
        		targets: nube_2,
        		x: nube_2.x - 800, // Ajusta la distancia del movimiento según tus necesidades
        		duration: 8000, // Duración en milisegundos
        		yoyo: true, // Hacer que la animación se repita en sentido inverso
        		repeat: -1 // Repetir infinitamente
    		});
		});
		this.tweens.add({
			targets: nube_3,
			x: nube_3.x -300,
			duration: 5000,
			yoyo: true,
			repeat: -1
		})
		this.tweens.add({
			targets: nube_9,
			x: nube_9.x + 1400,
			duration: 8000,
			yoyo: true,
			repeat: -1
		})

		

		// Botones táctiles
		this.leftButton = this.add.image(1350, 865, 'leftButton').setInteractive().setVisible(false);
		this.rightButton = this.add.image(1600, 865, 'rightButton').setInteractive().setVisible(false);
		this.upButton = this.add.image(400, 750, 'upButton').setInteractive().setVisible(false);
		this.downButton = this.add.image(395, 920, 'downButton').setInteractive().setVisible(false);
		
		// Botón para mostrar/ocultar controles
		this.toggleControlsButton = this.add.image(1782, 35, 'toggleControlsaire').setInteractive();
		
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
		let fullscreenButtonaire = this.add.image(1855, 35, 'fullscreenButtonaire').setInteractive();

		// Evento para activar/desactivar pantalla completa
		fullscreenButtonaire.on('pointerdown', () => {
			if (this.scale.isFullscreen) {
				this.scale.stopFullscreen(); // Salir de pantalla completa
			} else {
				this.scale.startFullscreen(); // Activar pantalla completa
			}
		});

		// lists
		const plataformas = [nube, nube_1, nube_2, nube_3, nube_10, nube_7, nube_5, nube_6, nube_4, nube_8, nube_9];
		const buho = [buhoGroup];
		const monedas = [moneda_1, moneda_2, moneda_3, moneda_4, moneda_5, moneda_6, moneda_7];
		const gemas = [gema1, gema2];

		// collider
		this.physics.add.collider(plataformas, player);
		if (player2Character != null) {
			this.physics.add.collider(plataformas, player2);
		}
		this.physics.add.collider(plataformas, monedas);
		this.physics.add.collider(plataformas, gemas);
		this.lava = this.physics.add.staticGroup([lava]);

		this.plataformas = plataformas;
		this.buho = buho;
		
		this.monedas = monedas;
		this.gemas = gemas;
		this.lava = lava

		this.resumeButton = this.add.image(980, 35, "aireplayButton")
		this.resumeButton.setInteractive();
		this.resumeButton.setVisible(false);
		this.resumeButton.on("pointerdown", () => this.resumeGame())

		// Agrega un botón de pausa y lo hace una propiedad del objeto de juego
		this.pauseButton = this.add.image(980, 35, "airestopButton");
		this.pauseButton.setInteractive();
		this.pauseButton.on("pointerdown", () => this.pauseGame());
		this.events.emit("scene-awake");

		// Crea las imágenes para sonido y silencio
		const soundOnImage = this.add.image(1700, 35, "airesoundButton");
		const soundOffImage = this.add.image(1700, 35, "airemuteButton");
	
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
	

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image[]} */
	plataformas;
	/** @type {Phaser.GameObjects.Sprite[]} */
	buho;
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
