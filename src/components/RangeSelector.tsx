import "./RangeSelector.css";
import { ChangeEvent, useCallback } from "react";

interface RangeSelectorProps {
  name: string;
  value: number;
  setValue: (v: number) => void;
}

/**
 * An input with a range and bound number input field.
 */
export function RangeSelector({ name, value, setValue }: RangeSelectorProps) {
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
      <input
        type="range"
        name={name}
        value={value}
        onChange={onChange}
        min={0}
        max={1}
      />
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        min={0}
        max={1}
      />
    </div>
  );
}
