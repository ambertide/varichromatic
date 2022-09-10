import { useEffect, useRef } from "react";
import { useShader } from "../../hooks/useShader";
import { ImageData, ColourWeightData } from "../../types";
import "./ImageViewer.css";

interface ImageViewerProps {
  colourWeights: ColourWeightData;
  image: ImageData;
  resetImage: () => void;
}
export function ImageViewer({ colourWeights, image }: ImageViewerProps) {
  const { viewport, renderScene } = useShader(image, colourWeights);
  const rendererWrapper = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (rendererWrapper.current !== null) {
      // Calculate how much the canvas was scaled by.
      viewport.style.maxHeight = `${512 / (image.width / image.height)}px`;
      rendererWrapper.current.appendChild(viewport);
      renderScene();
    }
  }, [rendererWrapper, viewport, renderScene]);
  return (
    <div className="image-viewer">
      <div ref={rendererWrapper} className="rendererWrapper" />
    </div>
  );
}
