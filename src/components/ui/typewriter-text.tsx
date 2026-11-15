import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

type TypewriterTextProps = {
  text: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  holdDuration?: number;
  restartDelay?: number;
};

type TypewriterPhase = 'typing' | 'holding' | 'deleting' | 'restarting';

/** Types and erases one complete grapheme at a time, including Thai marks. */
export function TypewriterText({
  text,
  typingSpeed = 95,
  deletingSpeed = 55,
  holdDuration = 1500,
  restartDelay = 450,
}: TypewriterTextProps) {
  const reducedMotion = useReducedMotion();
  const textRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(textRef, { amount: 0.5 });
  const characters = useMemo(() => {
    if (typeof Intl.Segmenter === 'function') {
      return Array.from(new Intl.Segmenter('th', { granularity: 'grapheme' }).segment(text), ({ segment }) => segment);
    }

    return Array.from(text);
  }, [text]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [phase, setPhase] = useState<TypewriterPhase>('typing');

  useEffect(() => {
    if (reducedMotion || !isInView) return;

    const delay = phase === 'typing'
      ? typingSpeed
      : phase === 'holding'
        ? holdDuration
        : phase === 'deleting'
          ? deletingSpeed
          : restartDelay;

    const timeoutId = window.setTimeout(() => {
      if (phase === 'typing') {
        const nextCount = Math.min(visibleCount + 1, characters.length);
        setVisibleCount(nextCount);
        if (nextCount === characters.length) setPhase('holding');
      } else if (phase === 'holding') {
        setPhase('deleting');
      } else if (phase === 'deleting') {
        const nextCount = Math.max(visibleCount - 1, 0);
        setVisibleCount(nextCount);
        if (nextCount === 0) setPhase('restarting');
      } else {
        setPhase('typing');
      }
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [characters.length, deletingSpeed, holdDuration, isInView, phase, reducedMotion, restartDelay, typingSpeed, visibleCount]);

  if (reducedMotion) return <span className="typewriter-text">{text}</span>;

  return (
    <span ref={textRef} className="typewriter-text">
      <span aria-hidden="true">{characters.slice(0, visibleCount).join('')}</span>
      <span className="typewriter-cursor" aria-hidden="true" />
      <span className="sr-only">{text}</span>
    </span>
  );
}
