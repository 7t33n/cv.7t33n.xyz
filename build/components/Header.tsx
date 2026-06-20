export interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header class="header" role="banner">
      <div class="header__container">
        <div class="header__logo">
          <a href="/">
            <img src="./assets/logo.svg" alt={title} />
          </a>
        </div>

        <div class="header__right">
          <nav class="header__lang" aria-label="Language selector">
            <a
              class="header__lang-item"
              href="/index.html"
              aria-label="English Version"
            >
              EN
            </a>
            <a
              class="header__lang-item"
              href="/ru.html"
              aria-label="Russian Version"
            >
              RU
            </a>
          </nav>

          <div class="header__links">
            <a
              class="header__link"
              href="https://github.com/7t33n/cv.7t33n.xyz"
              aria-label="GitHub repository (opens in new tab)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                class="header__link-icon header__link-icon--github"
                src="./assets/github.svg"
                alt=""
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
