import * as fs from 'fs';
import * as chalk from 'chalk';
import * as glob from 'glob';
import * as xml2json from 'xml2json';

export default class File {
  userInputFileName: string; // yarn new-frames <fileName>

  constructor(userInputFileName: string) {
    this.userInputFileName = userInputFileName;
  }

  /**
   * This method finds the path to the input file
   */
  findUserInputFile(userInputFileName: string) {
    let userInputFile;
    try {
      userInputFile = glob.sync(`${userInputFileName}.svg`);
    } catch (err) {
      console.log(chalk.red('Could not find file'), err);
    }
    return userInputFile;
  }

  /**
   * This method reads the content of the file and returns the content as string
   */
  readUserInputFile(userInputFile: any) {
    let userInputFileContent;
    let userInputFileContentString: string = '';
    try {
      userInputFileContent = userInputFile.map((x: any) =>
        fs.readFileSync(x, { encoding: 'utf-8' })
      );
      userInputFileContentString = userInputFileContent.join('');
    } catch (err) {
      console.log(chalk.red('Could read file'), err);
    }

    return userInputFileContentString;
  }

  /**
   * This method converts the content string from xml to json with xml2json
   */
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

  /**
   * This method runs all methods in the class and returns the xml file as json object
   */
  getFile() {
    let userInputFile = this.findUserInputFile(this.userInputFileName);
    let userInputFileContent = this.readUserInputFile(userInputFile);
    let userInputFileObject = this.xml2jsonUserInputFile(userInputFileContent);
    return userInputFileObject;
  }
}
