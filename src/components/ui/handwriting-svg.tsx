import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { Font } from 'opentype.js';
import { cn } from '@/lib/utils';

const DEFAULT_FONT_URL =
  'https://cdn.21st.dev/assets/mirror/cc/ccc94b22b156e9c5dfe50fd051f01b097600b252c24473e624bb43a143140a94.ttf';
const fontCache = new Map<string, Promise<Font>>();

function loadFont(fontUrl: string) {
  const cachedFont = fontCache.get(fontUrl);
  if (cachedFont) return cachedFont;

  const fontRequest = fetch(fontUrl)
    .then((response) => {
      if (!response.ok) throw new Error('Could not load the handwriting font.');
      return response.arrayBuffer();
    })
    .then(async (buffer) => {
      const opentype = await import('opentype.js');
      return opentype.parse(buffer);
    })
    .catch((error: unknown) => {
      fontCache.delete(fontUrl);
      throw error;
    });

  fontCache.set(fontUrl, fontRequest);
  return fontRequest;
}

export type HandwritingSvgProps = {
  text: string;
  className?: string;
  fontUrl?: string;
  duration?: number;
  characterDelay?: number;
  repeatDelay?: number;
  delay?: number;
  strokeWidth?: number;
  fontSize?: number;
  active?: boolean;
};

/** Draws a short line letter by letter as responsive SVG paths. */
export function HandwritingSvg({
  text,
  className,
  fontUrl = DEFAULT_FONT_URL,
  duration = 0.14,
  characterDelay = 0.035,
  repeatDelay = 4.5,
  delay = 0,
  strokeWidth = 1.7,
  fontSize = 42,
  active = true,
}: HandwritingSvgProps) {
  const prefersReducedMotion = useReducedMotion();
  const [letters, setLetters] = useState<{ index: number; path: string }[]>([]);
  const [viewBox, setViewBox] = useState('0 0 480 64');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    loadFont(fontUrl)
      .then((font) => {
        if (cancelled) return;
        const glyphs = font.stringToGlyphs(text);
        const paths: { index: number; path: string }[] = [];
        let penX = 0;
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        glyphs.forEach((glyph, index) => {
          const glyphPath = glyph.getPath(penX, fontSize, fontSize);
          const pathData = glyphPath.toPathData(2);
          if (!/^\s*$/.test(text[index]) && pathData) {
            const bounds = glyphPath.getBoundingBox();
            minX = Math.min(minX, bounds.x1);
            minY = Math.min(minY, bounds.y1);
            maxX = Math.max(maxX, bounds.x2);
            maxY = Math.max(maxY, bounds.y2);
            paths.push({ index, path: pathData });
          }

          penX += ((glyph.advanceWidth ?? font.unitsPerEm / 2) / font.unitsPerEm) * fontSize;
          const nextGlyph = glyphs[index + 1];
          if (nextGlyph) penX += (font.getKerningValue(glyph, nextGlyph) / font.unitsPerEm) * fontSize;
        });

        const padding = 5;
        const x = Math.floor(minX) - padding;
        const y = Math.floor(minY) - padding;
        const width = Math.ceil(Math.max(penX, maxX) - minX) + padding * 2;
        const height = Math.ceil(maxY - minY) + padding * 2;

        setViewBox(`${x} ${y} ${width} ${height}`);
        setLetters(paths);
      })
      .catch(() => {
        if (!cancelled) setLetters([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [fontSize, fontUrl, text]);

  if (!letters.length) {
    return <span className={cn('handwriting-fallback', loading && 'handwriting-loading', className)} aria-hidden="true">{text}</span>;
  }

  const isStatic = prefersReducedMotion || !active;

  return (
    <svg className={cn('handwriting-line', className)} viewBox={viewBox} preserveAspectRatio="xMinYMid meet" aria-hidden="true">
      {letters.map(({ index, path }) => (
        <motion.path
          key={index}
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
          animate={{ pathLength: prefersReducedMotion || active ? 1 : 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : duration,
            delay: isStatic ? 0 : delay + index * characterDelay,
            ease: 'easeInOut',
            repeat: isStatic ? 0 : Infinity,
            repeatType: 'reverse',
            repeatDelay,
          }}
        />
      ))}
    </svg>
  );
}
