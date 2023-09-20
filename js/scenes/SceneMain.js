class SceneMain extends Phaser.Scene
{
  constructor()
  {
    super('SceneMain');
  }
  
  create()
  {
    this.back = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'space');
    this.back.setOrigin(0, 0);
    this.score = 0;
    this.aGrid = new AlignGrid({scene: this, rows: 11, cols: 11});
    this.platformGroup = this.physics.add.group();
    this.coinGroup = this.physics.add.group();

    this.ball = this.physics.add.sprite(0, 0, 'ball');
    this.ball.setGravity(0, 400);
    this.ball.setBounce(0.7, 0.7);
    Align.scaleToGameW(this.ball, 0.05);
    this.aGrid.placeAtIndex(16, this.ball);

    this.time.addEvent({delay: 2000, callback: this.makePlatform, callbackScope: this, loop: true});
    this.time.addEvent({delay: 3000, callback: this.addCoin, callbackScope: this, loop: true});

    this.physics.add.collider(this.ball, this.platformGroup, this.hitPlat, null, this);
    this.physics.add.collider(this.ball, this.coinGroup, this.takeCoin, null, this);

    this.input.on('pointerdown', this.moveBall, this);
    this.makePlatform();

    this.scoreText = this.add.text(0, 0, 'Score: 0', {color: '#ffffff', fontSize: game.config.width / 15});
    this.scoreText.setOrigin(0.5, 0.5);
    this.aGrid.placeAtIndex(16, this.scoreText);

    //this.aGrid.showNumbers();
  }

  update()
  {
    this.back.tilePositionY++;

    if(this.ball.x > game.config.width || this.ball.x < 0 || this.ball.y > game.config.height || this.ball.y < 0 )
    {
      model.audioManager.playSound('hit');
      model.audioManager.stopBackgroundMusic();
      this.scene.start('SceneOver');
    }

    this.platformGroup.children.iterate(function(child){
      if(child && child.y < -20)
      {
        child.destroy();
      }
    }.bind(this));
  }

  addCoin()
  {
    const xx = Phaser.Math.Between(0, game.config.width);
    const yy = game.config.height + 20;
    const coin = this.physics.add.sprite(xx, yy, 'coin');
    this.coinGroup.add(coin);
    coin.setImmovable();
    coin.setVelocityY(-100);
    Align.scaleToGameW(coin, 0.05);
  }

  takeCoin(ball, coin)
  {
    coin.destroy();
    this.score++;
    this.scoreText.setText('Score: ' + this.score);
    model.audioManager.playSound('catch');
  }

  makePlatform()
  {
    let xx = Phaser.Math.Between(0, game.config.width);
    let yy = game.config.height + 20;
    let ww = Phaser.Math.Between(1, 3);
    if(this.platformGroup.children.entries.length == 0)
    {
      xx = game.config.width / 2;
      ww = 3;
    }

    const platform = this.physics.add.sprite(xx, yy, 'block');
    this.platformGroup.add(platform);
    platform.setImmovable();

    platform.displayHeight = game.config.height * 0.05;
    platform.displayWidth *= ww;

    platform.setVelocityY(-100);
  }

  moveBall(pointer)
  {
    if(pointer.x > this.ball.x)
    {
      this.ball.setVelocityX(100);
    }
    else
    {
      this.ball.setVelocityX(-100);
    }
  }

  hitPlat()
  {
    if(this.ball.body.velocity.y < -70)
    {
      model.audioManager.playSound('smallPop');
    }
  }
}