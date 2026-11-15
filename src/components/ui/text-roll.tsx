import { useEffect, useState } from 'react';
import {
  motion,
  useReducedMotion,
  type Target,
  type TargetAndTransition,
  type Transition,
  type VariantLabels,
} from 'motion/react';

export type TextRollProps = {
  children: string;
  duration?: number;
  replayInterval?: number;
  getEnterDelay?: (index: number) => number;
  getExitDelay?: (index: number) => number;
  className?: string;
  transition?: Transition;
  variants?: {
    enter: {
      initial: Target | VariantLabels | boolean;
      animate: TargetAndTransition | VariantLabels;
    };
    exit: {
      initial: Target | VariantLabels | boolean;
      animate: TargetAndTransition | VariantLabels;
    };
  };
  onAnimationComplete?: () => void;
};

const defaultVariants = {
  enter: {
    initial: { rotateX: 0 },
    animate: { rotateX: 90 },
  },
  exit: {
    initial: { rotateX: 90 },
    animate: { rotateX: 0 },
  },
} as const;

function splitGraphemes(text: string) {
  if (typeof Intl.Segmenter === 'function') {
    return Array.from(new Intl.Segmenter('th', { granularity: 'grapheme' }).segment(text), ({ segment }) => segment);
  }

  return Array.from(text);
}

export function TextRoll({
  children,
  duration = 0.5,
  replayInterval,
  getEnterDelay = (index) => index * 0.1,
  getExitDelay = (index) => index * 0.1 + 0.2,
  className,
  transition = { ease: 'easeIn' },
  variants,
  onAnimationComplete,
}: TextRollProps) {
  const prefersReducedMotion = useReducedMotion();
  const [animationCycle, setAnimationCycle] = useState(0);

  useEffect(() => {
    if (!replayInterval || replayInterval <= 0 || prefersReducedMotion) return;

    const intervalId = window.setInterval(() => {
      setAnimationCycle((cycle) => cycle + 1);
    }, replayInterval);

    return () => window.clearInterval(intervalId);
  }, [prefersReducedMotion, replayInterval]);

  if (prefersReducedMotion) {
    return <span className={className}>{children}</span>;
  }

  const letters = splitGraphemes(children);

  return (
    <span className={className} aria-label={children}>
      {letters.map((letter, index) => {
        const visibleLetter = letter === ' ' ? '\u00a0' : letter;

        return (
          <span
            key={`${letter}-${index}-${animationCycle}`}
            className="relative inline-block [perspective:10000px] [transform-style:preserve-3d]"
            aria-hidden="true"
          >
            <motion.span
              className="absolute inline-block [backface-visibility:hidden] [transform-origin:50%_25%]"
              initial={variants?.enter.initial ?? defaultVariants.enter.initial}
              animate={variants?.enter.animate ?? defaultVariants.enter.animate}
              transition={{ ...transition, duration, delay: getEnterDelay(index) }}
            >
              {visibleLetter}
            </motion.span>
            <motion.span
              className="absolute inline-block [backface-visibility:hidden] [transform-origin:50%_100%]"
              initial={variants?.exit.initial ?? defaultVariants.exit.initial}
              animate={variants?.exit.animate ?? defaultVariants.exit.animate}
              transition={{ ...transition, duration, delay: getExitDelay(index) }}
              onAnimationComplete={index === letters.length - 1 ? onAnimationComplete : undefined}
            >
              {visibleLetter}
            </motion.span>
            <span className="invisible">{visibleLetter}</span>
          </span>
        );
      })}
      <span className="sr-only">{children}</span>
    </span>
  );
}
