var player;
var player2;
var wasd;
var leftButton, rightButton, upButton, downButton, toggleControlsfire;
var mobileModeButton;
var score = 0;
var scoreText;
var moneda1, moneda2, moneda3, moneda4, moneda5, moneda6, moneda7, moneda8;
var gema1, gema2;
var platforms;
var cursors;
var bombs;
var jugadorVivo;
var music, over, item;
var restartButton;
let movingLeft = false;
let movingRight = false;

class Scene1 extends Phaser.Scene {

	constructor() {
		super("Scene1");

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

		this.load.image('bomb1', 'assets/fire.png');

		this.load.pack("pack2", "assets/asset-pack-scene1.json")

		this.load.image('leftButton', 'assets/leftButton.png');
		this.load.image('rightButton', 'assets/rightButton.png');
		this.load.image('upButton', 'assets/upButton.png');
		this.load.image('downButton', 'assets/downButton.png');
		this.load.image('toggleControlsfire', 'assets/toggleControlsfire.png'); // botón para mostrar/ocultar controles
		this.load.image('fullscreenButtonfire', 'assets/fullscreenButtonfire.png'); //Pantalla completa
	}

	create() {



		this.editorCreate();

		bombs = this.physics.add.group();

		scoreText = this.add.text(15, 13, "S C O R E : 0", {
			fontSize: '32px'
		})

		pointText = this.add.text(15, 40, "N E X T  L E V E L : 300", {
			fontSize: '32px'
		})

		this.physics.add.overlap(player, moneda1, this.collectCoin, null, this);
		this.physics.add.overlap(player, moneda2, this.collectCoin, null, this);
		this.physics.add.overlap(player, moneda3, this.collectCoin, null, this);
		this.physics.add.overlap(player, moneda4, this.collectCoin, null, this);
		this.physics.add.overlap(player, moneda5, this.collectCoin, null, this);
		this.physics.add.overlap(player, moneda6, this.collectCoin, null, this);
		this.physics.add.overlap(player, moneda7, this.collectCoin, null, this);
		this.physics.add.overlap(player, moneda8, this.collectCoin, null, this);
		this.physics.add.overlap(player, gema1, this.collectGem, null, this);
		this.physics.add.overlap(player, gema2, this.collectGem, null, this);

		if (player2Character != null) {
			this.physics.add.overlap(player2, moneda1, this.collectCoin, null, this);
			this.physics.add.overlap(player2, moneda2, this.collectCoin, null, this);
			this.physics.add.overlap(player2, moneda3, this.collectCoin, null, this);
			this.physics.add.overlap(player2, moneda4, this.collectCoin, null, this);
			this.physics.add.overlap(player2, moneda5, this.collectCoin, null, this);
			this.physics.add.overlap(player2, moneda6, this.collectCoin, null, this);
			this.physics.add.overlap(player2, moneda7, this.collectCoin, null, this);
			this.physics.add.overlap(player2, moneda8, this.collectCoin, null, this);
			this.physics.add.overlap(player2, gema1, this.collectGem, null, this);
			this.physics.add.overlap(player2, gema2, this.collectGem, null, this);
		}


		// Añadir colisión con sierras y lava
		this.physics.add.collider(player, this.saws, this.playerDeath, null, this);
		this.physics.add.collider(player, this.lava, this.playerDeath, null, this);


		if (player2Character != null) {
			this.physics.add.collider(player2, this.saws, this.playerDeath, null, this);
			this.physics.add.collider(player2, this.lava, this.playerDeath, null, this);
		}

		// Añadir colisión con las bombas
		this.physics.add.collider(bombs, platforms);
		this.physics.add.collider(player, bombs, this.hitBomb, null, this);


		if (player2Character != null) {
			this.physics.add.collider(player2, bombs, this.hitBomb, null, this);
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
		moneda1.children.iterate(function (child) {
			child.play('msilver');
		});
		moneda2.children.iterate(function (child) {
			child.play('msilver');
		});
		moneda3.children.iterate(function (child) {
			child.play('msilver');
		});
		moneda4.children.iterate(function (child) {
			child.play('msilver');
		});
		moneda5.children.iterate(function (child) {
			child.play('msilver');
		});
		moneda6.children.iterate(function (child) {
			child.play('msilver');
		});
		moneda7.children.iterate(function (child) {
			child.play('msilver');
		});
		moneda8.children.iterate(function (child) {
			child.play('msilver');
		});
	}

	update() {
		if (cursors.left.isDown) {
			player.setVelocityX(-170);
			player.anims.play("left", true);
		} else if (cursors.right.isDown) {
			player.setVelocityX(170);
			player.anims.play("right", true);
		} else {
			player.setVelocityX(0);
			player.anims.play("turn");
		}
		if (cursors.up.isDown && player.body.touching.down) {
			player.setVelocityY(-290);
		}
		if (cursors.down.isDown) {
			player.setVelocityY(300);
		}


		if (player2Character != null) {
			// Movimiento para el segundo personaje (con teclas ASDW)
			if (wasd.left.isDown) {
				player2.setVelocityX(-170);
				player2.anims.play("left2", true);
			} else if (wasd.right.isDown) {
				player2.setVelocityX(170);
				player2.anims.play("right2", true);
			} else {
				player2.setVelocityX(0);
				player2.anims.play("turn2");
			}
			if (wasd.up.isDown && player2.body.touching.down) {
				player2.setVelocityY(-290);
			}
			if (wasd.down.isDown) {
				player2.setVelocityY(300);
			}
		}

		if (movingLeft) {
			player.setVelocityX(-170);  // Mueve continuamente a la izquierda
			player.anims.play('left', true);  // Reproduce la animación de caminar a la izquierda
		}
	
		if (movingRight) {
			player.setVelocityX(170);  // Mueve continuamente a la derecha
			player.anims.play('right', true);  // Reproduce la animación de caminar a la derecha
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

	//funcion para coleccionar las monedas
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

	// Función para mostrar el mensaje y cambiar de escena cuando el jugador muere y se cumplen ciertos puntos
	showCongratulationsAndChangeScene() {
		over.stop()
		// Mensaje para mostrar en pantalla
		let felicitacionesText = this.add.text(300, 350, 'Felicidades, pasaste al nivel 2!', { fontSize: '72px', fill: '#ffffff' });
		felicitacionesText.setDepth(1000)
		this.pauseButton.setVisible(false)
		this.resumeButton.setVisible(false)
		// Temporizador para eliminar el texto después de 3 segundos
		this.time.delayedCall(3000, function () {
			felicitacionesText.destroy();
			this.cameras.main.fadeOut(1000); // Ejemplo de desvanecimiento de pantalla
			this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
				this.scene.start('Preload2');
				score = 0
				this.scene.remove('Scene1')
			});
		}, [], this);
	}

	// Función para cambiar de escena cuando el jugador muere y se cumplen ciertos puntos
	changeSceneIfConditionsMet() {
		// Define la cantidad de puntos requerida para cambiar de escena
		const puntosParaCambio = 300;


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
				restartButton = this.add.image(950, 500, "restartButton");
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
	playerDeath(player, hazard, lava, bomb) {
		this.physics.pause();
		player.setTint(0xff0000);
		player.anims.play('turn');
		this.pauseButton.setVisible(false)
		this.resumeButton.setVisible(false)
		// Asume que jugadorVivo se establece en false cuando el jugador muere
		jugadorVivo = false;
		music.stop()
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
		if (this.allCollected(moneda1) && this.allCollected(moneda2) && this.allCollected(moneda3) &&
			this.allCollected(moneda4) && this.allCollected(moneda5) && this.allCollected(moneda6) &&
			this.allCollected(moneda7) && this.allCollected(moneda8) && this.allCollected(gema1) &&
			this.allCollected(gema2)) {

			// Reaparecer todas las monedas y gemas
			this.respawnCollectibles(moneda1);
			this.respawnCollectibles(moneda2);
			this.respawnCollectibles(moneda3);
			this.respawnCollectibles(moneda4);
			this.respawnCollectibles(moneda5);
			this.respawnCollectibles(moneda6);
			this.respawnCollectibles(moneda7);
			this.respawnCollectibles(moneda8);
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
		bomb.setCircle(7);
		bomb.setOffset(4, 3);
	}

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
		music = this.sound.add("music");
		music.play();
		over = this.sound.add("oversound");
		this.deathSoundPlayed = false;
		item = this.sound.add("items");

		// rectangle_1
		const rectangle_1 = this.add.rectangle(958, 504, 128, 128);
		rectangle_1.scaleX = 15.007477053750433;
		rectangle_1.scaleY = 7.8740055126274155;
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 8992310;

		// rectangle_2
		this.overlay = this.add.rectangle(954, 504, 128, 128);
		this.overlay.scaleX = 15.007477053750433;
		this.overlay.scaleY = 7.8740055126274155;
		this.overlay.isFilled = true;
		this.overlay.fillColor = 0;
		this.overlay.setDepth(1000);
		this.overlay.setAlpha(0.5)
		this.overlay.setVisible(false)

		// mountains_b
		this.add.image(955, 502, "mountains_b");

		// saw_2
		/** @type {Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.StaticBody }} */
		const saw_2 = this.add.sprite(787, 281, "saw");
		saw_2.scaleX = 1.5050934341778792;
		saw_2.scaleY = 1.5050934341778792;
		this.physics.add.existing(saw_2, true);
		saw_2.body.setOffset(5, 5);
		saw_2.body.setCircle(20);
		saw_2.play("sierras");

		// saw_3
		/** @type {Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.StaticBody }} */
		const saw_3 = this.add.sprite(890, 281, "saw");
		saw_3.scaleX = 1.5050934341778792;
		saw_3.scaleY = 1.5050934341778792;
		this.physics.add.existing(saw_3, true);
		saw_3.body.setOffset(5, 5);
		saw_3.body.setCircle(20);
		saw_3.play("sierras");

		// saw_1
		/** @type {Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.StaticBody }} */
		const saw_1 = this.add.sprite(611, 373, "saw");
		saw_1.scaleX = 1.5050934341778792;
		saw_1.scaleY = 1.5050934341778792;
		this.physics.add.existing(saw_1, true);
		saw_1.body.setOffset(5, 5);
		saw_1.body.setCircle(20);
		saw_1.play("sierras");

		// saw
		/** @type {Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.StaticBody }} */
		const saw = this.add.sprite(365, 373, "saw");
		saw.scaleX = 1.5050934341778792;
		saw.scaleY = 1.5050934341778792;
		this.physics.add.existing(saw, true);
		saw.body.setOffset(5, 5);
		saw.body.setCircle(20);
		saw.play("sierras");

		// platforminferno1
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platforminferno1 = this.add.image(510, 784, "platforminferno1");
		platforminferno1.scaleY = 1.4981412737385704;
		this.physics.add.existing(platforminferno1, true);
		platforminferno1.body.setSize(356, 51, false);

		// platforminferno_2
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platforminferno_21 = this.add.image(280, 650, "platforminferno");
		this.physics.add.existing(platforminferno_21, true);
		platforminferno_21.body.setSize(47, 20, false);

		// platforminferno_2
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platforminferno_22 = this.add.image(385, 560, "platforminferno");
		this.physics.add.existing(platforminferno_22, true);
		platforminferno_22.body.setSize(47, 20, false);

		// platforminferno2
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platforminferno2 = this.add.image(898, 668, "platforminferno2");
		this.physics.add.existing(platforminferno2, true);
		platforminferno2.body.setSize(171, 41, false);

		// platforminferno
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platforminferno = this.add.image(1140, 745, "platforminferno2");
		this.physics.add.existing(platforminferno, true);
		platforminferno.body.setSize(171, 41, false);

		// platforminferno_1
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platforminferno_1 = this.add.image(1367, 795, "platforminferno");
		this.physics.add.existing(platforminferno_1, true);
		platforminferno_1.body.setSize(47, 20, false);

		// platforminferno_2
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platforminferno_2 = this.add.image(1565, 755, "platforminferno");
		this.physics.add.existing(platforminferno_2, true);
		platforminferno_2.body.setSize(47, 20, false);

		// platforminferno_3
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platforminferno_3 = this.add.image(1661, 640, "platforminferno");
		this.physics.add.existing(platforminferno_3, true);
		platforminferno_3.body.setSize(47, 20, false);

		// platforminferno_4
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platforminferno_4 = this.add.image(1562, 515, "platforminferno");
		this.physics.add.existing(platforminferno_4, true);
		platforminferno_4.body.setSize(47, 20, false);

		// platforminferno_5
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platforminferno_5 = this.add.image(1895, 439, "platforminferno1");
		platforminferno_5.scaleY = 1.650067181883597;
		this.physics.add.existing(platforminferno_5, true);
		platforminferno_5.body.setSize(356, 51, false);

		// platforminferno_6
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platforminferno_6 = this.add.image(1903, 312, "platforminferno");
		this.physics.add.existing(platforminferno_6, true);
		platforminferno_6.body.setSize(47, 20, false);

		// platforminferno_7
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platforminferno_7 = this.add.image(1790, 248, "platforminferno");
		this.physics.add.existing(platforminferno_7, true);
		platforminferno_7.body.setSize(47, 20, false);

		// platforminferno_8
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platforminferno_8 = this.add.image(1569, 247, "platforminferno2");
		this.physics.add.existing(platforminferno_8, true);
		platforminferno_8.body.setSize(171, 41, false);

		// platforminferno_9
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platforminferno_9 = this.add.image(1326, 328, "platforminferno");
		this.physics.add.existing(platforminferno_9, true);
		platforminferno_9.body.setSize(47, 20, false);

		// platforminferno_10
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platforminferno_10 = this.add.image(1110, 315, "platforminferno");
		this.physics.add.existing(platforminferno_10, true);
		platforminferno_10.body.setSize(47, 20, false);

		// granplat
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const granplat = this.add.image(839, 341, "granplat");
		this.physics.add.existing(granplat, true);
		granplat.body.setSize(180, 108, false);

		// miniplat
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const miniplat = this.add.image(840, 269, "miniplat");
		this.physics.add.existing(miniplat, true);
		miniplat.body.setSize(108, 36, false);

		// platpart1
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platpart1 = this.add.image(486, 389, "platpart1");
		this.physics.add.existing(platpart1, true);
		platpart1.body.setSize(252, 32, false);

		// platpart2
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platpart2 = this.add.image(485.5, 425.5, "platpart2");
		this.physics.add.existing(platpart2, true);
		platpart2.body.setSize(189, 41, false);

		// platpart3
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platpart3 = this.add.image(486, 463, "platpart3");
		this.physics.add.existing(platpart3, true);
		platpart3.body.setSize(106, 36, false);

		// platforminferno_11
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const platforminferno_11 = this.add.image(11, 493, "platforminferno1");
		platforminferno_11.scaleY = 1.8353023444133791;
		this.physics.add.existing(platforminferno_11, true);
		platforminferno_11.body.setSize(356, 51, false);

		// fire1
		const fire1 = this.add.sprite(353, 719, "fire1");
		fire1.play("fuegos");

		// fire3
		const fire3 = this.add.sprite(832, 622, "fire3");
		fire3.play("fuegos");

		// fire2
		const fire2 = this.add.sprite(963, 621, "fire2");
		fire2.play("fuegos");

		// fire8
		const fire8 = this.add.sprite(671, 719, "fire8");
		fire8.play("fuegos");

		// fire9
		const fire9 = this.add.sprite(1138, 699, "fire9");
		fire9.play("fuegos");

		// fire6
		const fire6 = this.add.sprite(1367, 759, "fire6");
		fire6.play("fuegos");

		// fire
		const fire = this.add.sprite(1661, 603, "fire6");
		fire.play("fuegos");

		// fire_1
		const fire_1 = this.add.sprite(1738, 370, "fire6");
		fire_1.play("fuegos");

		// fire_2
		const fire_2 = this.add.sprite(1566, 201, "fire6");
		fire_2.play("fuegos");

		// fire_3
		const fire_3 = this.add.sprite(1110, 279, "fire6");
		fire_3.play("fuegos");

		// fire_4
		const fire_4 = this.add.sprite(805, 225, "fire6");
		fire_4.play("fuegos");

		// fire_5
		const fire_5 = this.add.sprite(875, 225, "fire6");
		fire_5.play("fuegos");

		// fire_6
		const fire_6 = this.add.sprite(168, 420, "fire6");
		fire_6.play("fuegos");

		moneda1 = this.physics.add.group({
			key: "monedasilver",
			repeat: 3,
			setXY: { x: 401, y: 638, stepX: 70 },
			bounceY: 0.5,
		})

		moneda2 = this.physics.add.group({
			key: "monedasilver",
			repeat: 1,
			setXY: { x: 860, y: 558, stepX: 70 },
			bounceY: 0.5
		})

		moneda3 = this.physics.add.group({
			key: "monedasilver",
			repeat: 0,
			setXY: { x: 1567, y: 678, stepX: 70 },
			bounceY: 0.5
		})

		moneda4 = this.physics.add.group({
			key: "monedasilver",
			repeat: 0,
			setXY: { x: 1567, y: 400, stepX: 70 },
			bounceY: 0.5
		})

		moneda5 = this.physics.add.group({
			key: "monedasilver",
			repeat: 0,
			setXY: { x: 1567, y: 400, stepX: 70 },
			bounceY: 0.5
		})

		moneda6 = this.physics.add.group({
			key: "monedasilver",
			repeat: 0,
			setXY: { x: 1806, y: 323, stepX: 90 },
			bounceY: 0.5
		})

		moneda7 = this.physics.add.group({
			key: "monedasilver",
			repeat: 1,
			setXY: { x: 1509, y: 163, stepX: 110 },
			bounceY: 0.5
		})

		moneda8 = this.physics.add.group({
			key: "monedasilver",
			repeat: 2,
			setXY: { x: 412, y: 273, stepX: 70 },
			bounceY: 0.5
		})

		//monedasilver_12.play("msilver");

		gema1 = this.physics.add.group({
			key: "gem1",
			repeat: 0,
			setXY: { x: 842, y: 146, stepX: 70 },
			bounceY: 0.5
		})

		gema2 = this.physics.add.group({
			key: "gem1",
			repeat: 0,
			setXY: { x: 78, y: 327, stepX: 70 },
			bounceY: 0.5
		})

		// lava
		const lava = this.add.image(997, 980, "lava");



		//Jugador
		player = this.physics.add.sprite(570, 530, player1Character);
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

		// Botones táctiles
		this.leftButton = this.add.image(1350, 865, 'leftButton').setInteractive().setVisible(false);
		this.rightButton = this.add.image(1600, 865, 'rightButton').setInteractive().setVisible(false);
		this.upButton = this.add.image(400, 750, 'upButton').setInteractive().setVisible(false);
		this.downButton = this.add.image(395, 920, 'downButton').setInteractive().setVisible(false);
		
		// Botón para mostrar/ocultar controles
		this.toggleControlsButton = this.add.image(1782, 35, 'toggleControlsfire').setInteractive();
		
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
		let fullscreenButtonfire = this.add.image(1855, 35, 'fullscreenButtonfire').setInteractive();

		// Evento para activar/desactivar pantalla completa
		fullscreenButtonfire.on('pointerdown', () => {
			if (this.scale.isFullscreen) {
				this.scale.stopFullscreen(); // Salir de pantalla completa
			} else {
				this.scale.startFullscreen(); // Activar pantalla completa
			}
		});

		// lists
		const monedas = [moneda1, moneda2, moneda3, moneda4, moneda5, moneda6, moneda7, moneda8];
		const gemas = [gema1, gema2];
		const plataformas = [platforminferno1, platforminferno_21, platforminferno_22, platforminferno2, platforminferno_11, platpart3, platpart2, platpart1, miniplat, granplat, platforminferno_10, platforminferno_9, platforminferno_8, platforminferno_7, platforminferno_6, platforminferno_5, platforminferno_4, platforminferno_3, platforminferno_2, platforminferno_1, platforminferno];
		const saws = [saw, saw_1, saw_2, saw_3];

		// collider
		this.physics.add.collider(plataformas, monedas);
		this.physics.add.collider(plataformas, gemas);
		this.physics.add.collider(player, plataformas);
		if (player2Character != null) {
			this.physics.add.collider(player2, plataformas);
		}

		this.saws = this.physics.add.staticGroup(saws);
		this.lava = this.physics.add.staticGroup([lava]);

		this.monedas = monedas;
		this.gemas = gemas;
		this.plataformas = plataformas;
		this.saws = saws;
		this.lava = lava;

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

	/** @type {Phaser.GameObjects.Sprite[]} */
	monedas;
	/** @type {Phaser.GameObjects.Image[]} */
	gemas;
	/** @type {Phaser.GameObjects.Image[]} */
	plataformas;
}