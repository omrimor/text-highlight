import React from 'react';

export const EditorText = ({ handleMouseUp, handleMouseMove, displayText }) => {
  return (
    <div
      className="editor"
      onMouseUp={() => {
        handleMouseUp();
      }}
      onMouseMove={event => {
        handleMouseMove(event);
      }}
    >
      {displayText}
    </div>
  );
};

export default EditorText;
