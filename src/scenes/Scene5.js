var platforms1Group, platforms2Group, platforms3Group;
var AliensGroup;
var OvniGroup;
var minX;
var maxX;
var moneda_1, moneda_2, moneda_3, moneda_4, moneda_5, moneda_6, moneda_7;
var jugadorVivo;
var music, over, item;
var restartButton;
var score = 0;
var scoreText, pointText;
var cursors;

class Scene5 extends Phaser.Scene {

	constructor() {
		super("Scene5");
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
		this.load.image('bomb5', 'assets/roca.png');
		this.load.image("corona", "assets/corona.png")
		this.load.pack("pack12", "assets/asset-pack-scene5.json")

		this.load.image('leftButton', 'assets/leftButton.png');
		this.load.image('rightButton', 'assets/rightButton.png');
		this.load.image('upButton', 'assets/upButton.png');
		this.load.image('downButton', 'assets/downButton.png');
		this.load.image('toggleControls', 'assets/toggleControls.png'); // botón para mostrar/ocultar controles
		this.load.image('fullscreenButton', 'assets/fullscreenButton.png'); //Pantalla completa
	}

	create() {
		this.editorCreate();
		cursors = this.input.keyboard.createCursorKeys();

		bombs = this.physics.add.group();

		scoreText = this.add.text(15, 13, "S C O R E : 0", {
			fontSize: '32px'
		}
		)
		pointText = this.add.text(15, 40, "F I N A L : VE POR ¡¡¡LA CORONA!!!", {
			fontSize: '32px'
		})

		this.physics.add.overlap(player, moneda_1, this.collectCoin, null, this);
		this.physics.add.overlap(player, moneda_2, this.collectCoin, null, this);
		this.physics.add.overlap(player, moneda_3, this.collectCoin, null, this);
		this.physics.add.overlap(player, moneda_4, this.collectCoin, null, this);
		this.physics.add.overlap(player, moneda_5, this.collectCoin, null, this);
		this.physics.add.overlap(player, moneda_6, this.collectCoin, null, this);
		this.physics.add.overlap(player, moneda_7, this.collectCoin, null, this);
		
		// Añadir colisión con las bombas
		this.physics.add.collider(bombs, platforms);
		this.physics.add.collider(bombs, platforms1Group);
		this.physics.add.collider(bombs, platforms2Group);
		this.physics.add.collider(bombs, platforms3Group);
		this.physics.add.collider(player, bombs, this.hitBomb, null, this);

		// Añadir colisión con el jugador y con el vacio
		this.physics.add.collider(player, this.lava, this.playerDeath, null, this);
		// Añadir colisión con aliens y con el jugador
		this.physics.add.collider(player, this.aliens, this.playerDeath, null, this);
		// Añadir colisión con ovni y con el jugador
		this.physics.add.collider(player, this.ovni, this.playerDeath, null, this);

		if (player2Character != null) {
			this.physics.add.overlap(player2, moneda_1, this.collectCoin, null, this);
			this.physics.add.overlap(player2, moneda_2, this.collectCoin, null, this);
			this.physics.add.overlap(player2, moneda_3, this.collectCoin, null, this);
			this.physics.add.overlap(player2, moneda_4, this.collectCoin, null, this);
			this.physics.add.overlap(player2, moneda_5, this.collectCoin, null, this);
			this.physics.add.overlap(player2, moneda_6, this.collectCoin, null, this);
			this.physics.add.overlap(player2, moneda_7, this.collectCoin, null, this);
			this.physics.add.collider(player2, bombs, this.hitBomb, null, this);
			// Añadir colisión con el jugador y con el vacio
			this.physics.add.collider(player2, this.lava, this.playerDeath, null, this);
			// Añadir colisión con aliens y con el jugador
			this.physics.add.collider(player2, this.aliens, this.playerDeath, null, this);
			// Añadir colisión con ovni y con el jugador
			this.physics.add.collider(player2, this.ovni, this.playerDeath, null, this);		
		}

		this.plataformas.forEach(platform => {
			this.physics.add.collider(bombs, platform);
		});
	}

	update() {

		// Iterar sobre cada shark y manejar su movimiento
		OvniGroup.getChildren().forEach(ovni => {
			const { minX, maxX, direction } = ovni.customData;

			if (ovni.x <= minX) {
				ovni.body.velocity.x = 100; // Cambiar dirección a la derecha
				ovni.customData.direction = 1;
				ovni.setFlipX(true); // Voltear imagen si es necesario
			} else if (ovni.x >= maxX) {
				ovni.body.velocity.x = -100; // Cambiar dirección a la izquierda
				ovni.customData.direction = -1;
				ovni.setFlipX(false); // Voltear imagen si es necesario
			}
		});

		// Iterar sobre cada aliens y manejar su movimiento
		AliensGroup.getChildren().forEach(aliens => {
			const { minX, maxX, direction } = aliens.customData;

			if (aliens.x <= minX) {
				aliens.body.velocity.x = 50; // Cambiar dirección a la derecha
				aliens.customData.direction = 1;
				aliens.setFlipX(false); // Voltear imagen si es necesario
			} else if (aliens.x >= maxX) {
				aliens.body.velocity.x = -50; // Cambiar dirección a la izquierda
				aliens.customData.direction = -1;
				aliens.setFlipX(true); // Voltear imagen si es necesario
			}
		});

		// Iterar sobre cada plataforma y manejar su movimiento
		platforms1Group.getChildren().forEach(platforms1 => {
			const { minX, maxX, direction } = platforms1.customData;

			if (platforms1.x <= minX) {
				platforms1.body.velocity.x = 70; // Cambiar dirección a la derecha
				platforms1.customData.direction = 1;
			} else if (platforms1.x >= maxX) {
				platforms1.body.velocity.x = -70; // Cambiar dirección a la izquierda
				platforms1.customData.direction = -1;
			}
		});

		// Iterar sobre cada plataforma y manejar su movimiento
		platforms2Group.getChildren().forEach(platforms2 => {
			const { minY, maxY, direction } = platforms2.customData;

			if (platforms2.y >= minY) {
				platforms2.body.velocity.y = -50; // Cambiar dirección a la derecha
				platforms2.customData.direction = 1;
			} else if (platforms2.y <= maxY) {
				platforms2.body.velocity.y = 50; // Cambiar dirección a la izquierda
				platforms2.customData.direction = -1;
			}
		});

		// Iterar sobre cada plataforma y manejar su movimiento
		platforms3Group.getChildren().forEach(platforms3 => {
			const { minY, maxY, direction } = platforms3.customData;

			if (platforms3.y >= minY) {
				platforms3.body.velocity.y = -50; // Cambiar dirección a la derecha
				platforms3.customData.direction = 1;
			} else if (platforms3.y <= maxY) {
				platforms3.body.velocity.y = 50; // Cambiar dirección a la izquierda
				platforms3.customData.direction = -1;
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
			player.setVelocityY(-230);
		}
		if (cursors.down.isDown) {
			player.setVelocityY(200);
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
				player2.setVelocityY(-230);
			}
			if (wasd.down.isDown) {
				player2.setVelocityY(200);
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

	showCongratulationsAndChangeScene() {
		over.stop()
		// Mensaje para mostrar en pantalla
		let felicitacionesText = this.add.text(300, 350, 'Felicidades, Terminaste el juego!', { fontSize: '72px', fill: '#ffffff' });
		felicitacionesText.setDepth(1000)
		this.pauseButton.setVisible(false)
		this.resumeButton.setVisible(false)
		// Temporizador para eliminar el texto después de 3 segundos
		this.time.delayedCall(3000, function () {
			felicitacionesText.destroy();
			this.cameras.main.fadeOut(1000); // Ejemplo de desvanecimiento de pantalla
			this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
				this.scene.start('Final');
				score = 0
				this.scene.remove('Scene5')

			});
		}, [], this);
	}

	// Función para cambiar de escena cuando el jugador muere y se cumplen ciertos puntos
	changeSceneIfConditionsMet() {
		// Define la cantidad de puntos requerida para cambiar de escena
		const puntosParaCambio = 100;


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
	playerDeath(player, AliensGroup, OvniGroup, lava) {
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
		if (this.allCollected(moneda_1) && this.allCollected(moneda_3)) {
			this.launchBombs();
		} 
		
		if (this.allCollected(moneda_5) && this.allCollected(moneda_6)) {
			this.launchBombs();
		} 

		if (this.allCollected(moneda_7)){
			this.changeSceneIfConditionsMet();
			this.overlay.setVisible(true);
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
		var x = player.x < 800 ? Phaser.Math.Between(1200, 1800) : Phaser.Math.Between(0, 800);
		var bomb = bombs.create(x, 50, "bomb5");
		bomb.setBounce(1);
		bomb.setCollideWorldBounds(true);
		bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
		bomb.setScale(2);
		bomb.setCircle(8.3);
		bomb.setOffset(3.5,3.5);
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

		music = this.sound.add("spacemusic", { loop: true });
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

		// space_Background__1_
		this.add.image(951, 492, "Space Background (1)");

		// platspace4
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platspace4 = this.add.image(393, 800, "platspace4");
		this.physics.add.existing(platspace4, true);
		platspace4.body.setSize(286, 86, false);

		// platspace1
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platspace1 = this.add.image(700, 739, "platspace1");
		this.physics.add.existing(platspace1, true);
		platspace1.body.setSize(88, 86, false);

		// platspace2
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platspace2 = this.add.image(1037, 843, "platspace2");
		this.physics.add.existing(platspace2, true);
		platspace2.body.setSize(220, 86, false);

		// platspace_part
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platspace_part = this.add.image(1104, 769, "platspace-part");
		this.physics.add.existing(platspace_part, true);
		platspace_part.body.setSize(86, 76, false);

		// platspace
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platspace = this.add.image(1384, 776, "platspace2");
		this.physics.add.existing(platspace, true);
		platspace.body.setSize(220, 86, false);

		// platspace_1
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platspace_1 = this.add.image(1628, 723, "platspace1");
		this.physics.add.existing(platspace_1, true);
		platspace_1.body.setSize(88, 86, false);

		// platspace3
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platspace3 = this.add.image(1628, 357, "platspace3");
		this.physics.add.existing(platspace3, true);
		platspace3.body.setSize(154, 86, false);

		// platspace_4
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platspace_4 = this.add.image(1308, 421, "platspace4");
		this.physics.add.existing(platspace_4, true);
		platspace_4.body.setSize(286, 86, false);

		// platspace_part_2
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platspace_part_2 = this.add.image(1408, 348, "platspace-part");
		this.physics.add.existing(platspace_part_2, true);
		platspace_part_2.body.setSize(86, 76, false);

		// platspace_part_1
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platspace_part_1 = this.add.image(1208, 348, "platspace-part");
		this.physics.add.existing(platspace_part_1, true);
		platspace_part_1.body.setSize(86, 76, false);

		// platspace_5
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platspace_5 = this.add.image(970, 399, "platspace3");
		this.physics.add.existing(platspace_5, true);
		platspace_5.body.setSize(154, 86, false);

		// platspace_6
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platspace_6 = this.add.image(696, 448, "platspace3");
		this.physics.add.existing(platspace_6, true);
		platspace_6.body.setSize(154, 86, false);

		// platspace_7
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platspace_7 = this.add.image(398, 423, "platspace3");
		this.physics.add.existing(platspace_7, true);
		platspace_7.body.setSize(154, 86, false);

		// platspace_9
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platspace_9 = this.add.image(285, 144, "platspace1");
		this.physics.add.existing(platspace_9, true);
		platspace_9.body.setSize(88, 86, false);

		// platspace_3
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platspace_3 = this.add.image(1877, 145, "platspace1");
		this.physics.add.existing(platspace_3, true);
		platspace_3.body.setSize(88, 86, false);

		const lava = this.add.image(959, 1012, "arena")
		lava.visible = false;
		lava.scaleY = 0.47652280382412204;

		// Crear grupo para todos los ovni
		OvniGroup = this.physics.add.group();

		// Crear ovni y agregarlos al grupo
		const ovniData = [
			{ x: 1665, y: 244, startDirection: -1, minX: 300, maxX: 1670 }, // Ejemplo de tiburón con límites personalizados
			{ x: 170, y: 605, startDirection: 1, minX: 160, maxX: 1630 },
		];

		ovniData.forEach(data => {
			let ovni = OvniGroup.create(data.x, data.y, 'ovni');
			ovni.body.velocity.x = -100 * data.startDirection;
			ovni.body.allowGravity = false;
			ovni.body.collideWorldBounds = true;
			ovni.body.setSize(70, 75, false);
			ovni.body.setOffset(5,3, false);
			ovni.customData = {
				minX: data.minX,
				maxX: data.maxX,
				direction: data.startDirection
			};
		});

		AliensGroup = this.physics.add.group();

		// Crear aliens y agregarlos al grupo
		const aliensData = [
			{ x: 504, y: 735, startDirection: -1, minX: 270, maxX: 510 }, // Ejemplo de tiburón con límites personalizados
			{ x: 1471, y: 712, startDirection: -1, minX: 1290, maxX: 1480 },
			{ x: 1025, y: 333, startDirection: -1, minX: 910, maxX: 1030 },
			{ x: 454, y: 359, startDirection: -1, minX: 330, maxX: 460 },
		];

		aliensData.forEach(data => {
			let aliens = AliensGroup.create(data.x, data.y, 'Alien');
			aliens.body.velocity.x = -50 * data.startDirection;
			aliens.body.allowGravity = true;
			aliens.body.collideWorldBounds = true;
			aliens.body.setSize(24, 37, false);
			aliens.play('aliens');
			aliens.customData = {
				minX: data.minX,
				maxX: data.maxX,
				direction: data.startDirection
			};
		});

		platforms1Group = this.physics.add.group();

		// Crear plataformas y agregarlos al grupo
		const platforms1Data = [
			{ x: 441, y: 144, startDirection: -1, minX: 400, maxX: 1750 }, // Ejemplo de tiburón con límites personalizados
		];

		platforms1Data.forEach(data => {
			let platforms1 = platforms1Group.create(data.x, data.y, 'platspace1');
			platforms1.body.velocity.x = -70 * data.startDirection;
			platforms1.body.allowGravity = false;
			platforms1.body.pushable = false;
			platforms1.body.collideWorldBounds = true;
			platforms1.body.setSize(88, 86, false);
			platforms1.customData = {
				minX: data.minX,
				maxX: data.maxX,
				direction: data.startDirection
			};
		});

		platforms2Group = this.physics.add.group();

		// Crear plataformas y agregarlos al grupo
		const platforms2Data = [
			{ x: 1808, y: 692, startDirection: -1, minY: 700, maxY: 350 }, // Ejemplo de tiburón con límites personalizados
		];

		platforms2Data.forEach(data => {
			let platforms2 = platforms2Group.create(data.x, data.y, 'platspace1');
			platforms2.body.velocity.y = 50 * data.startDirection;
			platforms2.body.allowGravity = false;
			platforms2.body.pushable = false;
			platforms2.body.collideWorldBounds = true;
			platforms2.body.setSize(88, 86, false);
			platforms2.customData = {
				minY: data.minY,
				maxY: data.maxY,
				direction: data.startDirection
			};
		});

		platforms3Group = this.physics.add.group();

		// Crear plataformas y agregarlos al grupo
		const platforms3Data = [
			{ x: 165, y: 425, startDirection: -1, minY: 450, maxY: 175 }, // Ejemplo de tiburón con límites personalizados
		];

		platforms3Data.forEach(data => {
			let platforms3 = platforms3Group.create(data.x, data.y, 'platspace1');
			platforms3.body.velocity.y = 50 * data.startDirection;
			platforms3.body.allowGravity = false;
			platforms3.body.pushable = false;
			platforms3.body.collideWorldBounds = true;
			platforms3.body.setSize(88, 86, false);
			platforms3.customData = {
				minY: data.minY,
				maxY: data.maxY,
				direction: data.startDirection
			};
		});

		moneda_1 = this.physics.add.group({
			key: "Diamante",
			repeat: 1,
			setXY: { x: 313, y: 646, stepX: 150 },
			bounceY: 0.5
		})

		moneda_2 = this.physics.add.group({
			key: "Diamante",
			repeat: 0,
			setXY: { x: 993, y: 696, stepX: 90 },
			bounceY: 0.5
		})

		moneda_3 = this.physics.add.group({
			key: "Diamante",
			repeat: 2,
			setXY: { x: 1314, y: 652, stepX: 70 },
			bounceY: 0.5
		})

		moneda_4 = this.physics.add.group({
			key: "Diamante",
			repeat: 0,
			setXY: { x: 1307, y: 252, stepX: 70 },
			bounceY: 0.5
		})

		moneda_5 = this.physics.add.group({
			key: "Diamante",
			repeat: 0,
			setXY: { x: 701, y: 266, stepX: 70 },
			bounceY: 0.5
		})

		moneda_6 = this.physics.add.group({
			key: "Diamante",
			repeat: 0,
			setXY: { x: 278, y: 44, stepX: 70 },
			bounceY: 0.5
		})

		moneda_7 = this.physics.add.group({
			key: "corona",
			repeat: 0,
			setXY: { x: 1872, y: 25, stepX: 70 },
			bounceY: 0.3
		})

		//Jugador 
		player = this.physics.add.sprite(320, 550, player1Character);
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
			player2 = this.physics.add.sprite(280, 550, player2Character); // Ajusta la posición inicial y el sprite
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
		this.leftButton = this.add.image(1350, 865, 'leftButton').setInteractive().setVisible(false);
		this.rightButton = this.add.image(1600, 865, 'rightButton').setInteractive().setVisible(false);
		this.upButton = this.add.image(400, 750, 'upButton').setInteractive().setVisible(false);
		this.downButton = this.add.image(395, 920, 'downButton').setInteractive().setVisible(false);
		
		// Botón para mostrar/ocultar controles
		this.toggleControlsButton = this.add.image(1782, 35, 'toggleControls').setInteractive();
		
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
		let fullscreenButton = this.add.image(1855, 35, 'fullscreenButton').setInteractive();

		// Evento para activar/desactivar pantalla completa
		fullscreenButton.on('pointerdown', () => {
			if (this.scale.isFullscreen) {
				this.scale.stopFullscreen(); // Salir de pantalla completa
			} else {
				this.scale.startFullscreen(); // Activar pantalla completa
			}
		});

		// lists
		const plataformas = [platspace4,platspace_part,platspace_part_1,platspace_part_2, platspace_1,platspace_3,platspace_5,platspace_6,platspace_7, platspace, platspace2, platspace1, platspace3, platspace_9, platspace_4];
		const monedas = [moneda_1, moneda_2, moneda_3, moneda_4, moneda_5, moneda_6, moneda_7];
		const platforms1 = [platforms1Group];
		const platforms2 = [platforms2Group];
		const platforms3 = [platforms3Group];
		const aliens = [AliensGroup];
		const ovni = [OvniGroup];

		// collider
		this.physics.add.collider(plataformas, monedas);
		this.physics.add.collider(player, plataformas);
		this.physics.add.collider(platforms1, plataformas);
		this.physics.add.collider(platforms1, player);
		this.physics.add.collider(platforms2, plataformas);
		this.physics.add.collider(platforms2, player);
		this.physics.add.collider(platforms3, plataformas);
		this.physics.add.collider(platforms3, player);
		this.physics.add.collider(aliens, plataformas);
		this.lava = this.physics.add.staticGroup([lava]);

		if (player2Character != null) {
			this.physics.add.collider(player2, plataformas);
			this.physics.add.collider(platforms1, player2);
			this.physics.add.collider(platforms2, player2);
			this.physics.add.collider(platforms3, player2);
		}

		this.plataformas = plataformas;
		this.monedas = monedas;
		this.platforms1 = platforms1;
		this.platforms2 = platforms2;
		this.platforms3 = platforms3;
		this.lava = lava
		this.aliens = aliens
		this.ovni = ovni

		this.resumeButton = this.add.image(980, 35, "playButton")
		this.resumeButton.setInteractive();
		this.resumeButton.setVisible(false);
		this.resumeButton.on("pointerdown", () => this.resumeGame())

		// Agrega un botón de pausa y lo hace una propiedad del objeto de juego
		this.pauseButton = this.add.image(980, 35, "stopButton");
		this.pauseButton.setInteractive();
		this.pauseButton.on("pointerdown", () => this.pauseGame());
		this.events.emit("scene-awake");

		// Crea las imágenes para sonido y silencio
		const soundOnImage = this.add.image(1700, 35, "musicButton");
		const soundOffImage = this.add.image(1700, 35, "muteButton");

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
	/** @type {Phaser.GameObjects.Image[]} */
	monedas;

}

