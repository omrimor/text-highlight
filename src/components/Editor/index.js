import React from 'react';
import isObject from 'lodash/isObject';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { v4 } from 'uuid';

import ColorPicker from './ColorPicker';
import { replaceString, saveState, loadState, deleteState } from '../../utils';
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
      modifiedText: this.normalizeStateForReact(loadState()),
      displayColorPicker: false,
      xPos: '',
      yPos: '',
      showMarkers: true,
      isSavedToLocalStorage: false,
    };
  }

  createReactElements = childArray =>
    childArray.map(child =>
      isObject(child)
        ? React.createElement(child.type, {...child.props, key: child.key}, child.props.children)
        : child
    );

  normalizeStateForReact = data =>
    isEmpty(data) ? '' : this.createReactElements(data);

  setSelectedWord = () => {
    this.setState({selectedWord: window.getSelection().toString()});
  };

  setLocalStorageFlag = () => {
    this.setState({isSavedToLocalStorage: isEqual(this.state.modifiedText, loadState())});
  };

  setModifiedText = () => {
    this.setState({modifiedText: replaceString(this.getText(), this.state.selectedWord, this.textReplacer)}, () => {
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
    saveState(this.state.modifiedText);
    this.setState({isSavedToLocalStorage: true})
  };

  handleBtnReset = () => {
    this.setState({modifiedText: '', isSavedToLocalStorage: false});
    deleteState();
  };

  getText = () => {
    const { originalText, modifiedText, showMarkers } = this.state;
    return showMarkers ? !this.isModifiedText() ? originalText : modifiedText : originalText
  };

  textReplacer = (match, isWhiteSpace = false) => {
    const unique = v4();
    return isWhiteSpace
    ? <span key={`${match}_${unique}`}>{' '}</span>
    : (<span key={`${match}_${unique}`} style={{ backgroundColor: this.state.selectedColor }}>{match}</span>)
  };

  isModifiedText = () => {
    return this.state.modifiedText !== '';
  };

  render() {
    return (
      <div className="container">
        <div className="intro">
          Select text to highlight, choose a color, your'e Done !
          <span aria-label="clap" role="img">👏</span>
        </div>
        <ColorPicker
          displayColorPicker={this.state.displayColorPicker}
          selectedColor={this.state.selectedColor}
          mousePos={{x:this.state.xPos, y: this.state.yPos}}
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
          showMarkers={this.state.showMarkers}
          isSavedToLocalStorage={this.state.isSavedToLocalStorage}
          isModifiedText={this.isModifiedText()}
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
          }}
          handleMouseMove={event => {
            this.setMouseCords(event);
          }}
          displayText={this.getText()}
        />
      </div>
    );
  }
}

export default Editor;

