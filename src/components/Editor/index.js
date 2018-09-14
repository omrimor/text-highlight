import React from 'react';
import isObject from 'lodash/isObject';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { v4 } from 'uuid';

import ColorPicker from './ColorPicker';
import { saveState, loadState, deleteState, replaceMatchChars } from '../../utils';
import EditorControls from './EditorControls';
import EditorText from './EditorText';
import textString from './textString';

import './Editor.css';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originalText: textString,
      selectedWord: '',
      selectedColor: '#fff',
      textAsArray: this.handleLocalStorageLoading(loadState()),
      displayColorPicker: false,
      xPos: '',
      yPos: '',
      showMarkers: true,
      isSavedToLocalStorage: false,
      startIndexAt: 0,
    };
  }

  handleLocalStorageLoading = data =>
    isEmpty(data) ? [] : data;

  setSelectedWord = () => {
    this.setState({
      selectedWord: window.getSelection().toString(),
    });
  };

  setSelectedStartIndex = () => {
    const selection = window.getSelection();
    this.setState({
      startIndexAt: selection.anchorOffset,
    });
  };

  setLocalStorageFlag = () => {
    const { textAsArray } = this.state;
    this.setState({isSavedToLocalStorage: isEqual(textAsArray, loadState())});
  };

  setModifiedText = () => {
    const { selectedWord, selectedColor, startIndexAt } = this.state;
    const textAsArray = replaceMatchChars(this.getText(), selectedWord, selectedColor, startIndexAt);
    this.setState({ textAsArray }, () => {
      this.setLocalStorageFlag();
    });
  };

  setSelectedColor = color => {
    this.setState({selectedColor: color.hex})
  };

  setMouseCords = e => {
    const xOffset = 50;
    const yOffset = 95;
    this.setState({ xPos: e.screenX - xOffset, yPos: e.screenY -yOffset });
  };

  handlePickerOpen = () => {
    this.setState({displayColorPicker: !this.state.displayColorPicker});
  };

  handlePickerClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleInputChange = event => {
    const target = event.target;
    this.setState({[target.name]: target.checked});
  };

  handleBtnSave = () => {
    saveState(this.state.textAsArray);
    this.setState({isSavedToLocalStorage: true})
  };

  handleBtnReset = () => {
    this.setState({
      textAsArray: '',
      isSavedToLocalStorage: false,
    });
    deleteState();
  };

  getText = () => {
    const { originalText, textAsArray, showMarkers } = this.state;
    return showMarkers ? !this.isTextAsArray() ? originalText : textAsArray : originalText
  };

  renderText = () => {
    const { originalText, textAsArray } = this.state;
    return !this.isTextAsArray() ? originalText : this.mapperForReactElements(textAsArray);
  };

  mapperForReactElements = src =>
    src.map(child =>
      isObject(child)
        ? React.createElement('span', {style: {backgroundColor: child.color}, key: child.indexAt + v4()}, child.match)
        : child
    );

  isTextAsArray = () => {
    return this.state.textAsArray.length > 0;
  };

  render() {
    const {
      displayColorPicker,
      selectedColor,
      xPos,
      yPos,
      showMarkers,
      isSavedToLocalStorage,
      originalText
    } = this.state;
    return (
      <div className="container">
        <div className="intro">
          Select text to highlight, choose a color, your'e Done !
          <span aria-label="clap" role="img">👏</span>
        </div>
        <ColorPicker
          displayColorPicker={displayColorPicker}
          selectedColor={selectedColor}
          mousePos={{x: xPos, y: yPos}}
          handlePickerClose={() => {
            this.handlePickerClose();
          }}
          handleOnChange={(color) => {
            this.setSelectedColor(color);
          }}
          handleOnChangeComplete={(color) => {
            this.setSelectedColor(color);
            this.setModifiedText();
          }}
        />
        <EditorControls
          showMarkers={showMarkers}
          isSavedToLocalStorage={isSavedToLocalStorage}
          isModifiedText={this.isTextAsArray()}
          handleInputChange={(event) => {
            this.handleInputChange(event)
          }}
          handleBtnChange={() => {
            this.handleBtnSave();
          }}
          handleBtnReset={() => {
            this.handleBtnReset();
          }}
        />
        <EditorText
          handleMouseUp={() => {
            this.handlePickerOpen();
            this.setSelectedWord();
            this.setSelectedStartIndex();
          }}
          handleMouseMove={event => {
            this.setMouseCords(event);
          }}
          displayText={showMarkers ? this.renderText() : originalText}
        />
      </div>
    );
  }
}

export default Editor;

