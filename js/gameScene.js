/* global Phaser */

// Copyright (c) 2022 Jaejun Lee All rights reserved
//
// Created by: Jaejun Lee
// Created on: May 2022
// This is the Game Scene

class GameScene extends Phaser.Scene {
  
  // create an alien
  createAlien() {
    const alienXLocation = Math.floor(Math.random() * 1920) + 1 //spawns the alien between 1 and 1920 pixel
    let alienXVelocity = Math.floor(Math.random() * 50) + 50 // this will get number between 1 and 50
    alienXVelocity *= Math.round(Math.random()) ? 1 : -1 // this will add minus sign to 50% of cases
    const anAlien = this.physics.add.sprite(alienXLocation, -100, "alien")
    anAlien.body.velocity.y = 450
    anAlien.body.velocity.x = alienXVelocity
    this.alienGroup.add(anAlien)
  }
  
  constructor() {
    super({ key: "gameScene" })

    this.background = null
    this.fireMissile = false
    this.score = 0
    this.scoreText = null
    this.scoreTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center' }
    this.gameOverTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center' }
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#0x5f6e7a")
  }

  preload() {
    console.log("Game Scene")

    // images
    this.load.image('starBackground', 'assets/gameBackground.svg')
    this.load.image('ship', 'assets/spaceShip.png')
    this.load.image('missile', 'assets/missile.png')
    this.load.image('alien', 'assets/alien.png')
    // sound
    this.load.audio('laser', 'assets/laser1.wav')
    this.load.audio('explosion', 'assets/barrelExploding.wav')
    this.load.audio('bomb', 'assets/bomb.wav')
  }
  
  create(data) {
    this.background = this.add.image(0, 0, "starBackground").setScale(1.0)
    this.background.setOrigin(0, 0)

    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)

    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship')

    // create a group for missiles
    this.missileGroup= this.physics.add.group()

    // create a group of the aliens
    this.alienGroup = this.add.group()
    this.createAlien()

    // Collision between missiles and aliens
    this.physics.add.collider(this.missileGroup, this.alienGroup, function(missileCollide, alienCollide) {
      alienCollide.destroy()
      missileCollide.destroy()
      this.sound.play('explosion')
      this.score = this.score + 1
      this.scoreText.setText('Score: ' + this.score.toString())
      this.createAlien()
      this.createAlien()
    }.bind(this))

    // Collisions between ship and aliens
    this.physics.add.collider(this.ship, this.alienGroup, function (shipCollide, alienCollide) {
      this.sound.play('bomb')
      this.physics.pause()
      alienCollide.destroy()
      shipCollide.destroy()
      this.GameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
      this.GameOverText.setInteractive({ useHandCursor: true })
      this.GameOverText.on('pointerdown', () => this.scene.start('GameScene'))
    }.bind(this))

  }

  update(time, delta) {
    //called 60 times a second, hopefully!
    const keyForwardObj = this.input.keyboard.addKey("W")
    const keyLeftObj = this.input.keyboard.addKey("A")
    const keyBackwardObj = this.input.keyboard.addKey("S")
    const keyRightObj = this.input.keyboard.addKey("D")
    const keySpaceObj = this.input.keyboard.addKey("SPACE")

    if (keyForwardObj.isDown === true) {
      this.ship.y -= 15
      if (this.ship.y > 1920) {
        this.ship.y = 1920
      }
    }

    if (keyLeftObj.isDown === true) {
      this.ship.x -= 15
      if (this.ship.x < 0) {
        this.ship.x = 0
      }
    }

    if (keyBackwardObj.isDown === true) {
      this.ship.y += 15
      if (this.ship.y > 1920) {
        this.ship.y = 1920
      }
    }

    if (keyRightObj.isDown === true) {
      this.ship.x += 15
      if (this.ship.x > 1920) {
        this.ship.x = 1920
      }
    }
  }
}

export default GameScene
