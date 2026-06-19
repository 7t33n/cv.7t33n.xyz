# cv.7t33n.xyz

## 📄 Dmitry Kulikov's Resume and Portfolio

This repository hosts the source code for my online resume, available at [cv.7t33n.xyz](https://cv.7t33n.xyz).

It is a static site generator built with **Bun** and **TypeScript**, which renders content from TSX component files into static HTML at build time (no client-side JS shipped).

## 🚀 Tech Stack

* **Runtime & Build Tool:** [Bun](https://bun.sh/)
* **Language:** TypeScript
* **Content:** TSX components rendered via a tiny build-time JSX runtime (`build/jsx/`)
* **Dependencies:** none for rendering — zero-dependency `h()`/`renderToString`

## ⚙️ Setup and Run

Requires [Bun](https://bun.sh/docs/installation) to be installed.

### 1. Installation

```bash
git clone https://github.com/7t33n/cv.7t33n.xyz.git
cd cv.7t33n.xyz
bun install
```

### 2. Available Scripts

| Command | Description |
| :------ | :---------- |
| `bun run build` | Generates the static output into the `dist/` directory. |
| `bun run build:watch` | Runs the build process in watch mode. |
| `bun run eslint` | Checks code for errors and style issues. |
| `bun run eslint:fix` | Automatically fixes linting errors. |

## 🤝 Contribution and License

Why would you do this? I honestly don't know, but if you've spotted a typo in my last name, or noticed I'm slightly exaggerating my skills, please feel free to open a Pull Request or make a Fork.

This project is licensed under the [**MIT License**](https://opensource.org/license/MIT).

Copyright (c) 2025-present, Dmitry Kulikov

---

**Author:**
* Dmitry Kulikov
* [GitHub (@7t33n)](https://github.com/7t33n)
