let modal = document.querySelector('.modal');

class Game {
    constructor() {
        this.sky = new Sky();
        this.land = new Land(-100);
        this.bird = new Bird();
        this.pipe = new PipePareProducer(-100);
        this.timer = null;
        this.tick = 16;
        this.gameOver = false;
    }
    start() {
        if (this.timer) {
            return;
        }
        if(this.gameOver){
            window.location.reload();
        }
        this.pipe.startProducer();//生成柱子
        this.bird.startSwing();
        modal.style.display = 'none';
        this.timer = setInterval(() => {
            const duration = this.tick / 1000;
            this.sky.move(duration);
            this.land.move(duration);
            this.bird.move(duration);
            this.pipe.pairs.forEach(pair => {
                pair.move(duration);
            });
            if (this.isGameOver()) {
                this.stop();
                this.gameOver = true;
                modal.style.display = 'block';
            }
        }, this.tick);
    }

    isHit(rec1,rec2){
        // 判断两个矩形是否发生碰撞的规则：符合以下两个条件
        // 横向：两个矩形的中心点的横向距离，是否小于两个矩形宽度和的一半
        // 纵向：两个矩形的中心点的纵向距离，是否小于两个矩形高度和的一半
        var centerX1 = rec1.left + rec1.width / 2;
        var centerY1 = rec1.top + rec1.height / 2;
        var centerX2 = rec2.left + rec2.width / 2;
        var centerY2 = rec2.top + rec2.height / 2;
        var disX = Math.abs(centerX1 - centerX2);
        var disY = Math.abs(centerY1 - centerY2);
        if(disX < (rec1.width + rec2.width) / 2 && disY < (rec1.height + rec2.height) / 2){
            return true;
        }else{
            return false;
        }
    }

    isGameOver() {
        if (this.bird.top == this.bird.maxY) {
            // 碰到了大地
            return true;
        }
        for(let i = 0; i < this.pipe.pairs.length; i++){
            const pair = this.pipe.pairs[i];
            if(this.isHit(this.bird,pair.upPipe) || this.isHit(this.bird,pair.downPipe)){
                return true;
            }
        }
        return false;
    }

    stop() {
        clearInterval(this.timer);
        this.timer = null;
        this.bird.stopSwing();
        this.pipe.stopProducer();
        
    }

    regEvent() {
        window.onkeydown = (e) => {
            if (e.key == 'Enter') {
                if (this.timer) {
                    this.stop();
                } else {
                    this.start();
                }
            }
            if (e.key == ' ') {
                this.bird.jump();
            }
        }
    }
}
var g = new Game();
g.regEvent();