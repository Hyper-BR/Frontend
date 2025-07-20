import React from 'react';
import './Slider.scss';

interface Props {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  vertical?: boolean;
  onChange: (value: number) => void;
}

export const Slider = ({ value, min = 0, max = 100, step = 1, onChange, vertical }: Props) => {
  return (
    <div className={`slider ${vertical ? 'vertical' : 'horizontal'}`}>
      <input
        className="slider-thumb"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
};
