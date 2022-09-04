import { useMemo, useCallback } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import BlackWhiteFragmentationShader from "../shaders/blackwhite.glsl";
import {
  Scene,
  TextureLoader,
  ShaderMaterial,
  OrthographicCamera,
  WebGLRenderer,
  Mesh,
  PlaneGeometry,
} from "three";

interface UseShaderReturn {
  viewport: HTMLCanvasElement;
  renderScene: () => void;
}

/**
 * Get the shader to put on the sprite
 * @param imageURL base image for texture.
 */
function getShaderMaterial(imageURL: string): ShaderMaterial {
  const uniforms = {
    texture: new TextureLoader().load(imageURL),
  };
  console.log(BlackWhiteFragmentationShader);
  return new ShaderMaterial({
    fragmentShader: BlackWhiteFragmentationShader,
    //    uniforms: {
    //      originalTexture: { value: uniforms.texture },
    //    },
  });
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
    const material = getShaderMaterial(imageURL);
    const plane = new PlaneGeometry(1, 1);
    scene.add(new Mesh(plane, material));
    // Add the camera.
    const camera = new OrthographicCamera(
      viewWidth / -2,
      viewWidth / 2,
      viewHeight / 2,
      viewHeight / -2,
      1,
      1000
    );
    camera.position.z = 5;
    scene.add(camera);
    const renderer = new WebGLRenderer();
    renderer.setSize(viewWidth, viewHeight);
    return [renderer, scene, camera];
  }, [imageURL, viewHeight, viewWidth]);

  const renderScene = useCallback(() => {
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  }, [renderer, scene, camera]);

  return {
    viewport: renderer.domElement,
    renderScene: renderScene,
  };
}
