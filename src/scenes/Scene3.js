var GorilasGroup;
var platforms1Group, platforms2Group, platforms3Group;
var minX;
var maxX;
var moneda_1, moneda_2, moneda_3, moneda_4, moneda_5;
var gema1, gema2;
var jugadorVivo;
var music, over, item;
var restartButton;
var score = 0;
var scoreText, pointText;
var cursors;

class Scene3 extends Phaser.Scene {

	constructor() {
		super("Scene3");
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
		this.load.image('bomb3', 'assets/coco.png');
		this.load.pack("pack6", "assets/asset-pack-scene3.json")

		this.load.image('leftButton', 'assets/leftButton.png');
		this.load.image('rightButton', 'assets/rightButton.png');
		this.load.image('upButton', 'assets/upButton.png');
		this.load.image('downButton', 'assets/downButton.png');
		this.load.image('toggleControlsforest', 'assets/toggleControlsforest.png'); // botón para mostrar/ocultar controles
		this.load.image('fullscreenButtonforest', 'assets/fullscreenButtonforest.png'); //Pantalla completa
	}

	create() {

		let Preload3 = this.scene.get('main');
        if (Preload3) {
            // Destruir los assets de main
            Preload3.destroyAssetPack();

			// Detener y eliminar Preload3
            this.scene.stop('Preload3');
            this.scene.remove('Preload3');

            // Verificar en la consola si los assets fueron eliminados
            console.log('Textures:', this.textures.list); // Lista de texturas
            console.log('Sounds:', this.sound.sounds); // Lista de sonidos
            console.log('JSON Cache:', this.cache.json.entries); // Lista de JSONs
        }

		this.editorCreate();
		cursors = this.input.keyboard.createCursorKeys();

		bombs = this.physics.add.group();

		scoreText = this.add.text(15, 13, "S C O R E : 0", {
			fontSize: '32px'
		}
		)
		pointText = this.add.text(15, 40, "N E X T  L E V E L : 400", {
			fontSize: '32px'
		})

		this.physics.add.overlap(player, moneda_1, this.collectCoin, null, this);
		this.physics.add.overlap(player, moneda_2, this.collectCoin, null, this);
		this.physics.add.overlap(player, moneda_3, this.collectCoin, null, this);
		this.physics.add.overlap(player, moneda_4, this.collectCoin, null, this);
		this.physics.add.overlap(player, moneda_5, this.collectCoin, null, this);
		this.physics.add.overlap(player, gema1, this.collectGem, null, this);
		this.physics.add.overlap(player, gema2, this.collectGem, null, this);

		if (player2Character != null) {
			this.physics.add.overlap(player2, moneda_1, this.collectCoin, null, this);
			this.physics.add.overlap(player2, moneda_2, this.collectCoin, null, this);
			this.physics.add.overlap(player2, moneda_3, this.collectCoin, null, this);
			this.physics.add.overlap(player2, moneda_4, this.collectCoin, null, this);
			this.physics.add.overlap(player2, moneda_5, this.collectCoin, null, this);
			this.physics.add.overlap(player2, gema1, this.collectGem, null, this);
			this.physics.add.overlap(player2, gema2, this.collectGem, null, this);		
		}

		// Añadir colisión con las bombas
		this.physics.add.collider(bombs, platforms);
		this.physics.add.collider(bombs, platforms1Group);
		this.physics.add.collider(bombs, platforms2Group);
		this.physics.add.collider(bombs, platforms3Group);
		this.physics.add.collider(player, bombs, this.hitBomb, null, this);

		if (player2Character != null){
			this.physics.add.collider(player2, bombs, this.hitBomb, null, this);
			this.physics.add.collider(player2, this.gorilas, this.playerDeath, null, this);
			this.physics.add.collider(player2, this.lava, this.playerDeath, null, this);
		}

		// Añadir colisión con gorilas y con el vacio
		this.physics.add.collider(player, this.gorilas, this.playerDeath, null, this);
		this.physics.add.collider(player, this.lava, this.playerDeath, null, this);

		this.plataformas.forEach(platform => {
			this.physics.add.collider(bombs, platform);
		});

		// Crear animación de monedas
		this.anims.create({
			key: 'monedas',
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
	
	
		
	}
	
	update() {
		// Iterar sobre cada gorilas y manejar su movimiento
		GorilasGroup.getChildren().forEach(gorila => {
			const { minX, maxX, direction } = gorila.customData;

			if (gorila.x <= minX) {
				gorila.body.velocity.x = 50; // Cambiar dirección a la derecha
				gorila.customData.direction = 1;
				gorila.setFlipX(false); // Voltear imagen si es necesario
			} else if (gorila.x >= maxX) {
				gorila.body.velocity.x = -50; // Cambiar dirección a la izquierda
				gorila.customData.direction = -1;
				gorila.setFlipX(true); // Voltear imagen si es necesario
			}
		});

		// Iterar sobre cada plataforma y manejar su movimiento
		platforms1Group.getChildren().forEach(platforms1 => {
			const { minX, maxX } = platforms1.customData;
	
			if (platforms1.x <= minX) {
				platforms1.body.velocity.x = 60; // Cambiar dirección a la derecha
			} else if (platforms1.x >= maxX) {
				platforms1.body.velocity.x = -60; // Cambiar dirección a la izquierda
			}
	
			// Si el personaje está sobre la plataforma, mover al personaje con la plataforma
			if (this.physics.world.overlap(player, platforms1)) {
				player.x += platforms1.body.velocity.x; // Mueve el personaje con la plataforma
			}
		});
	
		platforms2Group.getChildren().forEach(platforms2 => {
			const { minY, maxY } = platforms2.customData;
	
			if (platforms2.y >= minY) {
				platforms2.body.velocity.y = -50; // Cambiar dirección hacia arriba
			} else if (platforms2.y <= maxY) {
				platforms2.body.velocity.y = 50; // Cambiar dirección hacia abajo
			}
	
			// Si el personaje está sobre la plataforma, mover al personaje con la plataforma
			if (this.physics.world.overlap(player, platforms2)) {
				player.y += platforms2.body.velocity.y; // Mueve el personaje con la plataforma
			}
		});
	
		platforms3Group.getChildren().forEach(platforms3 => {
			const { minX, maxX } = platforms3.customData;
	
			if (platforms3.x <= minX) {
				platforms3.body.velocity.x = 60; // Cambiar dirección a la derecha
			} else if (platforms3.x >= maxX) {
				platforms3.body.velocity.x = -60; // Cambiar dirección a la izquierda
			}
	
			// Si el personaje está sobre la plataforma, mover al personaje con la plataforma
			if (this.physics.world.overlap(player, platforms3)) {
				player.setVelocityX += platforms3.body.velocity.x; // Mueve el personaje con la plataforma
			}
		});

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
		// Mensaje para mostrar en pantalla
		let felicitacionesText = this.add.text(300, 350, 'Felicidades, pasaste al nivel 4!', { fontSize: '72px', fill: '#ffffff' });
		felicitacionesText.setDepth(1000)
		this.pauseButton.setVisible(false)
		this.resumeButton.setVisible(false)
		// Temporizador para eliminar el texto después de 3 segundos
		this.time.delayedCall(3000, function () {
			felicitacionesText.destroy();
			this.cameras.main.fadeOut(1000); // Ejemplo de desvanecimiento de pantalla
			this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
				this.scene.start('Preload4');
				score = 0
				this.scene.remove('Scene3')

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
	playerDeath(player, GorilasGroup, lava) {
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
			this.allCollected(moneda_4) && this.allCollected(moneda_5) && this.allCollected(gema1) && this.allCollected(gema2)) {

			// Reaparecer todas las monedas y gemas
			this.respawnCollectibles(moneda_1);
			this.respawnCollectibles(moneda_2);
			this.respawnCollectibles(moneda_3);
			this.respawnCollectibles(moneda_4);
			this.respawnCollectibles(moneda_5);
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
		var bomb = bombs.create(x, 50, "bomb3");
		bomb.setBounce(1);
		bomb.setCollideWorldBounds(true);
		bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
		bomb.setScale(1.7);
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

		music = this.sound.add("JungleLevelSound");
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

		// jungle
		const jungle = this.add.image(956, 505, "Jungle");
		jungle.scaleX = 1.9015157955835653;
		jungle.scaleY = 1.5812700422016133;

		// part1plat6_jungle
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const part1plat6_jungle = this.add.image(226, 667, "part1plat6_jungle");
		this.physics.add.existing(part1plat6_jungle, true);
		part1plat6_jungle.body.setSize(156, 79, false);

		// deco2jungle
		this.add.image(227, 614, "deco2jungle");



		// part1plat1_jungle
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const part1plat1_jungle = this.add.image(996, 554, "part1plat1_jungle");
		this.physics.add.existing(part1plat1_jungle, true);
		part1plat1_jungle.body.setSize(148, 88, false);

		// part1plat1_jungle1
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const part1plat1_jungle1 = this.add.image(710, 417, "part1plat1_jungle");
		this.physics.add.existing(part1plat1_jungle1, true);
		part1plat1_jungle1.body.setSize(135, 70, false);

		// deco4plat1
		this.add.image(986, 502, "deco4plat1");

		// part1plat6_jungle_1
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const part1plat6_jungle_1 = this.add.image(1353, 677, "part1plat2_jungle");
		part1plat6_jungle_1.scaleX = 0.8;
		part1plat6_jungle_1.scaleY = 0.8;
		this.physics.add.existing(part1plat6_jungle_1, true);
		part1plat6_jungle_1.body.setSize(240, 60, false);

		// deco2jungle_1
		const deco2jungle_1 = this.add.image(1352, 650, "deco2jungle");
		deco2jungle_1.scaleX = 0.7;
		deco2jungle_1.scaleY = 0.7;

		// part1plat3_jungle
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const part1plat3_jungle = this.add.image(1493, 316, "part1plat3_jungle");
		this.physics.add.existing(part1plat3_jungle, true);
		part1plat3_jungle.body.setSize(258, 111, false);

		// deco6plat3
		this.add.image(1541, 230, "deco6plat3");

		// part1plat2_jungle
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.StaticBody }} */
		const part1plat2_jungle = this.add.image(312, 285, "part1plat2_jungle");
		this.physics.add.existing(part1plat2_jungle, true);
		part1plat2_jungle.body.setSize(305, 95, false);

		// decojungle
		this.add.image(314, 213, "decojungle");

		moneda_1 = this.physics.add.group({
			key: "moneda",
			repeat: 1,
			setXY: { x: 175, y: 502, stepX: 100 },
			bounceY: 0.5
		})

		moneda_2 = this.physics.add.group({
			key: "moneda",
			repeat: 1,
			setXY: { x: 945, y: 380, stepX: 100 },
			bounceY: 0.5
		})

		moneda_3 = this.physics.add.group({
			key: "moneda",
			repeat: 2,
			setXY: { x: 1270, y: 536, stepX: 70 },
			bounceY: 0.5
		})

		moneda_4 = this.physics.add.group({
			key: "moneda",
			repeat: 1,
			setXY: { x: 1386, y: 146, stepX: 200 },
			bounceY: 0.5
		})

		moneda_5 = this.physics.add.group({
			key: "moneda",
			repeat: 1,
			setXY: { x: 195, y: 114, stepX: 230 },
			bounceY: 0.5
		})

		gema1 = this.physics.add.group({
			key: "gem1",
			repeat: 0,
			setXY: { x: 326, y: 106, stepX: 70 },
			bounceY: 0.5
		})

		gema2 = this.physics.add.group({
			key: "gem1",
			repeat: 0,
			setXY: { x: 1497, y: 134, stepX: 70 },
			bounceY: 0.5
		})

		GorilasGroup = this.physics.add.group();

		// Crear sharks y agregarlos al grupo
		const gorilasData = [
			{ x: 204, y: 198, startDirection: -1, minX: 200, maxX: 400 }, // Ejemplo de tiburón con límites personalizados
			{ x: 1405, y: 215, startDirection: -1, minX: 1400, maxX: 1600 },
		];

		gorilasData.forEach(data => {
			let gorila = GorilasGroup.create(data.x, data.y, 'gorilas');
			gorila.body.velocity.x = -50 * data.startDirection;
			gorila.body.allowGravity = true;
			gorila.body.collideWorldBounds = true;
			gorila.body.setSize(60, 72, false);
			gorila.body.setOffset(5,0, false);
			gorila.play('Gorila');
			gorila.customData = {
				minX: data.minX,
				maxX: data.maxX,
				direction: data.startDirection
			};
		});

		platforms1Group = this.physics.add.group();

		// Crear sharks y agregarlos al grupo
		const platforms1Data = [
			{ x: 615, y: 665, startDirection: -1, minX: 500, maxX: 800 }, // Ejemplo de tiburón con límites personalizados
		];

		platforms1Data.forEach(data => {
			let platforms1 = platforms1Group.create(data.x, data.y, 'part1plat4_jungle');
			platforms1.body.velocity.x = -60 * data.startDirection;
			platforms1.scaleX = 1.5;
			platforms1.scaleY = 1.5;
			platforms1.body.allowGravity = false;
			platforms1.body.pushable = false;
			platforms1.body.collideWorldBounds = true;
			platforms1.body.setSize(130, 60, false);
			platforms1.customData = {
				minX: data.minX,
				maxX: data.maxX,
				direction: data.startDirection
			};
		});

		platforms2Group = this.physics.add.group();

		// Crear sharks y agregarlos al grupo
		const platforms2Data = [
			{ x: 1771, y: 785, startDirection: -1, minY: 700, maxY: 350 }, // Ejemplo de tiburón con límites personalizados
		];

		platforms2Data.forEach(data => {
			let platforms2 = platforms2Group.create(data.x, data.y, 'part1plat5_jungle');
			platforms2.body.velocity.y = 60 * data.startDirection;
			platforms2.scaleX = 0.7;
			platforms2.scaleY = 0.7;
			platforms2.body.allowGravity = false;
			platforms2.body.pushable = false;
			platforms2.body.collideWorldBounds = true;
			platforms2.body.setSize(320, 100, false);
			platforms2.customData = {
				minY: data.minY,
				maxY: data.maxY,
				direction: data.startDirection
			};
		});

		platforms3Group = this.physics.add.group();

		// Crear sharks y agregarlos al grupo
		const platforms3Data = [
			{ x: 976, y: 196, startDirection: -1, minX: 600, maxX: 1200 }, // Ejemplo de tiburón con límites personalizados
		];

		platforms3Data.forEach(data => {
			let platforms3 = platforms3Group.create(data.x, data.y, 'part1plat6_jungle');
			platforms3.body.velocity.x = -50 * data.startDirection;
			platforms3.body.allowGravity = false;
			platforms3.body.pushable = false;
			platforms3.body.collideWorldBounds = true;
			platforms3.body.setSize(156, 79, false);
			platforms3.customData = {
				minX: data.minX,
				maxX: data.maxX,
				direction: data.startDirection
			};
		});

		//Jugador 
		player = this.physics.add.sprite(250, 550, player1Character);
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
			player2 = this.physics.add.sprite(205, 550, player2Character); // Ajusta la posición inicial y el sprite
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
		this.leftButton = this.add.image(260, 865, 'leftButton').setInteractive().setVisible(false);
		this.rightButton = this.add.image(480, 865, 'rightButton').setInteractive().setVisible(false);
		this.upButton = this.add.image(1700, 750, 'upButton').setInteractive().setVisible(false);
		this.downButton = this.add.image(1695, 920, 'downButton').setInteractive().setVisible(false);
		
		// Botón para mostrar/ocultar controles
		this.toggleControlsButton = this.add.image(1782, 35, 'toggleControlsforest').setInteractive();
		
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
		let fullscreenButtonforest = this.add.image(1855, 35, 'fullscreenButtonforest').setInteractive();

		// Evento para activar/desactivar pantalla completa
		fullscreenButtonforest.on('pointerdown', () => {
			if (this.scale.isFullscreen) {
				this.scale.stopFullscreen(); // Salir de pantalla completa
			} else {
				this.scale.startFullscreen(); // Activar pantalla completa
			}
		});

		const lava = this.add.image(959, 1012, "arena")
		lava.visible = false;
		lava.scaleY = 0.47652280382412204;

		// lists
		const plataformas = [part1plat6_jungle, part1plat1_jungle1, part1plat1_jungle, part1plat6_jungle_1, part1plat3_jungle, part1plat2_jungle];
		const monedas = [moneda_5, moneda_4, moneda_3, moneda_2, moneda_1];
		const gemas = [gema1, gema2];
		const gorilas = [GorilasGroup];
		const platforms1 = [platforms1Group];
		const platforms2 = [platforms2Group];
		const platforms3 = [platforms3Group];

		// collider
		this.physics.add.collider(plataformas, monedas);

		// collider_1
		this.physics.add.collider(plataformas, gemas);

		// collider_2
		this.physics.add.collider(plataformas, gorilas);
		this.physics.add.collider(player, plataformas);
		if (player2Character != null) {
			this.physics.add.collider(player2, plataformas);
		}
		this.physics.add.collider(platforms1, plataformas);
		this.physics.add.collider(platforms1, player);
		if (player2Character != null) {
			this.physics.add.collider(platforms1, player2);
		}
		this.physics.add.collider(platforms2, plataformas);
		this.physics.add.collider(platforms2, player);
		if (player2Character != null) {
			this.physics.add.collider(platforms2, player2);
		}
		this.physics.add.collider(platforms3, plataformas);
		this.physics.add.collider(platforms3, player);
		if (player2Character != null) {
			this.physics.add.collider(platforms3, player2);
		}
		this.lava = this.physics.add.staticGroup([lava]);

		this.plataformas = plataformas;
		this.monedas = monedas;
		this.gemas = gemas;
		this.gorilas = gorilas;
		this.platforms1 = platforms1;
		this.platforms2 = platforms2;
		this.platforms3 = platforms3;
		this.lava = lava
		this.resumeButton = this.add.image(980, 35, "forestplayButton")
		this.resumeButton.setInteractive();
		this.resumeButton.setVisible(false);
		this.resumeButton.on("pointerdown", () => this.resumeGame())

		// Agrega un botón de pausa y lo hace una propiedad del objeto de juego
		this.pauseButton = this.add.image(980, 35, "foreststopButton");
		this.pauseButton.setInteractive();
		this.pauseButton.on("pointerdown", () => this.pauseGame());
		this.events.emit("scene-awake");

		// Crea las imágenes para sonido y silencio
		const soundOnImage = this.add.image(1700, 35, "forestsoundButton");
		const soundOffImage = this.add.image(1700, 35, "forestmuteButton");

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
	/** @type {Phaser.GameObjects.Image[]} */
	gemas;
	/** @type {Phaser.GameObjects.Image[]} */
	gorilas;
	/** @type {Phaser.GameObjects.Image[]} */
	lava;
}

/* END OF COMPILED CODE */

// You can write more code here
