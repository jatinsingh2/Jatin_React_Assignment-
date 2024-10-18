import React from 'react';
import ImageCropComponent from './ImageCropComponent';
import DragDropButtons from './DragDropButtons';
import './App.css';  

function App() {
  return (
    <div className="app-container">
      <h1 className="header">Jatin Singh React Assignment: Image Crop & Drag-Drop</h1>

      <div className="section">
        <h2 className="sub-header">Image Crop Component</h2>
        <p>Upload an image and crop it to the specified dimensions.</p>
        <ImageCropComponent crop={{ width: 1440, height: 720 }} />
      </div>

      <div className="divider"></div>

      <div className="section">
        <h2 className="sub-header">Drag & Drop Buttons</h2>
        <p>Drag and drop to reorder the buttons, or add/remove buttons dynamically.</p>
        <DragDropButtons />
      </div>
    </div>
  );
}

export default App;
