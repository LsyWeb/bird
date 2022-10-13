export const debounce = (fn, delay = 1000) => {
  let timer = null;

  return function (...arg) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(this, ...arg);
      timer = null;
    }, delay);
  }
}