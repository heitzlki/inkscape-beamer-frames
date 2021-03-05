import * as fs from 'fs';
import * as chalk from 'chalk';
import * as glob from 'glob';
import * as xml2json from 'xml2json';
//import * as lodash from 'lodash';

export class File {
  userInputFileName: string;

  constructor(userInputFileName: string) {
    this.userInputFileName = userInputFileName;
  }

  findUserInputFile(userInputFileName: string) {
    let userInputFile;
    try {
      userInputFile = glob.sync(`${userInputFileName}.svg`);
    } catch (err) {
      console.log(chalk.red('Could not find file'), err);
    }
    return userInputFile;
  }

  readUserInputFile(userInputFile: any) {
    let userInputFileContent;
    let userInputFileContentString: string = '';
    try {
      userInputFileContent = userInputFile.map((x: any) =>
        fs.readFileSync(x, { encoding: 'utf-8' }),
      );
      userInputFileContentString = userInputFileContent.join('');
    } catch (err) {
      console.log(chalk.red('Could read file'), err);
    }

    return userInputFileContentString;
  }

  xml2jsonUserInputFile(userInputFileContent: any) {
    let userInputFileObject;
    try {
      userInputFileObject = xml2json.toJson(userInputFileContent, {
        object: true,
      });
    } catch (err) {
      console.log(chalk.red('Could convert xml to json'), err);
    }
    return userInputFileObject;
  }

  getFile() {
    let userInputFile = this.findUserInputFile(this.userInputFileName);
    let userInputFileContent = this.readUserInputFile(userInputFile);
    let userInputFileObject = this.xml2jsonUserInputFile(userInputFileContent);
    return userInputFileObject;
  }
}
let fileParser = new File('file');

let file: any;

file = fileParser.getFile();
console.log(JSON.stringify(file));
console.log(
  `File width: ${chalk.underline(
    file.svg.width || '',
  )} and file hight: ${chalk.underline(file.svg.height || '')}`,
);
/*
traverse(file).reduce((acc: any, x: any) => {
  console.log(acc, x);
});
*/

let fileWidth = Number((file.svg.width / 3.779527559055).toFixed(5));
let fileHeight = Number((file.svg.height / 3.779527559055).toFixed(5));

let groupes: any[] = [];
function traverse(o: any) {
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
          //groupes.push([o.id, o.x, o.y]);
          groupes.push([o]);
        }
        traverse(o[key]);
      } else {
        traverse(o[key]);
      }
    }
  } /* else {
    console.log(o);
  }*/
}

traverse(file);

function endofstring(searchStr: any, findStr: any) {
  return searchStr.lastIndexOf(findStr) > 0
    ? searchStr.lastIndexOf(findStr) + findStr.length
    : -1;
}

let objectInString: any[] = [];

groupes.map((x) => {
  objectInString.push([
    x[0].id,
    JSON.stringify(file).search(JSON.stringify(x[0])), // Start of object
    endofstring(JSON.stringify(file), JSON.stringify(x[0])), // End of object
  ]);
});

console.log(objectInString);

function parseLines(string: String, start: number, end: number) {
  let parsedString: String = '';

  while (start < end) {
    parsedString = parsedString + string[start];
    start = start + 1;
  }

  return parsedString;
}

objectInString.map((x) => {
  console.log(parseLines(JSON.stringify(file), x[1], x[2]));
});

function getKeyOfObject(string: String, start: number) {
  let parsedString: String = '';

  while (string[start] != ',') {
    parsedString = parsedString + string[start];
    start = start - 1;
  }

  return { parsedString, start };
}

objectInString.map((x) => {
  console.log(getKeyOfObject(JSON.stringify(file), x[1]));
});
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
function getKeyByVal(o: any) {
  var type = typeof o;
  if (type == 'object') {
    for (var key in o) {
      iteration = iteration + 1;
      if (o == groupes[0][0]) {
        if (finIteration == 0) {
          finIteration = iteration;
          getKKKeyByyyVal(finIteration, file);
        }
      }
      getKeyByVal(o[key]);
    }
  }
}
getKeyByVal(file);
