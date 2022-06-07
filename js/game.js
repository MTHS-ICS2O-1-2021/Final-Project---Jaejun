/* global Phaser */

// Created by: xxx
// Created on: June 2022
// This is the Phaser3 configuration file

/** Game scene.*/
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  // set background color
  backgroundColor: 0x5f6e7a,
}

const game = new Phaser.Game(config)
console.log(game)
