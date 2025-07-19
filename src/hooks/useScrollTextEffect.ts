import { useRef, useEffect } from 'react';

export function useScrollTextEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) return;

    const handleMouseEnter = () => {
      const shouldScroll = text.scrollWidth > container.offsetWidth;
      if (shouldScroll) {
        text.classList.add('scroll-animate');
      }
    };

    const handleMouseLeave = () => {
      text.classList.remove('scroll-animate');
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { containerRef, textRef };
}
