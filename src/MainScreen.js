import Phaser from 'phaser'
import vars from './vars.js'
import NumPad from './NumPad.js'
import SceneContainer from './SceneContainer.js'

let centerX = vars.width/2
let centerY = vars.height/2
let randomString = ''
let tintEvent,timerEvent
let timer = 10
let Entered = false

function generateString(){
    randomString = ''
    let num = Phaser.Math.Between(4,7)
    for(let i=0;i<num;i++){
        randomString += Phaser.Math.Between(0,9)
    }
    return randomString
}
function matchString(user,org){
    if (user == org)
        return true
    
    return false
}

class MainScreen extends Phaser.Scene{

    constructor(){
        super('MainScreen')
    }

    preload(){
        this.load.image('backGround','background.png')
        this.load.image('keyPad','keypad.png')
        this.load.image('frame','frame.png')
        this.load.image('topBar','topbar.png')
        for(let i=0;i<10;i++){
            this.load.image(String(i),String(i) +'.png')
        }
        this.load.image('enter','enter.png')
        this.load.image('back','back.png')
    }

    create(){
        this.mainContainer = new SceneContainer({
            scene:this,
            x:centerX,
            y:centerY
        })

        //creating pad grid
        this.buttonGrid = new NumPad({
            scene:this,
        })
        this.buttonGrid.createButtonGrid(4,2,['1','2','3','4','5','6','7','8','9','back','0','enter'])

        this.mainContainer.updateNumber(generateString())
        
        timerEvent = new Phaser.Time.TimerEvent({delay:1000,callbackScope:this,loop:true,callback:()=>{
            this.mainContainer.timer.setText(--timer)
            if (timer == 0 && !Entered){
                this.mainContainer.keyPad.setTint(0xFF0000)
                timer = 11
                Entered = false
                this.buttonGrid.children.iterate(child=>child.disableInteractive())
                
                this.time.delayedCall(1500,()=>{
                    this.buttonGrid.resetString()
                    this.mainContainer.updateNumber(generateString())
                    this.mainContainer.keyPad.clearTint()
                    this.buttonGrid.children.iterate(child=>child.setInteractive()) 
                    },[])
                  
                } 

            }
        },[],this)
        
        tintEvent = new Phaser.Time.TimerEvent({delay:1500,callbackScope:this,repeat:0,callback:()=>{
            this.buttonGrid.children.iterate(child=>child.disableInteractive())
            this.buttonGrid.resetString()
            this.mainContainer.updateNumber(generateString())
            this.mainContainer.keyPad.clearTint()
            this.buttonGrid.children.iterate(child=>child.setInteractive())

        },args:[]})

        this.time.addEvent(timerEvent)

        this.buttonGrid.children.iterate(child=>{
            child.setInteractive()
            child.on('pointerdown',()=>{
                if (child.texture.key === 'enter'){
                    Entered = true
                    
                    if(matchString(this.buttonGrid.getString(),randomString))
                        this.mainContainer.keyPad.setTint(0x00ff00)
                    
                    else this.mainContainer.keyPad.setTint(0xFF0000)

                    timerEvent.remove(false)

                    timer = 11
                    Entered = false
                    this.buttonGrid.children.iterate(child=>child.disableInteractive())
                    this.time.delayedCall(1500,()=>{
                        this.buttonGrid.resetString()
                        this.mainContainer.updateNumber(generateString())
                        this.mainContainer.keyPad.clearTint()
                        this.buttonGrid.children.iterate(child=>child.setInteractive())
                    },[],this)                  
                    this.time.addEvent(timerEvent)
                }
                else{
                this.buttonGrid.getNumber(child)
                }

            })
            child.on('pointerup',()=>child.clearTint())
        })

        
    }
}

export default MainScreen