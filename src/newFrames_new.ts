import File from './File';
//import * as xml2json from 'xml2json';
let fileParser = new File('file');
let file: any = fileParser.getFile();

let fileWidth = Number((file.svg.width / 3.779527559055).toFixed(5));
let fileHeight = Number((file.svg.height / 3.779527559055).toFixed(5));

class Objects {
  object: any;
  objectsOnPage: any[] = [];

  iterationOne: number = 0;
  iterationTwo: number = 0;
  matchingObjectIteration: number = 0;

  constructor(object: any) {
    this.object = object;
  }

  getObjectsOnPage(o: any) {
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
            this.objectsOnPage.push([o]);
          }
          this.getObjectsOnPage(o[key]);
        } else {
          this.getObjectsOnPage(o[key]);
        }
      }
    }
  }

  traverseMatchingObject(matchingObjectIteration: number, o: any) {
    var type = typeof o;
    if (type == 'object') {
      for (var key in o) {
        this.iterationOne = this.iterationOne + 1;
        if (this.iterationOne == matchingObjectIteration - 1) {
          if (Object.prototype.toString.call(o) == '[object Array]') {
            this.iterationOne = 0;
            this.traverseMatchingObject(
              matchingObjectIteration - 1,
              this.object
            );
          } else {
            //console.log(xml2json.toXml(o));
            //console.log(xml2json.toXml(JSON.stringify(o)));
            console.log(o);
          }
        }
        this.traverseMatchingObject(matchingObjectIteration, o[key]);
      }
    }
  }

  traverseMatchingObjectIteration(o: any, matchingObject: any) {
    var type = typeof o;
    if (type == 'object') {
      for (var key in o) {
        this.iterationTwo = this.iterationTwo + 1;
        if (o == matchingObject) {
          if (this.matchingObjectIteration == 0) {
            //console.log('O:', JSON.stringify(o));
            this.matchingObjectIteration = this.iterationTwo;
            //console.log(this.matchingObjectIteration);
            this.traverseMatchingObject(
              this.matchingObjectIteration,
              this.object
            );
            this.matchingObjectIteration = 0;
            this.iterationTwo = 0;
            this.iterationOne = 0;
          }
        }
        this.traverseMatchingObjectIteration(o[key], matchingObject);
      }
    }
  }

  getObject() {
    this.getObjectsOnPage(this.object);

    /*this.objectsOnPage.map((x) => {
      console.log('Objec::', JSON.stringify(x[0]));
      this.traverseMatchingObjectIteration(this.object, x[0]);
    });*/

    //console.log('Object:', JSON.stringify(this.objectsOnPage[0][0]));
    //this.traverseMatchingObjectIteration(this.object, this.objectsOnPage[0][0]);

    console.log('Object:', JSON.stringify(this.objectsOnPage[1][0]));
    this.traverseMatchingObjectIteration(this.object, this.objectsOnPage[1][0]);

    console.log('Object:', JSON.stringify(this.objectsOnPage[2][0]));
    this.traverseMatchingObjectIteration(this.object, this.objectsOnPage[2][0]);
  }
}

let objects = new Objects(file);
objects.getObject();
