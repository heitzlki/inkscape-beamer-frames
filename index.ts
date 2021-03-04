import * as fs from 'fs';
import * as chalk from 'chalk';
import * as glob from 'glob';
import * as xml2json from 'xml2json';
//import * as traverse from 'traverse';

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
          groupes.push([o.id, o.x, o.y]);
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
/*
function findObject(o: any) {
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
          groupes.push([o.id, o.x, o.y]);
        }
        traverse(o[key]);
      } else {
        traverse(o[key]);
      }
    }
  } else {
    console.log(o);
  }
}*/

traverse(file);
console.log(groupes);

groupes.map((x) => {
  console.log(x[0]);
});
