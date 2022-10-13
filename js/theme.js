import { debounce } from "./utils.js";

const themeButtonElement = document.querySelector('.theme .button');
const themeSunElement = document.querySelector('.theme-sun');
const themeMoonElement = document.querySelector('.theme-moon');

const themeIconAutoHidden = debounce(() => {
  themeSunElement.setAttribute('class', 'theme-sun');
  themeMoonElement.setAttribute('class', 'theme-moon');
},3000);

class Theme {
  constructor(
    themeButtonElement,
  ) {
    this.themeButtonElement = themeButtonElement;
    const storageTheme = localStorage.getItem('theme');
    if (storageTheme) {
      this.theme = storageTheme;
    } else {
      this.theme = 'light';
    }
  }

  theme
  timer = null;

  /**
   * 监听按钮点击事件
   * */
  onListening() {
    themeButtonElement.onclick = () => {
      this.onThemeChange();
    };
  }

  /**
   * 主题变化
   */
  onThemeChange() {
    if (this.theme === 'light') {
      this.theme = 'dark';
    } else {
      this.theme = 'light';
    }
    this.render();
  }

  /**
   * 页面重新渲染
   */
  render() {
    const html = document.querySelector("html");
    html.setAttribute('class', this.theme);

    if (this.theme === 'light') {
      themeSunElement.setAttribute('class', 'theme-sun active');
      themeMoonElement.setAttribute('class', 'theme-moon');
    } else {
      themeMoonElement.setAttribute('class', 'theme-moon active');
      themeSunElement.setAttribute('class', 'theme-sun');
    }

    themeIconAutoHidden();

    localStorage.setItem('theme', this.theme);
  }

}

const theme = new Theme(themeButtonElement);
theme.onListening();
theme.render();
