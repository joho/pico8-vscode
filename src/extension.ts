'use strict';

import * as vscode from 'vscode';

import cp = require('child_process');
import path = require('path');

export function activate(context: vscode.ExtensionContext) {
    let p8Config = vscode.workspace.getConfiguration('pico8');

    let disposable = vscode.commands.registerTextEditorCommand('pico8.run', (textEditor: vscode.TextEditor) => {

        let fileName = textEditor.document.fileName;
        
        cp.execFile(p8Config['executablePath'], ["-windowed", "1", "-run", fileName], { env: process.env }, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
            }
        })
    });

    context.subscriptions.push(disposable);
}