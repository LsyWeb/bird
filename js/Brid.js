const birdDom = document.querySelector('.bird');
const birdStyles = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyles.width);
const birdHeight = parseFloat(birdStyles.height);
const birdLeft = parseFloat(birdStyles.left);
const birdTop = parseFloat(birdStyles.top);
const game = document.querySelector('.game');
const gameHeight = game.clientHeight;

class Bird extends Rectangle{
    constructor(){
        super(birdWidth,birdHeight,birdLeft,birdTop,0,0,birdDom);
        this.g = 1500;
        // 最大纵坐标
        this.maxY = gameHeight - landHeight - this.height;
        this.swingStatus = 1;
        this.timer = null;
        this.rander();
    }
    // 开始煽动翅膀
    startSwing(){
        if(this.timer){
            return
        }
        this.timer = setInterval(() => {
            this.swingStatus++;
            if(this.swingStatus == 4){
                this.swingStatus = 1;
            }
            this.rander();
        }, 200);
    }
    // 停止煽动翅膀
    stopSwing(){
        clearInterval(this.timer);
        this.timer = null;
    }

    rander(){
        super.rander();
        this.dom.className = `bird swing${this.swingStatus}`;
    }

    move(duration) {
        super.move(duration); //调用父类方法
        //根据加速度改变速度
        this.speedY += this.g * duration;
    }

    onMove(){
        if(this.top < 0){
            this.top = 0;
        }
        else if(this.top > this.maxY){
            this.top = this.maxY;
        }
    }
    // 跳
    jump(){
        this.speedY = -400;
    }
}