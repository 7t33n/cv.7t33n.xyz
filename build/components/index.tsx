import type { ResumeContent } from "@/types";
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

export function Resume({ data }: { data: ResumeContent }) {
  const {
    name,
    headings,
    contact,
    summary,
    skills,
    leadership,
    experience,
    projects,
    education,
    languages,
  } = data;

  return (
    <>
      <h1>{name}</h1>

      <h2>{headings.contact}</h2>
      <p>
        {contact.map((item, i) => (
          <>
            <strong>{item.label}:</strong>{" "}
            {item.href ? <a href={item.href}>{item.text}</a> : item.text}
            {i < contact.length - 1 ? <br /> : null}
          </>
        ))}
      </p>

      <h2>{headings.summary}</h2>
      <p>{summary.paragraph}</p>
      <ul>
        {summary.bullets.map((bullet) => (
          <li>{bullet}</li>
        ))}
      </ul>

      <hr />

      <h2>{headings.skills}</h2>
      <p>
        {skills.map((skill, i) => (
          <>
            <strong>{skill.label}</strong>: {skill.value}
            {i < skills.length - 1 ? <br /> : null}
          </>
        ))}
      </p>

      <hr />

      <NoPrint>
        <h2>{headings.leadership}</h2>
        <p>
          {leadership.map((item, i) => (
            <>
              <strong>{item.label}</strong>: {item.value}
              {i < leadership.length - 1 ? <br /> : null}
            </>
          ))}
        </p>
        <hr />
      </NoPrint>

      <h2>{headings.experience}</h2>
      {experience.map((company) => (
        <>
          <Company
            name={company.name}
            location={company.location}
            remote={company.remote}
          />
          {company.roles.map((role) => (
            <>
              <Role
                title={role.title}
                period={role.period}
                bullets={role.bullets}
              />
              {role.quote ? <Quote>{role.quote}</Quote> : null}
            </>
          ))}
          <hr />
        </>
      ))}

      <NoPrint>
        <h2>{headings.projects}</h2>
        {projects.map((project) => (
          <p>
            <strong>
              <a href={project.href}>{project.name}</a> ({project.year}):
            </strong>
            <br />
            {project.description}
          </p>
        ))}
        <hr />
      </NoPrint>

      <h2>{headings.education}</h2>
      <p>
        <strong>{education.school}</strong>
        <br />
        <em>{education.locationPeriod}</em>
        <br />
        <strong>{education.courseworkLabel}</strong> {education.coursework}
      </p>

      <hr />

      <h3>{headings.languages}</h3>
      <ul>
        {languages.map((lang) => (
          <li>
            <strong>{lang.label}:</strong> {lang.value}
          </li>
        ))}
      </ul>
    </>
  );
}
