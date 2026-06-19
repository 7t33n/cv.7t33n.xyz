import type { PageMeta } from "@/types";
import { Company, NoPrint, Quote, Role } from "@/components";

export const meta: PageMeta = {
  title: "Дмитрий Куликов – Lead Front-end Engineer | Резюме",
  description:
    "Lead Front-end Engineer с опытом более 6 лет в финтехе, SaaS и e-commerce. Создаю масштабируемые и производительные веб-приложения на Vue.js, TypeScript и с DevOps-практиками. Нови-Сад, Сербия.",
  email: "dkulikov17@pm.me",
  linkedin: "https://linkedin.com/in/7t33n",
  github: "https://github.com/7t33n",
  website: "https://cv.7t33n.xyz",
  image: "https://cv.7t33n.xyz/assets/profile.jpg",
  keywords:
    "Дмитрий Куликов, Front-end Developer, Vue.js, TypeScript, JavaScript, DevOps, SaaS, Fintech, E-commerce, Резюме, Портфолио, Нови-Сад, Сербия, Удаленный разработчик, Agile, CI/CD, Team Lead",
  summary:
    "Lead Front-end Engineer с опытом 6+ лет в создании масштабируемых веб-приложений для финтех, SaaS и электронной коммерции. Опыт в Vue.js, TypeScript, DevOps и управлении командой. Город: Нови-Сад, Сербия.",
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
    "Резюме",
    "Портфолио",
    "Нови-Сад",
    "Сербия",
    "Удаленная работа",
  ],
  og: {
    title: "Дмитрий Куликов – Lead Front-end Engineer",
    description:
      "Lead Front-end Engineer с опытом более 6 лет в финтехе, SaaS и e-commerce. Создаю масштабируемые и производительные веб-приложения на Vue.js, TypeScript и с DevOps-практиками.",
    locale: "ru",
    image: "https://cv.7t33n.xyz/assets/profile.jpg",
    url: "https://cv.7t33n.xyz",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sevent33n",
    title: "Дмитрий Куликов – Lead Front-end Engineer",
    description:
      "Lead Front-end Engineer: масштабируемые веб-приложения на Vue.js, TypeScript и DevOps. 6+ лет в финтехе, SaaS и e-commerce.",
    image: "https://cv.7t33n.xyz/assets/profile.jpg",
  },
};

export default function Resume() {
  return (
    <>
      <h1>Дмитрий Куликов</h1>

      <h2>Контактная информация</h2>
      <p>
        <strong>Локация:</strong> Сербия, Воеводина, Нови-Сад
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

      <h2>О себе</h2>
      <p>
        Lead Front-end Engineer с более чем 6-летним опытом создания продуктов
        для финтеха, SaaS и e-commerce. Руководил командами и проектировал
        масштабируемые веб-приложения, в основном на Vue.js и TypeScript; DevOps
        тоже на мне. Большую часть времени трачу на то, чтобы держать код чистым,
        а релизы — предсказуемыми.
      </p>
      <ul>
        <li>
          Настроил Agile-практики и автоматизировал рутину релизов, чтобы команда
          перестала деплоить руками.
        </li>
        <li>
          Внедрил новую Git-стратегию и CI/CD, после чего ошибок при деплое стало
          меньше.
        </li>
        <li>
          Сделал высоконагруженные фичи, которые остаются отзывчивыми на 10 000+
          записях.
        </li>
      </ul>

      <hr />

      <h2>Навыки</h2>
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
        MCP-серверы (Model Context Protocol), prompt engineering для генерации
        кода, оптимизация контекста для монорепозиториев и feature-isolated
        кодовых баз, интеграция LLM в продукт (транскрипция через Gemini)
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
        <h2>Лидерство и Архитектура</h2>
        <p>
          <strong>Техническое лидерство</strong>: Управление командой (10+
          инженеров), Менторинг, Best Practices Code Review, Проектирование
          технической архитектуры
          <br />
          <strong>Управление процессами</strong>: Управление релизами,
          Планирование спринтов, Разработка технического роадмапа
          <br />
          <strong>Архитектура</strong>: Монорепозиторий, Стратегия изоляции фич,
          Проектирование масштабируемых приложений
        </p>
        <hr />
      </NoPrint>

      <h2>Опыт работы</h2>

      <Company name="SXOPE" location="Tampa, FL, USA" remote="удалённо" />
      <Role
        title="Technical Lead"
        period="апрель 2025 – настоящее время"
        bullets={[
          "Спроектировал переход на монорепозиторий для изоляции фич как пакетов, устранив интеграционные баги от тесной связанности легаси-кода.",
          "Внедрил процесс релизов с нулевым процентом откатов благодаря препрод-окружению и 2-дневному окну тестирования перед продом.",
          "Руководил командой из 10 инженеров; сократил время интеграции фич за счёт изоляции пакетов в монорепозитории, устранив межфичевые merge-конфликты, которые раньше блокировали параллельную работу.",
          "Интегрировал LLM-инструменты в рабочий процесс разработки, оптимизируя использование контекста для изолированных фича-пакетов вместо полного проекта.",
          "Принял ответственность за процессы релизов и архитектуру проекта (Electron, Webapp, Chrome Extension).",
        ]}
      />
      <Quote>
        «Хорошая архитектура — это в меньшей степени про технологии и в большей
        про людей и процессы. Я фокусируюсь на изоляции сложности и прозрачности
        релизов.»
      </Quote>
      <Role
        title="Lead Front-end Developer"
        period="март 2024 – март 2025"
        bullets={[
          "Руководил командой из 9 инженеров: ставил понятные цели, увеличил скорость спринтов и стабильность релизов.",
          "Разработал новый процесс ветвления Git и релизов, заменив стихийные деплои, которые раньше приводили к регулярным ошибкам на проде.",
          "Плотно взаимодействовал с бэкендом, QA, дизайнерами и техрайтерами для своевременного выпуска фич.",
          "Вёл фичи от идеи до релиза, помогая команде выпускать быстрее и без блокеров.",
          "Сделал систему распознавания речи после того, как браузерные API не справились. Транскрипция идёт через Gemini, VAD работает прямо в браузере на ONNX Runtime Web и Silero-VAD.",
        ]}
      />
      <Role
        title="Front-end Developer"
        period="декабрь 2022 – март 2024"
        bullets={[
          "Реализовал компонент виртуального скролла со сворачиваемыми строками, который сохраняет таблицу отзывчивой на 10 000+ строк — там, где прежний рендеринг подвешивал интерфейс.",
          "Переписал отрисовку полигонов и точек для карт с использованием Google Maps, ускорив работу с O(n²) до O(n).",
          "Настроил автоматические unit- и интеграционные тесты, повысив покрытие кода и предотвращая баги до релиза.",
        ]}
      />

      <hr />

      <Company name="panfilov.group" location="Москва, Россия" remote="удалённо" />
      <Role
        title="Head of Front-end Department"
        period="апрель 2022 – сентябрь 2022"
        bullets={[
          "Внедрил Agile и Kanban, повысив прозрачность проектов и ускорив их выполнение.",
          "Упростил процессы во фронтенде, что сократило цикл разработки и ускорило выпуск новых фич.",
          "Отслеживал ключевые метрики (TTM, Cycle Time, Lead Time), выявлял узкие места и инициировал улучшения.",
        ]}
      />
      <Role
        title="Front-end Team Lead"
        period="август 2020 – апрель 2022"
        bullets={[
          "Увеличил команду фронтенда с 2 до 8 человек: нанимал и адаптировал новых разработчиков для роста компании.",
          "Наставлял младших разработчиков — трое получили повышение под моим руководством.",
          "Руководил созданием аналитической платформы для финтеха; стейкхолдеры получили данные в реальном времени.",
          "Запустил команду мобильной разработки, расширив спектр услуг компании.",
        ]}
      />
      <Role
        title="Front-end Developer"
        period="сентябрь 2019 – август 2020"
        bullets={[
          "Разрабатывал и поддерживал агрегаторы, информационные и e-commerce платформы.",
          "Получил повышение с Middle до Senior менее чем за год за отличные результаты и инициативу.",
        ]}
      />

      <hr />

      <Company name="Studio T" location="Томск, Россия" />
      <Role
        title="Front-end Developer"
        period="май 2019 – август 2019"
        bullets={[
          "Разработал корпоративный сайт с интерактивными анимациями на основе теории графов.",
        ]}
      />

      <hr />

      <Company name="Attrax.Digital" location="Томск, Россия" />
      <Role
        title="Front-end Developer"
        period="июль 2018 – май 2019"
        bullets={[
          "Разрабатывал крипто-продукты для финтеха и iGaming, руководил небольшой командой, чтобы укладываться в сроки и бюджет.",
        ]}
      />

      <hr />

      <Company name="Freelance, self-employed" />
      <Role
        title="Full-stack Developer"
        period="ноябрь 2014 – июнь 2018"
        bullets={[
          "Создавал и поддерживал сайты для локального бизнеса, помогал с техническими вопросами.",
        ]}
      />

      <hr />

      <NoPrint>
        <h2>Проекты</h2>
        <p>
          <strong>
            <a href="https://cv.7t33n.xyz">cv.7t33n.xyz</a> (2025):
          </strong>
          <br />
          Создал платформу для резюме на TypeScript и markdown-it, развернул на
          Cloudflare Pages.
        </p>
        <hr />
      </NoPrint>

      <h2>Образование</h2>
      <p>
        <strong>Томский колледж информационных технологий</strong>
        <br />
        <em>Томск, Россия | сентябрь 2015 – июнь 2019</em>
        <br />
        <strong>Профильные дисциплины:</strong> веб-разработка, компьютерные сети,
        базы данных, программная инженерия
      </p>

      <hr />

      <h3>Языки</h3>
      <ul>
        <li>
          <strong>Русский:</strong> родной
        </li>
        <li>
          <strong>Английский:</strong> средний
        </li>
        <li>
          <strong>Сербский:</strong> начальный
        </li>
      </ul>
    </>
  );
}
