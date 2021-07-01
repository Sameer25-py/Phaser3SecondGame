import Phaser from 'phaser';

class TEventController{
    constructor(obj){
        let timedEvent = new Phaser.Time.TimerEvent({
            delay:obj.delay,
            callback:console.log,
            args:['yo'],
            callbackScope:obj.scope
        })
        this.timedEvent = timedEvent
        this.args = obj.args
    }
    callback(){
        console.log('yo')
    }
}

export default TEventController