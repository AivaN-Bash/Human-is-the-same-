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

      <figure className="invitation-quote" aria-label={`Quote by ${attribution}`}>
        <blockquote>
          <div className="invitation-quote-writing">
            {quote.split(' ').reduce<string[]>((lines, word) => {
              const lineIndex = lines.length - 1;
              if (lineIndex < 0) return [word];
              if (lines[lineIndex].length + word.length > 25) return [...lines, word];
              lines[lineIndex] = `${lines[lineIndex]} ${word}`;
              return lines;
            }, []).map((line) => <span className="invitation-handwriting-line" key={line}>{line}</span>)}
          </div>
        </blockquote>
        <figcaption>— {attribution}</figcaption>
      </figure>
    </article>
  );
}
