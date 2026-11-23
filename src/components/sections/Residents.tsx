import Link from "next/link";
import { residentsContent } from "@/lib/data/residents";

export function Residents() {
  const { sectionId, ariaLabel, cards } = residentsContent;

  return (
    <section
      id={sectionId}
      aria-label={ariaLabel}
      className="who-section who light"
    >
      <div className="who-grid">
        {cards.map((card) => {
          const btnClass =
            card.cta.variant === "solid"
              ? "who-btn who-btn-solid btn solid"
              : "who-btn who-btn-outline btn";

          const btnInner = (
            <>
              <span>{card.cta.label}</span>
              {card.cta.hasArrow && (
                <svg
                  className="who-ar ar"
                  viewBox="0 0 16 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  aria-hidden="true"
                >
                  <path d="M0 5h14M10 1l4 4-4 4" />
                </svg>
              )}
            </>
          );

          return (
            <div key={card.eyebrow} className="who-panel panel">
              <span className="who-watermark big" aria-hidden="true">
                {card.watermark}
              </span>
              <div className="who-eyebrow eyebrow">{card.eyebrow}</div>
              <h3 className="who-title">{card.title}</h3>
              <p className="who-desc">{card.description}</p>
              <div className="who-act act">
                {card.cta.external ? (
                  <a
                    href={card.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={btnClass}
                  >
                    {btnInner}
                  </a>
                ) : (
                  <Link href={card.cta.href} className={btnClass}>
                    {btnInner}
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
