export interface RoleProps {
  title: string;
  period: string;
  bullets: string[];
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
