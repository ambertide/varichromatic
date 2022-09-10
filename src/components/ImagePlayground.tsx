import { useState, useCallback } from "react";
import { useImageData, useColourWeights } from "../hooks";
import { ImageSelector } from "./ImageSelector";
import { ImageViewer } from "./ImageViewer";
import { ShaderSettings } from "./ShaderSettings";

/**
 * A component that allows the user to upload or see an image after upload
 * and play with its shader settings.
 * @returns
 */
export function ImagePlayground() {
  const { image, isImageEmpty, setImage, resetImage } = useImageData();
  const { weights, ...weightFunctions } = useColourWeights();
  return (
    <section className="image-playground">
      {isImageEmpty ? (
        <ImageSelector setImage={setImage} />
      ) : (
        <ImageViewer resetImage={resetImage} image={image} />
      )}
      <ShaderSettings colourWeights={weights} {...weightFunctions} />
    </section>
  );
}
