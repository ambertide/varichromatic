import React, { useCallback, useState } from "react";
import { ImageSelector } from "./components/ImageSelector";
import { ImageViewer } from "./components/ImageViewer";
import { ImageData } from "./types/ImageData";
import "./App.css";

const emptyImageData = { url: "", width: 0, height: 0 };

function App() {
  const [image, setImage] = useState<ImageData>(emptyImageData);
  const resetImage = useCallback(() => {
    setImage(emptyImageData);
  }, [setImage]);
  return (
    <div className="App">
      {image.url === "" ? (
        <ImageSelector setImage={setImage} />
      ) : (
        <ImageViewer resetImage={resetImage} image={image} />
      )}
    </div>
  );
}

export default App;
