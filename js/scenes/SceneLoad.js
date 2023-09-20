class SceneLoad extends Phaser.Scene
{
  constructor()
  {
    super('SceneLoad');
  }

  preload()
  {
    this.progressText = this.add.text(0, 0, '0%', {color: '#ffffff', fontSize: game.config.width / 10});
    this.progressText.setOrigin(0.5, 0.5);
    Align.center(this.progressText);
    this.load.on('progress', this.showProgress, this);

    Effect.preload(this, model.effectExplosion);
    Effect.preload(this, model.effectArrowHit);

    this.load.image('buttonPlayAgain', 'images/btnPlayAgain.png');
    this.load.image('buttonStart', 'images/btnStart.png');
    this.load.image('blue', 'images/buttons/blue.png');
    this.load.image('red', 'images/buttons/red.png');
    this.load.image('orange', 'images/buttons/orange.png');
    this.load.image('green', 'images/buttons/green.png');
    this.load.image('titleBack', 'images/titleBack.jpg');
    this.load.image('sample', 'images/sample.png');
    this.load.image('block', 'images/block.png');
    this.load.image('ball', 'images/ball.png');
    this.load.image('coin', 'images/star.png');
    this.load.image('space', 'images/space.png');

    this.load.audio('background', 'audio/background.mp3');
    this.load.audio('catch', 'audio/catch.wav');
    this.load.audio('hit', 'audio/hit.mp3');
    this.load.audio('smallPop', 'audio/smallPop.wav');
  }
  
  create()
  {
    model.audioManager = new AudioManager(this);
    this.scene.start('SceneTitle');
  }
  
  showProgress(progress)
  {
    const percentage = Math.floor(progress * 100);
    this.progressText.setText(percentage + '%');
  }
}