const gameWidth = game.clientWidth;

class Pipe extends Rectangle {
    constructor(height, top, speed, dom) {
        super(52, height, gameWidth, top, speed, 0, dom);
    }
    onMove() {
        if (this.left < -this.width) {
            this.dom.remove();
        }
    }
}
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

class PipePare {
    constructor(speed) {
        this.spaceHeight = 150;//间隙高度
        this.minHeight = 80;//最小高度
        this.maxHeight = landTop - this.minHeight - this.spaceHeight;//最大高度

        const upHeight = getRandom(this.minHeight, this.maxHeight);//上水管的宽度
        const upDom = document.createElement('div');
        upDom.className = 'pipe up';
        this.upPipe = new Pipe(upHeight, 0, speed, upDom);

        const downHeight = landTop - upHeight - this.spaceHeight;//下水管的宽度
        const downTop = landTop - downHeight;//下水管的top值

        const downDom = document.createElement('div');
        downDom.className = 'pipe down';
        this.downPipe = new Pipe(downHeight, downTop, speed, downDom);

        game.appendChild(upDom);
        game.appendChild(downDom);
    }

    get useLess(){
        return this.upPipe.left < -this.upPipe.width;
    }

    move(duration){
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }
    
}

/**
 * 用于不断的产生柱子对
 */
class PipePareProducer{
    constructor(speed){
        this.speed = speed;
        this.pairs = [];
        this.timer = null;
        this.tick = 2000;
    }
    startProducer(){
        if(this.timer){
            return;
        }
        this.timer = setInterval(() => {
            this.pairs.push(new PipePare(this.speed));
            this.pairs.forEach((pair,index) =>{
                if(pair.useLess){
                    this.pairs.splice(index,1)
                }
            })
        }, this.tick);
    }
    stopProducer(){
        clearInterval(this.timer);
        this.timer = null;
    }
}

// var producer = new PipePareProducer(-100);
// producer.startProducer();

// setInterval(() => {
//     producer.pairs.forEach(pair => {
//         pair.move(16/1000)
//     })
// }, 16);