/* 
    index.js entry
    1. command 
        webpack ./src/index.js -o ./build/built.js --mode=development
        webpack ./src/index.js -o ./build/built.js --mode=production
*/
import './index.css';
import data from "./data.json";
console.log(data);

function add(x, y) {
  return x + y;
}

console.log(add(1, 2));
