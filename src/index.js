import Phaser from 'phaser';
import MainScreen from './MainScreen.js'
import vars from './vars.js'

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-game',
    width: vars.width,
    height: vars.height,
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    loader:{
        baseURL: 'src/',
        path: 'assets/'
    },
    scene: [MainScreen]
};

const game = new Phaser.Game(config);
