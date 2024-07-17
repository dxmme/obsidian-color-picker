const { Plugin, SuggestModal } = require('obsidian');

class ColorPickerPlugin extends Plugin {
    onload() {
        this.addRibbonIcon('palette', 'Color Picker', () => {
            new ColorPickerModal(this.app).open();
        });

        this.addCommand({
            id: 'open-color-picker',
            name: 'Open Color Picker',
            callback: () => {
                new ColorPickerModal(this.app).open();
            }
        });
    }

    onunload() {
        // Cleanup if necessary
    }
}

class ColorPickerModal extends SuggestModal {
    constructor(app) {
        super(app);
        this.colors = [
            {name: "Red", value: "red"},
            {name: "Blue", value: "blue"},
            {name: "Green", value: "green"},
            {name: "Orange", value: "orange"},
            {name: "Purple", value: "purple"},
            {name: "Pink", value: "pink"},
            {name: "Yellow", value: "yellow"},
            {name: "Cyan", value: "cyan"},
            {name: "Magenta", value: "magenta"},
            {name: "Brown", value: "brown"},
            {name: "Gray", value: "gray"},
            {name: "Black", value: "black"},
            {name: "White", value: "white"},
            {name: "Lime", value: "lime"},
            {name: "Maroon", value: "maroon"},
            {name: "Navy", value: "navy"},
            {name: "Olive", value: "olive"},
            {name: "Teal", value: "teal"},
            {name: "Aqua", value: "aqua"},
            {name: "Gold", value: "gold"},
            {name: "Silver", value: "silver"}
        ];
    }

    getSuggestions(query) {
        return this.colors.filter(color => color.name.toLowerCase().includes(query.toLowerCase()));
    }

    renderSuggestion(color, el) {
        el.createEl("div", {text: color.name});
    }

    onChooseSuggestion(color, evt) {
        const editor = this.app.workspace.activeLeaf.view.sourceMode.cmEditor;
        const cursor = editor.getCursor();
        const selectedText = editor.getSelection();

        if (selectedText) {
            editor.replaceSelection(`<span style="color: ${color.value};">${selectedText}</span>`);
        } else {
            editor.replaceRange(`<span style="color: ${color.value};"></span>`, cursor);
            editor.setCursor({ line: cursor.line, ch: cursor.ch + `<span style="color: ${color.value};">`.length });
        }
    }
}

module.exports = ColorPickerPlugin;
