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
The api is for loading, saving and deleting a key from `localStorage`.
Since the api is kept generic, a functionality in the `Editor/index` is responsible
for converting the parsed `localStorage` object back to a `DOM` element using `React.createElement` API.
See `createReactElements` function.

#### Text highlighting - `src/utils/replaceString.js`
The main functionality takes an input, matched string to look for, the selected color and the index location
of the matched string.<br />
It determines if the match exist, if so has it been changed before and passes unmatched items.
the result is an array of strings with the matched strings as objects in that array.<br />
The main container, `Editor/index.js` takes the new array and parses the object to React elements.
