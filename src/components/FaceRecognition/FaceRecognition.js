import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imgUrl, box }) => {
  const facesbox = box.map((face, index) => {
    return (
      <div
        key={index}
        className="bounding-box"
        style={{
          top: face.topRow,
          right: face.rightCol,
          bottom: face.bottomRow,
          left: face.leftCol
        }}
      />
    );
  });
  return imgUrl ? (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          src={imgUrl}
          alt="face"
          width="500px"
          height="auto"
        />
        {facesbox}
      </div>
    </div>
  ) : (
    ""
  );
};

export default FaceRecognition;
