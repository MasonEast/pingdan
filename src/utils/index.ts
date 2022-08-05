export function _throttle(fn, wait) {
  let varTime = Date.now();

  return function (...args) {
    const ctx = this;
    const curTime = Date.now();

    // 如果两次时间间隔超过了指定时间，则执行函数。
    if (curTime - varTime >= wait) {
      varTime = Date.now();
      fn.apply(ctx, args);
    }
  };
}

export function _debounce(fn, wait) {
  let timer = null;

  return function (...args) {
    let ctx = this;
    // 如果重复触发就移除之前的定时器，重新计数
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(ctx, args);
    }, wait);
  };
}
