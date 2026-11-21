import { useRef } from 'react';
import { useInView } from 'motion/react';
import { HandwritingSvg } from './handwriting-svg';

export type LearningInvitationCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel: string;
  href: string;
  quote: string;
  attribution: string;
};

/** A reusable volunteer invitation with an animated education quote. */
export function LearningInvitationCard({
  eyebrow,
  title,
  description,
  actionLabel,
  href,
  quote,
  attribution,
}: LearningInvitationCardProps) {
  const quoteRef = useRef<HTMLElement>(null);
  const quoteIsVisible = useInView(quoteRef, { amount: 0.3 });

  return (
    <article className="invitation-card" aria-labelledby="invitation-card-title">
      <div className="invitation-card-copy">
        <p className="invitation-eyebrow"><span aria-hidden="true" />{eyebrow}</p>
        <h2 id="invitation-card-title">{title}</h2>
        <p className="invitation-description">{description}</p>
        <a className="invitation-action" href={href}>
          {actionLabel}<span aria-hidden="true">↗</span>
        </a>
      </div>

      <figure ref={quoteRef} className="invitation-quote" aria-label={`Quote by ${attribution}`}>
        <blockquote>
          <span className="sr-only">{quote}</span>
          <div className="invitation-quote-writing" aria-hidden="true">
            {['Education is the most', 'powerful weapon which', 'you can use to change', 'the world.'].map((line, index) => (
              <HandwritingSvg key={line} text={line} className="invitation-handwriting-line" delay={0.12 + index * 0.82} duration={1} active={quoteIsVisible} />
            ))}
          </div>
        </blockquote>
        <figcaption>— {attribution}</figcaption>
      </figure>
    </article>
  );
}
