/* global Phaser */

// Copyright (c) 2022 Jaejun Lee All rights reserved
//
// Created by: Jaejun Lee
// Created on: April 2022
// This is the Title Scene

/**
* This class is the Title Scene.
*/
class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: "titleScene" })

    this.titleSceneBackgroundImage = null
    this.titleSceneText = null
    this.titleSceneTextStyle = {
      font: "200px Times",
      fill: "#fde4b9",
      align: "center",
    }
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload() {
    console.log("Title Scene")
    this.load.image("titleSceneBackground", "./assets/Spearious.svg")
  }

  create(data) {
    this.titleSceneBackgroundImage = this.add
      .sprite(0, 0, "titleSceneBackground")
      .setScale(1)
    this.titleSceneBackgroundImage.x = 1920 / 2
    this.titleSceneBackgroundImage.y = 1080 / 2
  }

  update(time, delta) {
    if (time > 6000) {
      this.scene.switch("menuScene")
    }
  }
}

export default TitleScene