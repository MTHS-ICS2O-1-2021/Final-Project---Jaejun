/* global Phaser */

// Copyright (c) 2022 Jaejun Lee All rights reserved
//
// Created by: Jaejun Lee
// Created on: June 2022
// This is the Game Scene

class GameScene extends Phaser.Scene {
  // create an alien
  createSpearTopToBottom(numSpear) {
    for (let i = 0; i < numSpear; i++) {
      const spearXLocation = Math.floor(Math.random() * 1920) + 1
      let spearYVelocity = Math.floor(Math.random() * 200) + 400
      spearYVelocity *= Math.round(Math.random()) ? 1 : -1
      const aSpear = this.physics.add.sprite(spearXLocation, 0, "spearTop")
      aSpear.body.velocity.y = spearYVelocity
      aSpear.body.velocity.x = 0
      this.spearGroup.add(aSpear)
    }
  }
  createSpearLeftToRight(numSpear) {
    for (let i = 0; i < numSpear; i++) {
      const spearYLocation = Math.floor(Math.random() * 1080) + 1
      let spearXVelocity = Math.floor(Math.random() * 200) + 400
      spearXVelocity *= Math.round(Math.random()) ? 1 : -1
      const aSpear = this.physics.add.sprite(0, spearYLocation, "spearLeft")
      aSpear.body.velocity.x = spearXVelocity
      aSpear.body.velocity.y = 0
      this.spearGroup.add(aSpear)
    }
  }

  createSpearRightToLeft(numSpear) {
    for (let i = 0; i < numSpear; i++) {
      const spearYLocation = Math.floor(Math.random() * 1080) + 1
      let spearXVelocity = Math.floor(Math.random() * 200) + 400
      spearXVelocity *= Math.round(Math.random()) ? 1 : -1
      const aSpear = this.physics.add.sprite(1920, spearYLocation, "spearRight")
      aSpear.body.velocity.x = -spearXVelocity
      aSpear.body.velocity.y = 0
      this.spearGroup2.add(aSpear)
    }
  }
  createSpearBottomToTop(numSpear) {
    for (let i = 0; i < numSpear; i++) {
      const spearXLocation = Math.floor(Math.random() * 1920) + 1
      let spearYVelocity = Math.floor(Math.random() * 200) + 400
      spearYVelocity *= Math.round(Math.random()) ? 1 : -1
      const aSpear = this.physics.add.sprite(
        spearXLocation,
        1080,
        "spearBottom"
      )
      aSpear.body.velocity.y = -spearYVelocity
      aSpear.body.velocity.x = 0
      this.spearGroup2.add(aSpear)
    }
  }
  constructor() {
    super({ key: "gameScene" })

    this.background = null
    this.score = 0
    this.scoreText = null
    this.scoreTextStyle = {
      font: "65px Arial",
      fill: "#ffffff",
      align: "center",
    }
    this.gameOverTextStyle = {
      font: "65px Arial",
      fill: "#ff0000",
      align: "center",
    }
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#0x5f6e7a")
  }

  preload() {
    console.log("Game Scene")

    // images
    this.load.image("background", "assets/background.png")
    this.load.image("knight", "assets/knight.png")
    this.load.image("spearTop", "assets/spearTop.png")
    this.load.image("spearLeft", "assets/spearLeft.png")
    this.load.image("spearRight", "assets/spearRight.png")
    this.load.image("spearBottom", "assets/spearBottom.png")
  }
  create(data) {
    this.background = this.add.image(0, 0, "background").setScale(1.0)
    this.background.setOrigin(0, 0)

    this.scoreText = this.add.text(
      10,
      10,
      "Score: " + this.score.toString(),
      this.scoreTextStyle
    )

    this.knight = this.physics.add.sprite(1920 / 2, 1080 / 2, "knight")

    // create a group of the aliens
    this.spearGroup = this.add.group()
    this.spearGroup2 = this.add.group()
    this.createSpearTopToBottom(8)
    this.createSpearLeftToRight(8)
    this.createSpearRightToLeft(8)
    this.createSpearBottomToTop(8)

    this.gameOver = false
    this.score = 0 // reset the score

    // Collisions between knight and spears
    this.physics.add.collider(
      this.knight,
      this.spearGroup,
      function (knightCollide, spearCollide) {
        this.physics.pause()
        spearCollide.destroy()
        knightCollide.destroy()
        this.gameOverText = this.add
          .text(
            1920 / 2,
            1080 / 2,
            "Game Over!\nClick to play again.",
            this.gameOverTextStyle
          )
          .setOrigin(0.5)
        this.gameOverText.setInteractive({ useHandCursor: true })
        this.gameOverText.on("pointerdown", () => this.scene.start("gameScene"))
        this.gameOver = true
      }.bind(this)
    )
    this.physics.add.collider(
      this.knight,
      this.spearGroup2,
      function (knightCollide, spearCollide) {
        this.physics.pause()
        spearCollide.destroy()
        knightCollide.destroy()
        this.gameOverText = this.add
          .text(
            1920 / 2,
            1080 / 2,
            "Game Over!\nClick to play again.",
            this.gameOverTextStyle
          )
          .setOrigin(0.5)
        this.gameOverText.setInteractive({ useHandCursor: true })
        this.gameOverText.on("pointerdown", () => this.scene.start("gameScene"))
        this.gameOver = true
      }.bind(this)
    )
  }

  update(time, delta) {
    const keyForwardObj = this.input.keyboard.addKey("UP")
    const keyLeftObj = this.input.keyboard.addKey("LEFT")
    const keyBackwardObj = this.input.keyboard.addKey("DOWN")
    const keyRightObj = this.input.keyboard.addKey("RIGHT")

    if (!this.gameOver) {
      this.score = this.score + 1
      this.scoreText.setText("Score: " + this.score.toString())
    }

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
    this.spearGroup2.children.each(function (item) {
      if (item.y < 0) {
        item.y = 1080
        item.x = Math.floor(Math.random() * 1920) + 1
      }

      if (item.x < 0) {
        item.x = 1920
        item.y = Math.floor(Math.random() * 1080) + 1
      }
    })
  }
}

export default GameScene
