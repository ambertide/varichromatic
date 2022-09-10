import { ImageData } from "../types/ImageData";
import { useState, useCallback, useMemo } from "react";

const emptyImageData = { url: "", width: 0, height: 0 };

interface UseImageDataReturnType {
  /**
   * Current state of the image.
   */
  image: ImageData;
  /**
   * Returns true if the image is empty.
   */
  isImageEmpty: boolean;
  /**
   * A callback to set the image data to something
   * else.
   */
  setImage: (data: ImageData) => void;
  /**
   * Resets the image data to empty.
   */
  resetImage: () => void;
}

/**
 * Control state of image data.
 * @returns current image, a function to set the image and
 * one to reset the image.
 */
export function useImageData(): UseImageDataReturnType {
  const [image, setImage] = useState<ImageData>(emptyImageData);
  const resetImage = useCallback(() => {
    setImage(emptyImageData);
  }, [setImage]);
  const isImageEmpty = useMemo(() => image.url === "", [image]);
  return {
    image,
    isImageEmpty,
    setImage,
    resetImage,
  };
}
