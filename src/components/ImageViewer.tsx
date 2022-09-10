import { useCallback, useEffect, useRef } from "react";
import { useShader } from "../hooks/useShader";
import { ImageData } from "../types/ImageData";
import "./ImageViewer.css";

interface ImageViewerProps {
  image: ImageData;
  resetImage: () => void;
}
export function ImageViewer({ image, resetImage }: ImageViewerProps) {
  const { viewport, renderScene } = useShader(image);
  const rendererWrapper = useRef<HTMLDivElement>(null);
  const onResetImage = useCallback(() => {
    resetImage();
    URL.revokeObjectURL(image.url);
  }, [resetImage, image]);
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
      <button onClick={onResetImage}>Clear Image</button>
    </div>
  );
}
