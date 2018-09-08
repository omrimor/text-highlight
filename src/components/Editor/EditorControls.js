import React from 'react';
import './EditorControls.css';

export const EditorControls = ({ showMarkers, handleInputChange, isModifiedText, handleBtnChange, handleBtnReset }) => {
  return (
    <div className="editor-controls">
      <div className="control__toggle">
        <label>
          <input
            name="showMarkers"
            type="checkbox"
            checked={showMarkers}
            onChange={(event) => {
              handleInputChange(event);
            }}
          />
          Show markers
        </label>
      </div>
      <div className="control__buttons">
        <button
          className="btn__save"
          disabled={!isModifiedText}
          onClick={() => {
            handleBtnChange();
          }}
        >
          save
        </button>
        <button
          className="btn__reset"
          onClick={() => {
            handleBtnReset();
          }}>
          reset
        </button>
      </div>
    </div>
  );
};

export default EditorControls;
