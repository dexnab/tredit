/* set dot size (physical pixel size) */
let dpr = window.devicePixelRatio;
let root = document.documentElement;
root.style.setProperty("--var-dot", 1/dpr + "px");
let test0 = document.getElementById("test-0");
// test0.textContent = dpr;