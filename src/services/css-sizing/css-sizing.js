export const pxToVw = (pixels, windowWidth) => {
  if (!pixels || !windowWidth) {
    console.log('pixels or window width args were not provided!');
    return '0vw';
  } else {
    return (100 / parseInt(windowWidth)) * parseInt(pixels) + 'vw';
  }
};

export const pxToVh = (pixels, windowHeight, maxSize) => {
  if (!pixels || !windowHeight) {
    console.log('pixels or window height args were not provided!');
    return '0vw';
  } else {
    const sizeVh = (100 * parseInt(pixels)) / parseInt(windowHeight);
    const sizeVhInPx = vhToPx(sizeVh);
    if (maxSize && sizeVhInPx >= maxSize) return maxSize + 'px'; 
    return sizeVh + 'vh';
  }
};

export function vhToPx(value) {
  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    y = w.innerHeight || e.clientHeight || g.clientHeight;
  return (y * value) / 100;
}

export function vwToPx(value, cWidth) {
  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = cWidth || w.innerWidth || e.clientWidth || g.clientWidth;
  return (x * value) / 100;
}