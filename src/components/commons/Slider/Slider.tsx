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
    <div className="slider">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider-thumb"
        style={vertical && { transform: 'rotate(-90deg)' }}
      />
    </div>
  );
};
