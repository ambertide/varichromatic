import { useMemo } from "react";
import {
  Scene,
  TextureLoader,
  SpriteMaterial,
  Sprite,
  OrthographicCamera,
} from "three";

export function useShader(
  imageURL: string,
  viewHeight: number,
  viewWidth: number
) {
  const renderer = useMemo(() => {
    const scene = new Scene();
    const map = new TextureLoader().load(imageURL);
    const material = new SpriteMaterial({ map: map, color: 0xffffff });
    const sprite = new Sprite(material);
    sprite.scale.set(250, 250, 1);
    scene.add(sprite);
    // Add the camera.
    const camera = new OrthographicCamera(
      viewWidth / -2,
      viewWidth / 2,
      viewHeight / 2,
      viewHeight / -2,
      1,
      1000
    );
  }, [imageURL]);
  return scene;
}
