/* global Phaser */

// Copyright (c) 2022 Jaejun Lee All rights reserved
//
// Created by: Jaejun Lee
// Created on: June 2022
// This is the Game Scene

class GameScene extends Phaser.Scene {
  
  // create an alien
  createSpear(numSpear) {

    for( let i=0; i<numSpear; i++ ) {
      const spearXLocation = Math.floor(Math.random() * 1920) + 1
      let spearYVelocity = Math.floor(Math.random() * 400) + 200
      spearYVelocity *= Math.round(Math.random()) ? 1 : -1
      const aSpear = this.physics.add.sprite(spearXLocation, -100, "speartop")
      aSpear.body.velocity.y = spearYVelocity
      aSpear.body.velocity.x = 0
      this.spearGroup.add(aSpear)
    }
  
  }
  createSpear2(numSpear) {
    for( let i=0; i<numSpear; i++ ) {
      const spearYLocation = Math.floor(Math.random() * 1080) + 1
      let spearXVelocity = Math.floor(Math.random() * 400) + 200
      spearXVelocity *= Math.round(Math.random()) ? 1 : -1
      const aSpear = this.physics.add.sprite(-100, spearYLocation, "spearleft")
      aSpear.body.velocity.x = spearXVelocity
      aSpear.body.velocity.y = 0
      this.spearGroup.add(aSpear)
    }
  }

  constructor() {
    super({ key: "gameScene" })

    this.background = null
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
    this.load.image('background', 'assets/background.png')
    this.load.image('knight', 'assets/knight.png')
    this.load.image('speartop', 'assets/speartop.png')
    this.load.image('spearleft', 'assets/spearleft.png')

  }
  
  create(data) {
    this.background = this.add.image(0, 0, "background").setScale(1.0)
    this.background.setOrigin(0, 0)

    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)

    this.knight = this.physics.add.sprite(1920 / 2, 1080 - 100, 'knight')

    // create a group of the aliens
    this.spearGroup = this.add.group()
    this.createSpear2(8)
    this.createSpear(8)
    
    

    // Collisions between knight and spears
    this.physics.add.collider(this.knight, this.spearGroup, function (knightCollide, spearCollide) {
      this.physics.pause()
      spearCollide.destroy()
      knightCollide.destroy()
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

    if (keyForwardObj.isDown === true) {
      this.knight.y -= 10
      if (this.knight.y < 1) {
        this.knight.y = 1
      }
    }

    if (keyLeftObj.isDown === true) {
      this.knight.x -= 10
      if (this.knight.x < 0) {
        this.knight.x = 0
      }
    }

    if (keyBackwardObj.isDown === true) {
      this.knight.y += 10
      if (this.knight.y > 1080) {
        this.knight.y = 1080
      }
    }

    if (keyRightObj.isDown === true) {
      this.knight.x += 10
      if (this.knight.x > 1920) {
        this.knight.x = 1920
      }
    }

    this.spearGroup.children.each(function (item) {
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
