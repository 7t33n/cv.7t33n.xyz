import type {
  CompanyProps,
  NoPrintProps,
  QuoteProps,
  RoleProps,
  SpoilerProps,
} from "./types";

export function Company({ name, location, remote }: CompanyProps) {
  const heading = location ? `${name} | ${location}` : name;
  return (
    <h3>
      {heading}
      {remote ? (
        <>
          {" "}
          <em>({remote})</em>
        </>
      ) : null}
    </h3>
  );
}

export function Role({ title, period, bullets }: RoleProps) {
  return (
    <>
      <p>
        <strong>{title}</strong>
        <br />
        <em>{period}</em>
      </p>
      <ul>
        {bullets.map((bullet) => (
          <li>{bullet}</li>
        ))}
      </ul>
    </>
  );
}

export function Quote({ children }: QuoteProps) {
  return (
    <blockquote>
      <p>{children}</p>
    </blockquote>
  );
}

export function NoPrint({ children }: NoPrintProps) {
  return <div class="no-print">{children}</div>;
}

export function Spoiler({ title, children }: SpoilerProps) {
  return (
    <details>
      <summary>{title}</summary>
      {children}
    </details>
  );
}
