import "./ClearImageButton.css";
import { useCallback } from "react";
import { ImageData } from "../../types";

interface ClearImageButtonProps {
  image: ImageData;
  resetImage: () => void;
  disabled?: boolean;
}

export function ClearImageButton({
  image,
  resetImage,
  disabled,
}: ClearImageButtonProps) {
  const onResetImage = useCallback(() => {
    resetImage();
    URL.revokeObjectURL(image.url);
  }, [resetImage, image]);
  return (
    <button
      onClick={onResetImage}
      className="clear-image-button"
      disabled={disabled}
    >
      Clear Image
    </button>
  );
}
