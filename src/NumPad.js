import Phaser from 'phaser';

class NumPad extends Phaser.GameObjects.Group{
    constructor(obj){
        super(obj.scene)
        this.string = ''   
    }

    createButtonGrid(rows,columns,list){
        let stepX = 80
        let stepY = 50
        let x = 315
        let y = 225
        let counter = 0
        for(let i=0;i<rows;i++){
            this.createMultiple({
               classType:Phaser.GameObjects.Sprite,
                key:[list[counter],list[counter+1],list[counter+2]],
               setXY:{
                   x:x,
                   y:y,
                   stepX:stepX,
               },
               setScale:{
                   x:0.5,
                   y:0.5
               },
               hitAreaCallback:this.getNumber
            })
            y+=stepY
            counter +=columns+1
        }

    }

    getNumber(child){
        if (child.texture.key != 'back'){

            child.setTint(0x00ff00)
            this.string+=child.texture.key
            

        }
        else{
            child.setTint(0xFF0000)
            this.string = this.string.substr(0,this.string.length-1)
        }
        
    }

    getString(){return this.string}
    resetString(){this.string = ''}


}

export default NumPad