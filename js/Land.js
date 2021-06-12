const landDom = document.querySelector('.land');
const landStyles = getComputedStyle(landDom);
const landWidth = parseFloat(landStyles.width);
const landHeight = parseFloat(landStyles.height);
const landTop = parseFloat(landStyles.top);
const landLeft = parseFloat(landStyles.left);

class Land extends Rectangle{
    constructor(speed){
        super(landWidth,landHeight,0,landTop,speed,0,landDom);
    }
    onMove(){
        if(this.left <= -landWidth /2){
            this.left = 0;
        }
    }
}
// var land = new Land(-100);
// setInterval(() => {
//     land.move(16/1000);
// }, 16);