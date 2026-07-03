import type { ReactNode } from 'react';

/* Small typed-paper building blocks shared by the dossier pages. */

export function Field({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="pp-field">
      <span className="pp-field-k">{k}</span>
      <span className="pp-field-v">{v}</span>
    </div>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="pp-bullets">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function TechStamps({ tech }: { tech: string[] }) {
  return (
    <div className="pp-tech">
      {tech.map((t) => (
        <span className="ink-chip" key={t}>
          {t}
        </span>
      ))}
    </div>
  );
}

export function Gauge({ name, level }: { name: string; level: number }) {
  return (
    <div className="gauge-row">
      <span className="gauge-name">{name}</span>
      {level > 0 ? (
        <>
          <span className="gauge-track" aria-hidden="true">
            <span className="gauge-ink" style={{ width: `${level}%` }} />
          </span>
          <span className="gauge-score">{level}/100</span>
        </>
      ) : (
        <span className="gauge-classified">CLASSIFIED</span>
      )}
    </div>
  );
}
