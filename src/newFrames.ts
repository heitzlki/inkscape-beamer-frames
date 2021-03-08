import File from './File';
//import * as xml2json from 'xml2json';
let fileParser = new File('file');
let file: any = fileParser.getFile();

let fileWidth = Number((file.svg.width / 3.779527559055).toFixed(5));
let fileHeight = Number((file.svg.height / 3.779527559055).toFixed(5));

let objectsOnPage: any[] = [];
let i = 0;
function getObjectsOnPage(o: any) {
  var type = typeof o;
  if (type == 'object') {
    for (var key in o) {
      i = i + 1;
      if (key == 'x') {
        //|| key == 'y') {
        if (
          o.x >= 0 &&
          o.width <= fileWidth &&
          o.y >= 0 &&
          o.height <= fileHeight
        ) {
          objectsOnPage.push([o, { iteration: i }]);
        }
        getObjectsOnPage(o[key]);
      } else {
        getObjectsOnPage(o[key]);
      }
    }
  }
}

let iTwo: number = 0;
function traverseObjectIteration(o: any, objectIteration: number): any {
  var type = typeof o;
  if (type == 'object') {
    for (var key in o) {
      iTwo = iTwo + 1;
      if (iTwo == objectIteration) {
        console.log(o);
        iTwo = 1;
        //this.objectsOnPageTwo.push([o, { iteration: this.iteration }]);
      } else {
        traverseObjectIteration(o[key], objectIteration);
      }
    }
  }
}

function getObject() {
  getObjectsOnPage(file);

  objectsOnPage.map((x) => {
    console.log('Object:', JSON.stringify(x));
    traverseObjectIteration(file, x[1].iteration); //x[1].iteration);
  });
}

getObject();
