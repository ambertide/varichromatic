import { ChangeEvent, EventHandler, useCallback } from "react";
import { ImageData } from "../types/ImageData";
type UploadEventHandler = (e: ChangeEvent<HTMLInputElement>) => void;
type Callback = (data: ImageData) => void;

interface UseImageUpload {
  onUpload: UploadEventHandler;
}

/**
 * Use to handle image uploading.
 * @param onUploadComplete Callback to be run on image uplaod completion.
 * @return a event handler function to be given to the input element's onChange.
 */
export function useImageUpload(onUploadComplete: Callback): UseImageUpload {
  const eventHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files !== null && e.target.files.length > 0) {
        const imageFile = e.target.files[0];
        const imageFileURL = URL.createObjectURL(imageFile);
        const tempImage = new Image();
        tempImage.src = imageFileURL;
        tempImage.onload = function (this: GlobalEventHandlers) {
          onUploadComplete({
            url: imageFileURL,
            width: (this as HTMLInputElement).width,
            height: (this as HTMLInputElement).height,
          });
        };
      }
    },
    [onUploadComplete]
  );
  return { onUpload: eventHandler };
}
