import "./ImagePlayground.css";
import { useImageData, useColourWeights } from "../../hooks";
import { ImageSelector } from "./ImageSelector";
import { ImageViewer } from "./ImageViewer";
import { ShaderSettings } from "./ShaderSettings";
import { ClearImageButton } from "./ClearImageButton";

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
      <div className="image-viewport">
        {isImageEmpty ? (
          <ImageSelector setImage={setImage} />
        ) : (
          <ImageViewer
            resetImage={resetImage}
            image={image}
            colourWeights={weights}
          />
        )}
      </div>
      <div className="settings">
        <ShaderSettings colourWeights={weights} {...weightFunctions} />
        <ClearImageButton
          image={image}
          resetImage={resetImage}
          disabled={isImageEmpty}
        />
      </div>
    </section>
  );
}
