import React, { useCallback, useState } from "react";
import { ImageSelector } from "./components/ImageSelector";
import { ImageViewer } from "./components/ImageViewer";
import "./App.css";

function App() {
  const [imageURL, setImageURL] = useState("");
  const resetImage = useCallback(() => {
    setImageURL("");
  }, [setImageURL]);
  return (
    <div className="App">
      {imageURL === "" ? (
        <ImageSelector setImageURL={setImageURL} />
      ) : (
        <ImageViewer resetImage={resetImage} imageURL={imageURL} />
      )}
    </div>
  );
}

export default App;
