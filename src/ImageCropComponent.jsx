import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import styled from 'styled-components';
import './ImageCropComponent.css';

const CropContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ImageCropComponent = ({ crop }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [zoom, setZoom] = useState(1); 

  
  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);


  const getCroppedImg = useCallback(async () => {
    if (!croppedAreaPixels || !imageSrc) return null;

    const image = new Image();
    image.src = imageSrc;

    return new Promise((resolve) => {
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        ctx.drawImage(
          image,
          croppedAreaPixels.x * scaleX,
          croppedAreaPixels.y * scaleY,
          croppedAreaPixels.width * scaleX,
          croppedAreaPixels.height * scaleY,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );

        
        canvas.toBlob((blob) => {
          const croppedImageUrl = URL.createObjectURL(blob);
          resolve(croppedImageUrl);
        });
      };
    });
  }, [croppedAreaPixels, imageSrc]);

  
  const onCropImage = async () => {
    const croppedImage = await getCroppedImg();
    setCroppedImageUrl(croppedImage);
    setShowCropModal(false);
  };

  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      setShowCropModal(true);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {showCropModal && (
        <>
          <div className="modal-overlay"></div>
          <div className="modal">
            <CropContainer>
              <Cropper
                image={imageSrc}
                crop={{ x: 0, y: 0 }}
                zoom={zoom} 
                aspect={crop.width / crop.height}
                onCropChange={() => {}}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom} 
              />
            </CropContainer>
            <div className="controls">
              <label>Zoom: {parseFloat(zoom).toFixed(2)}</label>
              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))} 
                className="zoom-slider"
              />
            </div>
            <button onClick={onCropImage}>Crop Image</button>
          </div>
        </>
      )}
      {croppedImageUrl && (
        <div>
          <h3>Cropped Image:</h3>
          <img src={croppedImageUrl} alt="Cropped" />
        </div>
      )}
    </div>
  );
};

export default ImageCropComponent;
