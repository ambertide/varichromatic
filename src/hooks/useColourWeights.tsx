import { useCallback, useState } from "react";
import { ColourWeightData } from "../types/ColourWeightData";

interface UseColourWeightsReturnType {
  weights: ColourWeightData;
  setRed: (red: number) => void;
  setGreen: (red: number) => void;
  setBlue: (red: number) => void;
}

/**
 * Use colour weights to determine weights for colours.
 * @return the weights of colours and functions to set each
 * colour.
 */
export function useColourWeights(): UseColourWeightsReturnType {
  const [weights, setWeights] = useState<ColourWeightData>({
    red: 1.0,
    green: 1.0,
    blue: 1.0,
  });
  const [setRed, setGreen, setBlue] = ["red", "green", "blue"].map(
    (colour) => (w: number) => {
      setWeights((prevWeights) => ({ ...prevWeights, [colour]: w }));
    }
  );
  return {
    weights,
    setRed,
    setGreen,
    setBlue,
  };
}
