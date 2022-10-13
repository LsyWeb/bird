const timeElement = document.querySelector('.time');
const timeContentElement = document.querySelector('.time .content');
const overTimeElement = document.querySelector('.modal .score');
export class Time {

  timer = null;
  time = 0;
  visible = false;

  onVisibleChange() {
    if (this.timer && this.visible) {
      this.visible = false;
    } else {
      this.visible = true;
    }
    this.render();
  }

  start() {
    this.timer = setInterval(() => {
      this.time++;
      this.render();
    }, 1000)
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
    this.render();
  }

  reset() {
    this.stop();
    time = 0;
    this.render();
  }

  over() {
    overTimeElement.innerHTML = this.time * 100;
  }

  render() {
    timeElement.style.display = this.visible ? 'flex' : 'none';
    if (!this.visible) return;
    const hour = Math.floor(this.time / 3600);
    const minute = Math.floor(this.time / 60);
    const second = this.time % 60;
    // this.overTime = ` ${hour ? hour + '小时' : ''} ${minute ? minute + '分' : ''} ${second + ' 秒'}`

    timeContentElement.innerHTML = `${hour < 10 ? '0' + hour : hour} : ${minute < 10 ? '0' + minute : minute} : ${second < 10 ? '0' + second : second} `;
  }
}

const time = new Time();
time.render();
