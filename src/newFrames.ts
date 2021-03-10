import File from './File';
//import * as xml2json from 'xml2json';
//import * as traverse from 'traverse';
import chalk = require('chalk');
let fileParser = new File('file');
let file: any = fileParser.getFile();

let fileWidth = Number((file.svg.width / 3.779527559055).toFixed(5));
let fileHeight = Number((file.svg.height / 3.779527559055).toFixed(5));

let objectsOnPage: any[] = [];
function getObjectsOnPage(o: any) {
  var type = typeof o;
  if (type == 'object') {
    for (var key in o) {
      if (key == 'x') {
        //|| key == 'y') {
        if (
          o.x >= 0 &&
          o.width <= fileWidth &&
          o.y >= 0 &&
          o.height <= fileHeight
        ) {
          objectsOnPage.push([o]);
        }
        getObjectsOnPage(o[key]);
      } else {
        getObjectsOnPage(o[key]);
      }
    }
  }
}

getObjectsOnPage(file);
/*
let iterationsOne: any[] = [];
objectsOnPage.map((x) => {
  let i: number = 0;
  traverse(file).forEach((o) => {
    i = i + 1;
    if (o == x[0]) {
      iterationsOne.push([i]);
    }
  });
});
console.log(iterationsOne);

iterationsOne.map((x) => {
  let i: number = 0;
  traverse(file).forEach((o) => {
    i = i + 1;
    if (i == x[0]) {
      console.log(chalk.blue('Found Object'), chalk.yellow(i), o);
    }
  });
});
*/
///////////////////////////////////////////////////////////////////////////////////

let iterationsTwo: any[] = [];
let i = 0;
function traverseTwo(o: any, x: any) {
  if (typeof o == 'object') {
    for (var key in o) {
      i = i + 1;
      if (o == x) {
        if (i != 1) {
          iterationsTwo.push([i]);
        }
        i = 0;
      }
      traverseTwo(o[key], x);
    }
  }
}
objectsOnPage.map((x) => {
  traverseTwo(file, x[0]);
  i = 0;
});

console.log(iterationsTwo);

function checkTraverseTwo(o: any, x: number) {
  if (typeof o == 'object') {
    for (var key in o) {
      i = i + 1;
      if (i == x - 1) {
        console.log(chalk.blue('Type of:'), Object.prototype.toString.call(o));
        if (Object.prototype.toString.call(o) == '[object Object]') {
          let objectHasBeenPrinted: any = false;
          iterationsTwo.map((x) => {
            if (o != x[0]) {
              objectHasBeenPrinted = true;
            }
          });
          if (objectHasBeenPrinted == true) {
            console.log(chalk.blue('Found Object'), chalk.yellow(i), o);
          }
          objectHasBeenPrinted = false;
        } else {
          i = 0;
          checkTraverseTwo(file, x - 1);
        }
      }
      checkTraverseTwo(o[key], x);
    }
  }
}

iterationsTwo.map((x) => {
  i = 0;
  console.log(chalk.redBright(x));
  checkTraverseTwo(file, x[0]);
  i = 0;
});
