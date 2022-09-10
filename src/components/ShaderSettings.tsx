import { ColourWeightData } from "../types/ColourWeightData";
import { RangeSelector } from "./RangeSelector";

interface ShaderSettingsProps {
  colourWeights: ColourWeightData;
  setRed: (r: number) => void;
  setGreen: (g: number) => void;
  setBlue: (b: number) => void;
}

export function ShaderSettings({
  colourWeights,
  setRed,
  setGreen,
  setBlue,
}: ShaderSettingsProps) {
  const colours: ["red" | "green" | "blue", (w: number) => void][] = [
    ["red", setRed],
    ["green", setGreen],
    ["blue", setBlue],
  ];
  return (
    <div className="shader-settings">
      {colours.map(([colour, setWeight]) => (
        <RangeSelector
          label={`Sensitivity to ${colour}`}
          value={colourWeights[colour]}
          name={colour}
          setValue={setWeight}
          key={colour}
        />
      ))}
    </div>
  );
}
