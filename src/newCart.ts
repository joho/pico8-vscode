// credit to https://github.com/dkundel/vscode-new-file for the skeleton of this
import { ExtensionContext, commands, window, workspace, QuickPickItem, QuickPickOptions, TextEditor } from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as Q from 'q';

export function newCart(textEditor: TextEditor) {
    const File = new FileController();

    return File.showFileNameDialog()
      .then(File.createFile)
      .then(File.openFileInEditor)
      .catch((err) => {
        if (err.message) {
          window.showErrorMessage(err.message);
        }
      });
}

class FileController {
 
  public determineRoot(): string {
    let root: string;
    
    root = workspace.rootPath;
    
    if (!root) {
      // TODO have a config setting of where the pico8 home is
      return "~/Projects/games/pico8/carts"
    }

    return root;
  }
  
  public showFileNameDialog(): Q.Promise<string> {
    const deferred: Q.Deferred<string> = Q.defer<string>();
    let question = 'What name for the cart?';

    let rootPath = this.determineRoot();

    window.showInputBox({
      prompt: question
    }).then(selectedFilePath => {
      if (selectedFilePath === null || typeof selectedFilePath === 'undefined') {
        deferred.reject(undefined);
        return;
      }
      
      let fileName = selectedFilePath.toUpperCase() + ".p8";
      deferred.resolve(this.getFullPath(rootPath, fileName));
    });

    return deferred.promise;
  }

  public createFile(newFileName): Q.Promise<string> {
    const deferred: Q.Deferred<string> = Q.defer<string>();
    let dirname: string = path.dirname(newFileName);
    let fileExists: boolean = fs.existsSync(newFileName);

    if (!fileExists) {
      fs.appendFile(newFileName, '', (err) => {
        if (err) {
          deferred.reject(err);
          return;
        }

        // TODO insert the template p8 file here

        deferred.resolve(newFileName);
      });
    } else {
      deferred.resolve(newFileName);
    }

    return deferred.promise;
  }

  public openFileInEditor(fileName): Q.Promise<TextEditor> {
    const deferred: Q.Deferred<TextEditor> = Q.defer<TextEditor>();

    workspace.openTextDocument(fileName).then((textDocument) => {
      if (!textDocument) {
        deferred.reject(new Error('Could not open file!'));
        return;
      }

      window.showTextDocument(textDocument).then((editor) => {
        if (!editor) {
          deferred.reject(new Error('Could not show document!'));
          return;
        }

        deferred.resolve(editor);
      });
    });

    return deferred.promise;
  }

  private getFullPath(root: string, filePath: string): string {
    if (filePath.indexOf('/') === 0) {
      return filePath;
    }

    if (filePath.indexOf('~') === 0) {
      return path.join(this.homedir(), filePath.substr(1));
    }

    return path.resolve(root, filePath);
  }
  
  private homedir(): string {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
  }
}