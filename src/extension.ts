'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import cp = require('child_process');
import path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "pico8-vscode" is now active!');
    //vscode.window.showInformationMessage('You opened a pico8 file');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerTextEditorCommand('pico8.run', (textEditor: vscode.TextEditor) => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        //vscode.window.showInformationMessage('Trying to run p8');

        let fileName = textEditor.document.fileName;
        
        cp.execFile("/applications/PICO-8.app/Contents/MacOS/pico8", ["-windowed", "1", "-run", fileName], { env: process.env }, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
            }
        })
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}