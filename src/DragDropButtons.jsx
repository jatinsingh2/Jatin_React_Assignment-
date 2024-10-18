import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './DragDropButtons.css'; 

const ButtonItem = ({ index, text, moveButton }) => {
  const [, drag] = useDrag({
    type: 'BUTTON',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'BUTTON',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveButton(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <button ref={node => drag(drop(node))} className="draggable-button">
      {text}
    </button>
  );
};

const DragDropButtons = () => {
  const [buttons, setButtons] = useState(['Button 1']);

  const addButton = () => {
    if (buttons.length < 10) {
      setButtons([...buttons, `Button ${buttons.length + 1}`]);
    }
  };

  const removeButton = () => {
    if (buttons.length > 1) {
      setButtons(buttons.slice(0, -1));
    }
  };

  const moveButton = (fromIndex, toIndex) => {
    const updatedButtons = [...buttons];
    const [movedButton] = updatedButtons.splice(fromIndex, 1);
    updatedButtons.splice(toIndex, 0, movedButton);
    setButtons(updatedButtons);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="dnd-container">
        <div className="button-controls">
          <button onClick={addButton} className="control-button">Add Button</button>
          <button onClick={removeButton} className="control-button">Remove Button</button>
        </div>
        <div className="draggable-buttons-container">
          {buttons.map((text, index) => (
            <ButtonItem key={index} index={index} text={text} moveButton={moveButton} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default DragDropButtons;
