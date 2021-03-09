import File from './File';
//import * as xml2json from 'xml2json';
let fileParser = new File('file');
let file: any = fileParser.getFile();

let fileWidth = Number((file.svg.width / 3.779527559055).toFixed(5));
let fileHeight = Number((file.svg.height / 3.779527559055).toFixed(5));

let objectsOnPage: any[] = [];
let iterationWithObjectsOnPage: number = 0;
function getObjectsOnPage(o: any) {
  var type = typeof o;
  if (type == 'object') {
    for (var key in o) {
      iterationWithObjectsOnPage = iterationWithObjectsOnPage + 1;
      if (key == 'x') {
        //|| key == 'y') {
        if (
          o.x >= 0 &&
          o.width <= fileWidth &&
          o.y >= 0 &&
          o.height <= fileHeight
        ) {
          objectsOnPage.push([o, { iteratiob: iterationWithObjectsOnPage }]);
          iterationWithObjectsOnPage = 0;
        }
        getObjectsOnPage(o[key]);
      } else {
        getObjectsOnPage(o[key]);
      }
    }
  }
}

let iTwo: number = 0;
function traverseObjectIteration(o: any, objectIteration: number) {
  var type = typeof o;
  if (type == 'object') {
    for (var key in o) {
      iTwo = iTwo + 1;
      if (iTwo == objectIteration) {
        /*
        if (Object.prototype.toString.call(o) == '[object Array]') {
          iTwo = 0;
          traverseObjectIteration(file, objectIteration - 1);
        } else {
          console.log(iTwo);
          console.log(o);
          iTwo = 0;
        }*/

        console.log(iTwo);
        console.log(o);
        iTwo = 0;

        //this.objectsOnPageTwo.push([o, { iteration: this.iteration }]);
      } else {
        traverseObjectIteration(o[key], objectIteration);
      }
    }
  }
}

let i = 0;
let iterations: number[] = [];

function getTraverseObjectIteration(o: any, matchingObject: any) {
  var type = typeof o;
  if (type == 'object') {
    for (var key in o) {
      i = i + 1;
      console.log('Key: ', o[key]);
      if (o == matchingObject) {
        /*traverseMatchingObject(
          matchingObjectIteration,
          file
        );*/

        if (i != 1) {
          console.log('Matched', i);
          if (iterations.indexOf(i) == -1) {
            iterations.push(i);
          }
        }
        i = 0;
      } else {
        getTraverseObjectIteration(o[key], matchingObject);
      }
    }
  }
}

function getObject() {
  getObjectsOnPage(file);

  objectsOnPage.map((x) => {
    console.log('Object:', JSON.stringify(x));
    getTraverseObjectIteration(file, x[0]); //x[1].iteration);
  });
}

getObject();
console.log(iterations);
iterations.map((x) => {
  traverseObjectIteration(file, x);
});

//traverseObjectIteration(file, 66); //x);
