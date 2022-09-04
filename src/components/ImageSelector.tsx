import { useCallback } from "react";

interface ImageSelectorProps {
  setImageURL: (url: string) => void;
}

export function ImageSelector(props: ImageSelectorProps) {
  const { setImageURL } = props;
  const setImage = useCallback(
    (files: FileList | null) => {
      if (files != null && files.length > 0) {
        setImageURL(URL.createObjectURL(files[0]));
      }
    },
    [setImageURL]
  );
  return (
    <div className="image-selector">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files)}
      ></input>
    </div>
  );
}
