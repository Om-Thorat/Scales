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


// Sometimes you just have to hardcode it because the Math looks like insane ramblings of a guild navigator

export const ansscale = {
  'C':['8', '10', '12', '13', '15', '17', '20', '21'],
  'C#':['9', '11', '13', '14', '10', '18', '21', '22'],
  'D':['10', '12', '14', '15', '17', '18', '22', '23'],
  'D#':['11', '13', '15', '10', '18', '21', '23', '24'],
  'E':['12', '14', '16', '17', '19', '22', '24', '25'],
  'F':['1', '3', '5', '6', '8', '10', '12', '13'],
  'F#':['2', '4', '6', '7', '9', '11', '13', '14'],
  'G':['15', '17', '19', '21', '23', '25', '27', '28'],
  'G#':['16', '18', '21', '22', '24', '26', '28', '29'],
  'A':['5', '7','9', '10', '12', '14', '10', '17'],
  'A#':['6', '8', '10', '11', '13', '15', '17', '18'],
  'B':['7', '9', '11', '12', '14', '16', '18', '19']
}

export const scaledic = {
  'C':['C', 'D', 'E', 'F', 'G', 'A', 'B', 'Ċ'],
  'C#':['C#', 'D#', 'F', 'F#', 'G#', 'A#', 'C', 'Ċ#'],
  'D':['D', 'E', 'F#', 'G', 'A', 'B', 'C#', 'Ḋ'],
  'D#':['D#', 'F', 'G', 'G#', 'A#', 'C', 'D', 'Ḋ#'],
  'E':['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#', 'Ė'],
  'F':['F', 'G', 'A', 'A#', 'C', 'D', 'E', 'Ḟ'],
  'F#':['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'F', 'Ḟ#'],
  'G':['G', 'A', 'B', 'C', 'D', 'E', 'F#', 'Ġ'],
  'G#':['G#', 'A#', 'C', 'C#', 'D#', 'F', 'G', 'Ġ#'],
  'A':['A', 'B', 'C#', 'D', 'E', 'F#', 'G#', 'Ȧ'],
  'A#':['A#', 'C', 'D', 'D#', 'F', 'G', 'A', 'Ȧ#'],
  'B':['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#', 'Ḃ']
}