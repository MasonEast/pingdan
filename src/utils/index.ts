export function _debounce(fn: any, wait: number) {
  let timer: any = null;

  return function (...args: any) {
    //@ts-ignore
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
