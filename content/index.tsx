import type { PageMeta } from "@/types";
import { Company, NoPrint, Quote, Role } from "@/components";

export const meta: PageMeta = {
  title: "Dmitry Kulikov – Lead Front-end Engineer | Resume",
  description:
    "Lead Front-end Engineer with 6+ years across fintech, SaaS, and e-commerce. I build scalable, high-performance web applications with Vue.js, TypeScript, and DevOps. Based in Novi Sad, Serbia.",
  email: "dkulikov17@pm.me",
  linkedin: "https://linkedin.com/in/7t33n",
  github: "https://github.com/7t33n",
  website: "https://cv.7t33n.xyz",
  image: "https://cv.7t33n.xyz/assets/profile.jpg",
  keywords:
    "Dmitry Kulikov, Front-end Developer, Vue.js, TypeScript, JavaScript, DevOps, SaaS, Fintech, E-commerce, Resume, Portfolio, Novi Sad, Serbia, Remote Developer, Agile, CI/CD, Team Lead",
  summary:
    "Lead Front-end Engineer with 6+ years of experience building scalable web applications for fintech, SaaS, and e-commerce. Skilled in Vue.js, TypeScript, DevOps, and team leadership. Based in Novi Sad, Serbia.",
  tags: [
    "Front-end Developer",
    "Vue.js",
    "TypeScript",
    "JavaScript",
    "DevOps",
    "Voice Recognition",
    "SaaS",
    "Fintech",
    "E-commerce",
    "Web Development",
    "Agile",
    "CI/CD",
    "Team Lead",
    "Resume",
    "Portfolio",
    "Novi Sad",
    "Serbia",
    "Remote Work",
  ],
  og: {
    title: "Dmitry Kulikov – Lead Front-end Engineer",
    description:
      "Lead Front-end Engineer with 6+ years in fintech, SaaS, and e-commerce. I build scalable web apps with Vue.js, TypeScript, and DevOps.",
    locale: "en",
    image: "https://cv.7t33n.xyz/assets/profile.jpg",
    url: "https://cv.7t33n.xyz",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sevent33n",
    title: "Dmitry Kulikov – Lead Front-end Engineer",
    description:
      "Lead Front-end Engineer building scalable web apps with Vue.js, TypeScript, and DevOps. 6+ years across fintech, SaaS, and e-commerce.",
    image: "https://cv.7t33n.xyz/assets/profile.jpg",
  },
};

export default function Resume() {
  return (
    <>
      <h1>Dmitry Kulikov</h1>

      <h2>Contact Information</h2>
      <p>
        <strong>Location:</strong> Serbia, Vojvodina, Novi Sad
        <br />
        <strong>Email:</strong>{" "}
        <a href="mailto:dkulikov17@pm.me">dkulikov17@pm.me</a>
        <br />
        <strong>Telegram:</strong>{" "}
        <a href="https://t.me/sevent33n">@sevent33n</a>
        <br />
        <strong>LinkedIn:</strong>{" "}
        <a href="https://linkedin.com/in/7t33n">linkedin.com/in/7t33n</a>
        <br />
        <strong>GitHub:</strong>{" "}
        <a href="https://github.com/7t33n">github.com/7t33n</a>
      </p>

      <h2>Summary</h2>
      <p>
        Lead Front-end Engineer with 6+ years building products for fintech,
        SaaS, and e-commerce. I lead teams and design web apps that scale, mostly
        in Vue.js and TypeScript, and I handle the DevOps side too. Most of my
        time goes into keeping the codebase clean and making releases boring.
      </p>
      <ul>
        <li>
          Set up Agile routines and automated the repetitive release work, so the
          team stopped deploying by hand.
        </li>
        <li>
          Rolled out a new Git workflow and CI/CD pipeline, which cut deployment
          mistakes.
        </li>
        <li>
          Built high-traffic features that stay responsive at 10,000+ records.
        </li>
      </ul>

      <hr />

      <h2>Skills</h2>
      <p>
        <strong>Front-end</strong>: JavaScript (ES6+), TypeScript, Vue.js,
        Nuxt.js, HTML5, CSS3, PostCSS, SASS/SCSS, Responsive Design, Webpack,
        Vite, Browser Extensions
        <br />
        <strong>Architecture & DevOps</strong>: Monorepo (Turborepo, NX), Docker,
        Podman, Git, GitHub Actions, SonarCloud, Cloudflare, CI/CD, GCP
        <br />
        <strong>Back-end</strong>: Node.js, Express.js, REST APIs, GraphQL
        <br />
        <strong>AI-Assisted Engineering</strong>: Cursor, Claude Code, OpenCode,
        MCP (Model Context Protocol) servers, prompt engineering for code
        generation, context optimization for monorepo/feature-isolated
        codebases, LLM integration in product (Gemini transcription)
        <br />
        <strong>Testing</strong>: Unit, Integration, and E2E Testing
        <br />
        <strong>Project Management</strong>: Agile, Scrum, Kanban, Jira,
        Confluence
        <br />
        <strong>Other</strong>: Data Visualization, Analytics, Microservices,
        Refactoring Legacy Code, Technical Writing
      </p>

      <hr />

      <NoPrint>
        <h2>Leadership & Architecture</h2>
        <p>
          <strong>Technical Leadership</strong>: Team Management (10+ engineers),
          Mentoring, Code Review Best Practices, Technical Architecture Design
          <br />
          <strong>Process Management</strong>: Release Process Management, Sprint
          Planning, Technical Roadmap Development
          <br />
          <strong>Architecture</strong>: Monorepo Architecture, Feature Isolation
          Strategy, Scalable Application Design
        </p>
        <hr />
      </NoPrint>

      <h2>Work Experience</h2>

      <Company name="SXOPE" location="Tampa, FL, USA" remote="Remote" />
      <Role
        title="Technical Lead"
        period="Apr 2025 – Present"
        bullets={[
          "Architected monorepo transition to isolate features as packages, eliminating integration bugs from legacy code tight coupling.",
          "Established release process with zero rollbacks by introducing pre-production environments and 2-day testing windows before production deployment.",
          "Led team of 10 engineers; reduced feature integration time by isolating packages in a monorepo, removing the cross-feature merge conflicts that previously blocked parallel work.",
          "Integrated LLM tools into development workflow, optimizing context usage for isolated feature packages vs. full project context.",
          "Took ownership of release processes and project architecture across Webapp, and Browser Extension stacks.",
        ]}
      />
      <Quote>
        “Good architecture has less to do with technology than with people and
        process. I focus on isolating complexity and keeping releases
        transparent.”
      </Quote>
      <Role
        title="Lead Front-end Developer"
        period="Mar 2024 – Mar 2025"
        bullets={[
          "Led a team of 9 engineers, set clear goals, and improved sprint velocity and release reliability.",
          "Designed a new Git branching and release process, replacing the ad-hoc deploys that previously caused recurring production errors.",
          "Worked closely with back-end, QA, design, and tech writing teams to deliver features on time.",
          "Managed features from idea to launch, helping the team ship faster and with fewer blockers.",
          "Built a custom voice recognition system after the browser APIs fell short. It uses Gemini for transcription and runs real-time Voice Activity Detection (VAD) in the browser with ONNX Runtime Web and Silero-VAD.",
        ]}
      />
      <Role
        title="Front-end Developer"
        period="Dec 2022 – Mar 2024"
        bullets={[
          "Built a Virtual Scroll component with collapsible rows that keeps the table interactive at 10,000+ rows, where the previous render froze the UI.",
          "Rewrote polygon and point rendering with google maps, improving speed from O(n²) to O(n).",
          "Set up automated unit and integration tests, raising code coverage and catching bugs before release.",
        ]}
      />

      <hr />

      <Company name="panfilov.group" location="Moscow, Russia" remote="Remote" />
      <Role
        title="Head of Front-end Department"
        period="Apr 2022 – Sep 2022"
        bullets={[
          "Rolled out Agile and Kanban, making projects more transparent and speeding up delivery.",
          "Simplified front-end workflows, which shortened cycle times and helped the team ship features faster.",
          "Tracked key metrics (TTM, Cycle Time, Lead Time) to spot bottlenecks and drive improvements.",
        ]}
      />
      <Role
        title="Front-end Team Lead"
        period="Aug 2020 – Apr 2022"
        bullets={[
          "Grew the front-end team from 2 to 8, hiring and onboarding new developers to support company growth.",
          "Mentored junior engineers—three earned promotions under my guidance.",
          "Led the build of a fintech analytics platform that gave stakeholders real-time insight into the numbers.",
          "Started a mobile development team, expanding the company’s service range.",
        ]}
      />
      <Role
        title="Front-end Developer"
        period="Sep 2019 – Aug 2020"
        bullets={[
          "Built and maintained aggregator, info, and e-commerce platforms.",
          "Promoted from Middle to Senior Developer in under a year for strong results and initiative.",
        ]}
      />

      <hr />

      <Company name="Studio T" location="Tomsk, Russia" />
      <Role
        title="Front-end Developer"
        period="May 2019 – Aug 2019"
        bullets={[
          "Developed a corporate website with interactive animations driven by graph theory.",
        ]}
      />

      <hr />

      <Company name="Attrax.Digital" location="Tomsk, Russia" />
      <Role
        title="Front-end Developer"
        period="Jul 2018 – May 2019"
        bullets={[
          "Delivered crypto products for fintech and iGaming clients, leading a small team to hit deadlines and stay on budget.",
        ]}
      />

      <hr />

      <Company name="Freelance, self-employed" />
      <Role
        title="Full-stack Developer"
        period="Nov 2014 – Jun 2018"
        bullets={[
          "Built and maintained websites for local businesses, offering ongoing support and technical advice.",
        ]}
      />

      <hr />

      <NoPrint>
        <h2>Projects</h2>
        <p>
          <strong>
            <a href="https://cv.7t33n.xyz">cv.7t33n.xyz</a> (2025):
          </strong>
          <br />
          Created a resume platform with TypeScript and markdown-it, deployed on
          Cloudflare Pages.
        </p>
        <hr />
      </NoPrint>

      <h2>Education</h2>
      <p>
        <strong>Tomsk College of Information Technologies</strong>
        <br />
        <em>Tomsk, Russia | Sep 2015 – Jun 2019</em>
        <br />
        <strong>Relevant coursework:</strong> Web Development, Computer Networks,
        Databases, Software Engineering
      </p>

      <hr />

      <h3>Languages</h3>
      <ul>
        <li>
          <strong>Russian:</strong> Native
        </li>
        <li>
          <strong>English:</strong> Intermediate
        </li>
        <li>
          <strong>Serbian:</strong> Beginner
        </li>
      </ul>
    </>
  );
}
