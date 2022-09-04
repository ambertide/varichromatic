import { createElement, useCallback, useEffect, useRef } from "react";
import { useShader } from "../hooks/useShader";

interface ImageViewerProps {
  imageURL: string;
  resetImage: () => void;
}
export function ImageViewer(props: ImageViewerProps) {
  const { imageURL, resetImage } = props;
  const { viewport, renderScene } = useShader(imageURL, 250, 250);
  const rendererWrapper = useRef<HTMLDivElement>(null);
  const onResetImage = useCallback(() => {
    resetImage();
    URL.revokeObjectURL(imageURL);
  }, [resetImage, imageURL]);
  useEffect(() => {
    if (rendererWrapper.current !== null) {
      rendererWrapper.current.appendChild(viewport);
      renderScene();
    }
  }, [rendererWrapper, viewport, renderScene]);
  return (
    <div className="image-viewer">
      <div ref={rendererWrapper} />
      <button onClick={onResetImage}>Clear Image</button>
    </div>
  );
}
