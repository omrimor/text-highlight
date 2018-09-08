This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

### Quick Start
- clone the repo
- run `yarn install`
- run `yarn start`

### About
This small POC is a lean text editor.
You can highlight words in the paragraph,
select a color from the popup color picker and you're done !

### Technical Overview
The main container file for the text editor, located at `src/components/Editor/index.js`,
has an internal state which handles the component's logic.

it delegated the required `props` for the `ColorPicker`, `EditorControls` and `EditorText`.

#### Persistent State - `src/utils/localStorage.js`
Achieved using `localStorage`.

#### Text highlighting - `src/utils/replaceString.js`
The main functionality takes the initial string, the word to highlight and a callback
function to apply when match is found.
