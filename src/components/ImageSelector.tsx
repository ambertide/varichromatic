import "./ImageSelector.css";
import { useImageUpload } from "../hooks/useImageUpload";
import { ImageData } from "../types/ImageData";

interface ImageSelectorProps {
  setImage: (data: ImageData) => void;
}

export function ImageSelector({ setImage }: ImageSelectorProps) {
  const { onUpload } = useImageUpload(setImage);
  return (
    <div className="image-selector">
      <input type="file" accept="image/*" onChange={onUpload}></input>
    </div>
  );
}
