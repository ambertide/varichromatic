import { useMemo, MutableRefObject, useEffect, useCallback } from "react";
import { createRoot } from "react-dom/client";
import {
  Scene,
  TextureLoader,
  SpriteMaterial,
  Sprite,
  OrthographicCamera,
  WebGLRenderer,
} from "three";

interface UseShaderReturn {
  viewport: HTMLCanvasElement;
  renderScene: () => void;
}

/**
 * Use a shader.
 * @param imageURL
 * @param viewWidth
 * @param viewHeight
 * @returns
 */
export function useShader(
  imageURL: string,
  viewWidth: number,
  viewHeight: number
): UseShaderReturn {
  // Construct the renderer.
  const [renderer, scene, camera] = useMemo(() => {
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
    scene.add(camera);
    const renderer = new WebGLRenderer();
    renderer.setSize(viewWidth, viewHeight);
    return [renderer, scene, camera];
  }, [imageURL, viewHeight, viewWidth]);

  const renderScene = useCallback(() => {
    renderer.render(scene, camera);
  }, [renderer, scene, camera]);
  return {
    viewport: renderer.domElement,
    renderScene: renderScene,
  };
}
