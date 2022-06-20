/* global Phaser */

// Copyright (c) 2022 Jaejun Lee All rights reserved
//
// Created by: Jaejun Lee
// Created on: June 2022
// This is the Game Scene

class GameScene extends Phaser.Scene {
  
  // create an alien
  createAlien(numAlien) {

    for( let i=0; i<numAlien; i++ ) {
      const alienXLocation = Math.floor(Math.random() * 1920) + 1 //spawns the alien between 1 and 1920 pixel
      let alienXVelocity = Math.floor(Math.random() * 50) + 1 // this will get number between 1 and 50
      alienXVelocity *= Math.round(Math.random()) ? 1 : -1 // this will add minus sign to 50% of cases
      const anAlien = this.physics.add.sprite(alienXLocation, -100, "speartop")
      anAlien.body.velocity.y = 400 + alienXVelocity
      anAlien.body.velocity.x = alienXVelocity
      this.alienGroup.add(anAlien)
    }
  
  }
  createAlien2(numAlien) {
    for( let i=0; i<numAlien; i++ ) {
      const alienYLocation = Math.floor(Math.random() * 1080) + 1
      let alienYVelocity = Math.floor(Math.random() * 50) + 1
      alienYVelocity *= Math.round(Math.random()) ? 1 : -1
      const anAlien = this.physics.add.sprite(-100, alienYLocation, "spearright")
      anAlien.body.velocity.x = 400 + alienYVelocity
      anAlien.body.velocity.y = alienYVelocity
      this.alienGroup.add(anAlien)
    }
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
    this.load.image('Background', 'assets/background.png')
    this.load.image('knight', 'assets/knight.png')
    this.load.image('speartop', 'assets/speartop.png')
    this.load.image('spearright', 'assets/spearleft.png')

  }
  
  create(data) {
    this.background = this.add.image(0, 0, "Background").setScale(1.0)
    this.background.setOrigin(0, 0)

    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)

    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'knight')

    // create a group for missiles
    this.missileGroup= this.physics.add.group()

    // create a group of the aliens
    this.alienGroup = this.add.group()
    this.createAlien2(8)
    this.createAlien(8)
    
    

    // Collisions between ship and aliens
    this.physics.add.collider(this.ship, this.alienGroup, function (shipCollide, alienCollide) {
      this.physics.pause()
      alienCollide.destroy()
      shipCollide.destroy()
      this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
      this.gameOverText.setInteractive({ useHandCursor: true })
      this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
    }.bind(this))
  }

  update(time, delta) {
    //called 60 times a second, hopefully!
    const keyForwardObj = this.input.keyboard.addKey("UP")
    const keyLeftObj = this.input.keyboard.addKey("LEFT")
    const keyBackwardObj = this.input.keyboard.addKey("DOWN")
    const keyRightObj = this.input.keyboard.addKey("RIGHT")
    const keySpaceObj = this.input.keyboard.addKey("SPACE")

    if (keyForwardObj.isDown === true) {
      this.ship.y -= 15
      if (this.ship.y < 1) {
        this.ship.y = 1
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
      if (this.ship.y > 1080) {
        this.ship.y = 1080
      }
    }

    if (keyRightObj.isDown === true) {
      this.ship.x += 15
      if (this.ship.x > 1920) {
        this.ship.x = 1920
      }
    }

    this.alienGroup.children.each(function (item) {
      if (item.y > 1080) {
        item.y = 0
        item.x = Math.floor(Math.random() * 1920) + 1
      }

      if (item.x > 1920) {
        item.x = 0
        item.y = Math.floor(Math.random() * 1080) + 1
      }
    })
  }
}

export default GameScene
