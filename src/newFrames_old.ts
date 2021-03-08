import File from './File';

let fileParser = new File('file');
let file: any = fileParser.getFile();

let fileWidth = Number((file.svg.width / 3.779527559055).toFixed(5));
let fileHeight = Number((file.svg.height / 3.779527559055).toFixed(5));

class Objects {
  object: any;

  constructor(object: any) {
    this.object = object;
  }

  matchedObjects: any[] = [];
  objectsOnPage(o: any) {
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
            this.matchedObjects.push([o]);
          }
          this.objectsOnPage(o[key]);
        } else {
          this.objectsOnPage(o[key]);
        }
      }
    }
  }

  getObjects() {
    this.objectsOnPage(this.object);
    return this.matchedObjects;
  }
}

let objects = new Objects(file);
let groupes: any = objects.getObjects();

let i: number = 0;
function getKKKeyByyyVal(iter: number, o: any) {
  var type = typeof o;
  if (type == 'object') {
    for (var key in o) {
      i = i + 1;
      if (i == iter - 1) {
        if (Object.prototype.toString.call(o) == '[object Array]') {
          i = 0;
          getKKKeyByyyVal(iter - 1, file);
        } else {
          console.log(o);
        }
      }
      getKKKeyByyyVal(iter, o[key]);
    }
  }
}

let iteration = 0;
let finIteration = 0;
function getMatchingObjectIteration(o: any, matchingObject: any) {
  var type = typeof o;
  if (type == 'object') {
    for (var key in o) {
      iteration = iteration + 1;
      if (o == matchingObject) {
        if (finIteration == 0) {
          finIteration = iteration;
          getKKKeyByyyVal(finIteration, file);
          iteration = 0;
          finIteration = 0;
          i = 0;
          console.log(iteration, finIteration, i);
        }
      }
      getMatchingObjectIteration(o[key], matchingObject);
    }
  }
}

groupes.map((x: any) => {
  console.log('Object:', JSON.stringify(x[0]));
  getMatchingObjectIteration(file, groupes[2][0]);
});
