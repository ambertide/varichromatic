import { useMemo, useCallback, useEffect } from "react";
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
  Vector2,
  Vector3,
} from "three";
import { ImageData, ColourWeightData } from "../types";

interface UseShaderReturn {
  viewport: HTMLCanvasElement;
  renderScene: () => void;
}

/**
 * Get the shader to put on the sprite
 * @param imageURL base image for texture.
 */
function getShaderMaterial(
  image: ImageData,
  colourWeights?: ColourWeightData
): ShaderMaterial {
  const texture = new TextureLoader().load(image.url);
  const textureWidth = image.width || 1;
  const textureHeight = image.height || 1;
  const uniforms = {
    texture,
    textureResolution: new Vector2(textureWidth, textureHeight),
    colorChannelBalances: new Vector3(
      colourWeights?.red || 1.0,
      colourWeights?.green || 1.0,
      colourWeights?.blue || 1.0
    ),
  };
  return new ShaderMaterial({
    fragmentShader: BlackWhiteFragmentationShader,
    uniforms: {
      originalTexture: { value: uniforms.texture },
      textureResolution: { value: uniforms.textureResolution },
      colorChannelBalances: { value: uniforms.colorChannelBalances },
    },
  });
}

/**
 * Use a shader.
 * @param image data about the image
 * @param colourWeights weights of each colour channel
 * @returns
 */
export function useShader(
  image: ImageData,
  colourWeights: ColourWeightData
): UseShaderReturn {
  // Construct the renderer.
  const [renderer, scene, camera, shader] = useMemo(() => {
    console.log("hi.");
    const scene = new Scene();
    const shader = getShaderMaterial(image);
    const plane = new PlaneGeometry(image.width, image.height);
    scene.add(new Mesh(plane, shader));
    // Add the camera.
    const camera = new OrthographicCamera(
      image.width / -2,
      image.width / 2,
      image.height / 2,
      image.height / -2,
      1,
      1000
    );
    camera.position.z = 5;
    scene.add(camera);
    const renderer = new WebGLRenderer();
    renderer.setSize(image.width, image.height);
    return [renderer, scene, camera, shader];
  }, [image]);

  const renderScene = useCallback(() => {
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  }, [renderer, scene, camera]);

  useEffect(() => {
    console.log(colourWeights);
    shader.uniforms.colorChannelBalances.value = new Vector3(
      colourWeights.red,
      colourWeights.green,
      colourWeights.blue
    );
  }, [colourWeights]);

  return {
    viewport: renderer.domElement,
    renderScene: renderScene,
  };
}
