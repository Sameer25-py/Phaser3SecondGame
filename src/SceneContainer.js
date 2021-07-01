import Phaser from 'phaser';

class SceneContainer extends Phaser.GameObjects.Container{

    constructor(obj){
        let bFrame = new Phaser.GameObjects.Image(obj.scene,0,0,'frame')
        let tFrame = new Phaser.GameObjects.Image(obj.scene,0,-274,'topBar')
        let timer = new Phaser.GameObjects.Text(obj.scene,-40,-290,'10',{fontSize: '30px',fill:'#000'})
        let label = new Phaser.GameObjects.Text(obj.scene,-400,-290,'Lab Access',{fontSize: '30px',fill:'#000'})
        let backGround = new Phaser.GameObjects.Image(obj.scene,0,150,'backGround')
        let keyPad = new Phaser.GameObjects.Image(obj.scene,0,50,'keyPad').setScale(0.65)
        let number = new Phaser.GameObjects.Text(obj.scene,-30,-150, '123', {fontSize:'20px',fill:'#000'})

        super(obj.scene,obj.x,obj.y,[bFrame,tFrame,timer,label,backGround,keyPad,number])

        obj.scene.add.existing(this)
        
        this.number = number
        this.timer  = timer
        this.keyPad = keyPad
    }

    updateNumber(string){
        this.number.setText(string)
    }

}

export default SceneContainer