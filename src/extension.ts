// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('emacs-like-indent.indent', async () => {
		await vscode.commands.executeCommand("editor.action.reindentselectedlines");

		const activeEditor = vscode.window.activeTextEditor;
		if (activeEditor == null) {
			return;
		}

        if (!activeEditor.selection.isEmpty) {
			return;
		}

        // if there are no selection, move a cursor if needed
		const position = activeEditor.selection.active;

		const curLineText = activeEditor.document.lineAt(position);
		const nonEmptyIndex = curLineText.firstNonWhitespaceCharacterIndex;
		
		const nextPosition = position.with({character: nonEmptyIndex});
		if (position.isBefore(nextPosition)) {
		    const newSelection = new vscode.Selection(nextPosition, nextPosition);
            activeEditor.selection = newSelection;		
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
