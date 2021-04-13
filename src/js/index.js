/* 
    index.js entry
    command 
        webpack ./src/js/index.js -o ./build/built.js --mode=development
        webpack ./src/js/index.js -o ./build/built.js --mode=production
*/
import '../css/index.css';
import data from "../data/data.json";
console.log(data);

function add(x, y) {
  return x + y;
}

console.log(add(1, 2));
