import "./RangeSelector.css";
import { ChangeEvent, useCallback } from "react";

interface RangeSelectorProps {
  label: string;
  name: string;
  value: number;
  setValue: (v: number) => void;
}

/**
 * An input with a range and bound number input field.
 */
export function RangeSelector({
  label,
  name,
  value,
  setValue,
}: RangeSelectorProps) {
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const eventValue = event.target.value;
      if (!isNaN(parseFloat(eventValue))) {
        setValue(parseFloat(eventValue));
      }
    },
    [setValue]
  );
  return (
    <div className="range-selector">
      <fieldset>
        <legend>{label}</legend>
        <div className="input-group">
          <input
            className="range-slider"
            type="range"
            name={name}
            value={value}
            onChange={onChange}
            min={0}
            max={1}
            step={0.1}
          />
          <input
            className="range-number"
            type="number"
            name={name}
            value={value}
            onChange={onChange}
            min={0}
            max={1}
          />
        </div>
      </fieldset>
    </div>
  );
}
