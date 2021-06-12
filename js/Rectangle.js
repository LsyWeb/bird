/**
 * 矩形类，可以移动
 * 属性：宽，高，left，top，横向速度，纵向速度，对应的dom对象
 * speedX: 单位（像素/秒）
 * speedY: 单位（像素/秒）
 */

class Rectangle{
    constructor(width,height,left,top,speedX,speedY,dom){
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.speedX = speedX;
        this.speedY = speedY;
        this.dom = dom;
        this.rander();
    }
    // 渲染
    rander(){
        this.dom.style.width = this.width + 'px';
        this.dom.style.height = this.height + 'px';
        this.dom.style.left = this.left + 'px';
        this.dom.style.top = this.top + 'px';
    }
    // 运动
    move(duration){
        const disX = this.speedX * duration;//横向距离
        const disY = this.speedY * duration;//纵向距离
        const newLeft = disX + this.left;
        const newTop = disY + this.top;
        this.left = newLeft;
        this.top = newTop;

        if(this.onMove){
            this.onMove();
        }
        // 重新渲染
        this.rander();
    }
}