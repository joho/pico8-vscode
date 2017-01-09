'use strict';

import * as vscode from 'vscode';

import * as cp from 'child_process';
import * as path from 'path';

import { newCart } from './newCart';

export function activate(context: vscode.ExtensionContext) {
    let runCartCommand = vscode.commands.registerTextEditorCommand('pico8.run', runCart);
    let newCartCommand = vscode.commands.registerTextEditorCommand('pico8.newCart', newCart);
    
    context.subscriptions.push(runCartCommand);
    context.subscriptions.push(newCartCommand);
}

function runCart(textEditor: vscode.TextEditor) {
    let p8Config = vscode.workspace.getConfiguration('pico8');

    let fileName = textEditor.document.fileName;
    let args = ["-windowed", "1", "-run", fileName];
    
    let workspace = vscode.workspace;
    if (workspace) {
        args.push("-home", workspace.rootPath);
    }

    cp.execFile(p8Config['executablePath'], args, { env: process.env }, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
        }
    });
}