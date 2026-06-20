export interface CompanyProps {
  name: string;
  location?: string;
  remote?: string;
}

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
