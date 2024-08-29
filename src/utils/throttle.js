/** @type {(callback: () => void, timeout: number) => (...args: any[]) => void} */
export function throttle(callback, timeout = 300) {
  let timer = null;
  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        callback.apply(null, args);
        timer = null;
      }, timeout);
    }
  };
}
