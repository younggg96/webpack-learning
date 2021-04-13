/*
    index.js entry
    command
        webpack ./src/js/index.js -o ./build/built.js --mode=development
        webpack ./src/js/index.js -o ./build/built.js --mode=production
*/
import '../css/index.css';
import data from '../data/data.json';
// eslint-disable-next-line import/no-extraneous-dependencies

// 使用@babel.polyfill，对全部js进行兼容性处理；
// import '@babel/polyfill';

// eslint-disable-next-line no-console
console.log(data);

const bbb = (x, y) => x + y;

function add(x, y) {
  return x + y;
}

// eslint-disable-next-line no-console
console.log(add(1, 2));
// eslint-disable-next-line no-console
console.log(bbb(3, 7));
