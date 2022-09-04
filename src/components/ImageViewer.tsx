import { useShader } from "../hooks/useShader";

interface ImageViewerProps {
  imageURL: string;
  resetImage: () => void;
}
export function ImageViewer(props: ImageViewerProps) {
  const { imageURL, resetImage } = props;
  const scene = useShader(imageURL);
  return (
    <div className="image-viewer">
      <img
        src={imageURL}
        alt="User selected content to apply the shader on"
      ></img>
      <button>Clear Image</button>
    </div>
  );
}
