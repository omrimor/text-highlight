import React from 'react';
import './EditorControls.css';

export const EditorControls = ({ showMarkers, handleInputChange, isModifiedText, handleBtnChange, handleBtnReset, isSavedToLocalStorage }) => {
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
          {isSavedToLocalStorage ? <span aria-label="saved" role="img">👌</span> : <span aria-label="save" role="img">💾</span>}
        </button>
        <button
          className="btn__reset"
          onClick={() => {
            handleBtnReset();
          }}>
          <span aria-label="reset" role="img">⌛</span>
        </button>
      </div>
    </div>
  );
};

export default EditorControls;
