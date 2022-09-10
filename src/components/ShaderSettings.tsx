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
  return (
    <div className="shader-settings">
      <RangeSelector value={colourWeights.red} name="red" setValue={setRed} />
      <RangeSelector
        value={colourWeights.green}
        name="green"
        setValue={setGreen}
      />
      <RangeSelector
        value={colourWeights.blue}
        name="blue"
        setValue={setBlue}
      />
    </div>
  );
}
