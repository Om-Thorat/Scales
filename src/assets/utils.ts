export function sleep(ms:number) {return new Promise(resolve => setTimeout(resolve, ms));}

export const animateCSS = (element, animation, prefix = 'animate__') =>
// We create a Promise and return it
new Promise((resolve, reject) => {
  const node = element;

  node.classList.add(`${prefix}animated`, animation);

  // When the animation ends, we clean the classes and resolve the Promise
  function handleAnimationEnd(event) {
    event.stopPropagation();
    node.classList.remove(`${prefix}animated`, animation);
    resolve('Animation ended');
  }

  node.addEventListener('animationend', handleAnimationEnd, {once: true});
});

export function pauser(elem) {
  return new Promise(resolve => {
      let playbuttonclick = function () {
          elem.removeEventListener("click", playbuttonclick);
          resolve("resolved");
      }
      elem.addEventListener("click", playbuttonclick)
  })
}