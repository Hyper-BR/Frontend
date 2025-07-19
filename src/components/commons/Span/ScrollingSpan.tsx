import React from 'react';
import { useScrollTextEffect } from '@/hooks/useScrollTextEffect';
import clsx from 'clsx';
import styles from './ScrollingSpan.module.scss';

interface Props {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  align?: 'left' | 'center' | 'right';
}

export const ScrollingSpan = ({ text, className = '', style, align = 'left' }: Props) => {
  const { containerRef, textRef } = useScrollTextEffect();

  return (
    <div className={clsx(styles.container, styles[`align-${align}`], className)} style={style} ref={containerRef}>
      <span ref={textRef} className={styles.text}>
        {text}
      </span>
    </div>
  );
};
