import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

export type AnimatedTextRollerProps = {
  lead: string;
  phrases: { text: string; color: 'blue' | 'crimson' }[];
  intervalMs?: number;
  className?: string;
};

const phraseColors = {
  blue: '#A4BDFF',
  crimson: '#F08DB8',
} as const;

/** Rotates short, related phrases without moving the surrounding layout. */
export default function AnimatedTextRoller({
  lead,
  phrases,
  intervalMs = 3000,
  className,
}: AnimatedTextRollerProps) {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const phraseCount = Math.max(phrases.length, 1);

  useEffect(() => {
    if (prefersReducedMotion || phrases.length < 2) return;

    const intervalId = window.setInterval(() => {
      setIndex((current) => (current + 1) % phrases.length);
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [intervalMs, phrases.length, prefersReducedMotion]);

  if (phrases.length === 0) return null;

  return (
    <div className={cn('animated-text-roller', className)}>
      <span className="animated-text-lead">{lead}</span>
      <span className="animated-text-window" aria-hidden="true">
        <span
          className="animated-text-track"
          style={{
            '--phrase-count': phraseCount,
            transform: `translateY(-${index * (100 / phraseCount)}%)`,
          } as CSSProperties}
        >
          {phrases.map(({ text, color }, phraseIndex) => (
            <span className="animated-text-item" key={`${text}-${phraseIndex}`}>
              <span
                className="animated-text-phrase"
                style={{
                  color: phraseColors[color],
                } as CSSProperties}
              >
                {text}
              </span>
            </span>
          ))}
        </span>
      </span>
      <span className="sr-only">{phrases[0].text}</span>
    </div>
  );
}
