import React from 'react';
import { GithubPicker } from 'react-color';

export const ColorPicker = ({
  displayColorPicker,
  selectedColor,
  handlePickerClose,
  handleOnChange,
  handleOnChangeComplete,
  mousePos
}) => {
  const popover = {
    position: 'absolute',
    zIndex: '2',
    top: `${mousePos.y}px`,
    left: `${mousePos.x}px`,
  };

  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  };

  return displayColorPicker ? (
    <div style={popover}>
      <div
        style={cover}
        onClick={() => {
          handlePickerClose()
        }}
      />
        <GithubPicker
          color={selectedColor}
          onChange={(color, event) => {
            handleOnChange(color);
          }}
          onChangeComplete={(color, event) => {
            handleOnChangeComplete(color);
          }}
        />
    </div>
  ) : null;
};

export default ColorPicker;
