# Framer Engine

**Framer Engine** is a powerful tool for importing, building, and managing Framer components within a React environment. It provides a streamlined workflow for integrating Framer designs into your development process, allowing for seamless bidirectional synchronization between code and Framer.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Scripts](#scripts)
- [Usage](#usage)
  - [Importing Framer Components](#importing-framer-components)
  - [Building and Exporting Components](#building-and-exporting-components)
  - [Deploying Components](#deploying-components)
  - [Synchronizing Import and Export](#synchronizing-import-and-export)
- [Versioning](#versioning)
- [Testing](#testing)
- [CI/CD Pipeline](#cicd-pipeline)
- [Contributing](#contributing)
- [License](#license)
- [References](#references)

---

## Features

- **Import Framer Components**: Directly import components from Framer URLs into your React codebase.
- **Export Components to Framer**: Build and deploy React components that can be consumed by Framer.
- **Automatic Conversion**: Seamlessly convert Framer components to TypeScript React components.
- **Tailwind CSS Integration**: Utilize Tailwind CSS for efficient and scalable styling.
- **Centralized Build Process**: Leverage `esbuild` for a fast and efficient build pipeline.
- **Post-Processing**: Includes TypeScript migration and code formatting for clean and maintainable code.
- **CI/CD Pipeline**: Automated workflows using GitHub Actions for continuous integration and deployment.
- **Component Previewing**: Integrated with Storybook for interactive component previews.

## Prerequisites

- **Node.js**: Version 14 or later.
- **Yarn**: Yarn package manager is recommended for managing dependencies.

## Project Structure

The project is organized as a monorepo to manage multiple packages effectively.

```
framer-engine/
├── packages/
│   ├── core/
│   │   ├── src/
│   │   └── package.json
│   ├── components/
│   │   ├── src/
│   │   └── package.json
│   └── framer-export/
│       ├── src/
│       ├── esmbuild/
│       └── package.json
├── scripts/
│   ├── build.js
│   ├── importToConfig.js
│   ├── postProcess.js
│   └── updateUnframerConfig.js
├── .github/
│   └── workflows/
│       ├── ci-cd.yml
│       ├── deploy.yml
│       └── test.yml
├── unframer.config.json
├── package.json
├── tsconfig.json
├── jest.config.js
├── .eslintrc.json
├── .prettierrc
└── README.md
```

### Key Directories and Files

- **`packages/core`**: Contains the core functionalities and utilities.
- **`packages/components`**: Houses reusable React components.
- **`packages/framer-export`**: Handles building and exporting components to Framer.
- **`scripts/`**: Collection of build and maintenance scripts.
- **`.github/workflows/`**: GitHub Actions workflows for CI/CD.
- **`unframer.config.json`**: Configuration for importing Framer components using Unframer.
- **`tsconfig.json`**: TypeScript configuration.
- **`jest.config.js`**: Jest testing configuration.
- **`.eslintrc.json`**: ESLint configuration for linting.
- **`.prettierrc`**: Prettier configuration for code formatting.

## Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/your-repo/framer-engine.git
    cd framer-engine
    ```

2. **Install Dependencies**

    Ensure you have **Yarn** installed. Then run:

    ```bash
    yarn install
    ```

## Scripts

The project utilizes various scripts to manage building, importing, exporting, deploying, and testing components.

### Overview of Available Scripts

| Script                 | Description                                                                 |
| ---------------------- | --------------------------------------------------------------------------- |
| `yarn build`           | Runs the main build process by executing `scripts/build.js`.                |
| `yarn import`          | Executes the import process to update `unframer.config.json`.              |
| `yarn postprocess`     | Runs post-processing tasks such as TypeScript migration and CSS conversion. |
| `yarn import:framer`   | Imports Framer components using Unframer.                                  |
| `yarn build:export`    | Builds the exported components by navigating to `framer-export`.           |
| `yarn deploy:export`   | Deploys the exported components to the designated hosting platform.        |
| `yarn sync`            | Synchronizes import and export processes sequentially.                     |
| `yarn lint`            | Lints the codebase using ESLint.                                           |
| `yarn format`          | Formats the codebase using Prettier.                                       |
| `yarn test`            | Runs the test suite using Jest.                                            |
| `yarn type-check`      | Performs TypeScript type checking without emitting output files.          |
| `yarn release`         | Builds, version bumps, and prepares release artifacts.                     |

### Detailed Script Explanations

#### Build

```bash
yarn build
```

- **Description**: Executes the main build script located at `scripts/build.js`. This script handles importing configurations, building core packages, and processing components.

#### Import

```bash
yarn import
```

- **Description**: Runs the `importToConfig.js` script to update the `unframer.config.json` with new component URLs.

#### Postprocess

```bash
yarn postprocess
```

- **Description**: Executes the `postProcess.js` script, which performs tasks such as migrating TypeScript configurations, renaming files, formatting code, and converting CSS to Tailwind classes.

#### Import Framer Components

```bash
yarn import:framer
```

- **Description**: Utilizes Unframer to import components from Framer based on the `unframer.config.json` configuration.

#### Build Exported Components

```bash
yarn build:export
```

- **Description**: Navigates to the `framer-export` package and runs its build process using `esmbuild`.

#### Deploy Exported Components

```bash
yarn deploy:export
```

- **Description**: Deploys the built components from `framer-export` to the designated hosting service (e.g., GitHub Pages).

#### Synchronize Import and Export

```bash
yarn sync
```

- **Description**: Sequentially runs the import, build export, and deploy export scripts to keep the codebase and Framer components in sync.

#### Lint

```bash
yarn lint
```

- **Description**: Runs ESLint to analyze the codebase for potential errors and enforce coding standards.

#### Format

```bash
yarn format
```

- **Description**: Uses Prettier to automatically format the codebase according to the defined styling rules.

#### Test

```bash
yarn test
```

- **Description**: Executes the Jest test suite to ensure code integrity and functionality.

#### Type Check

```bash
yarn type-check
```

- **Description**: Performs TypeScript type checking without generating any output files, ensuring type safety across the codebase.

#### Release

```bash
yarn release
```

- **Description**: Executes the build process, creates a release directory with versioned artifacts, and prepares the project for deployment.

## Usage

### Importing Framer Components

To import components from Framer into your codebase:

1. **Update `unframer.config.json`**

    Ensure the `unframer.config.json` file lists the components you wish to import.

    ```json:framer-engine/unframer.config.json
    {
        "$schema": "https://unframer-schema.vercel.app/schema.json",
        "outDir": "./framer-imported",
        "components": {
            "MyFramerComponent": "https://framer.com/m/MyComponent.js"
        }
    }
    ```

2. **Run the Import Script**

    ```bash
    yarn import:framer
    ```

    This will fetch the specified components and place them in the `framer-imported` directory.

### Building and Exporting Components

To build and export your React components to be used in Framer:

1. **Navigate to `framer-export` Package**

    ```bash
    cd packages/framer-export
    ```

2. **Build the Components**

    ```bash
    yarn build
    ```

    This uses `esbuild` to compile your components into ES Modules, ready for consumption by Framer.

### Deploying Components

Deploy the built components to make them accessible to Framer:

1. **Navigate to `framer-export` Package**

    ```bash
    cd packages/framer-export
    ```

2. **Deploy the Components**

    ```bash
    yarn deploy
    ```

    This script pushes the built components to the hosting platform (e.g., GitHub Pages). Ensure your deployment steps are correctly configured in the `deploy` script within `framer-export/package.json`.

### Synchronizing Import and Export

For a streamlined process that handles importing, building, and deploying in one command:

```bash
yarn sync
```

This will:

1. Import the latest components from Framer.
2. Build the exported components.
3. Deploy the built components to the hosting platform.

## Versioning

Versioning is managed through `Yarn` and Git tags. To release a new version:

1. **Run the Release Script**

    ```bash
    yarn release
    ```

    This performs the following:

    - Builds the exported components.
    - Creates a `release` directory with versioned artifacts.
    - Copies the release files to the GitHub Pages branch or your chosen deployment branch.

2. **Git Tagging**

    The `deploy` script within `framer-export/package.json` handles version bumping and Git tagging:

    ```json:framer-engine/framer-export/package.json
    "scripts": {
      "deploy": "yarn version && git push --tags && git push",
      ...
    }
    ```

    Ensure that your Git repository permissions allow pushing tags and commits to remote branches.

## Testing

Ensure your components are robust and error-free by writing and running tests.

1. **Run the Test Suite**

    ```bash
    yarn test
    ```

2. **Configure Jest**

    Ensure your `jest.config.js` is properly set up to handle TypeScript and React:

    ```javascript:jest.config.js
    module.exports = {
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
      testPathIgnorePatterns: ['/node_modules/', '/dist/'],
      setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    };
    ```

3. **Write Unit Tests**

    Example test for the `MyComponent`:

    ```typescript:packages/framer-export/src/components/__tests__/MyComponent.test.tsx
    import { MyComponent } from "../MyComponent";
    import * as React from "react";
    import { render } from "@testing-library/react";

    test("renders the correct title", () => {
      const { getByText } = render(<MyComponent title="Test Title" />);
      expect(getByText("Test Title")).toBeInTheDocument();
    });
    ```

## CI/CD Pipeline

Automate your build, test, and deployment processes using GitHub Actions.

### CI/CD Workflow

The `ci-cd.yml` file orchestrates the continuous integration and deployment processes.

```yaml:framer-engine/.github/workflows/ci-cd.yml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14.x'
      - name: Cache node modules
        uses: actions/cache@v2
        with:
          path: ~/.yarn/cache
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-
      - run: yarn install
      - run: yarn lint
      - run: yarn build
      - run: yarn test

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14.x'
      - run: yarn install
      - run: yarn build
      - name: Deploy
        # Add your deployment steps here, e.g., deploying to GitHub Pages or another hosting service
```

### Deployment Workflow

The `deploy.yml` handles the deployment process to your hosting platform.

```yaml:framer-engine/.github/workflows/deploy.yml
name: Deploy

on:
  push:
    tags:
      - 'v*.*.*'

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          fetch-depth: 0 # All commits, to access tags
          ref: main
          path: main
      - name: Checkout Pages
        uses: actions/checkout@v2
        with:
          ref: pages
          path: pages
      - name: Generate Pages
        run: |
          cd main
          yarn
          yarn run build
          yarn run release
          cp -rf release/* $GITHUB_WORKSPACE/pages/
      - name: Commit & Push
        run: |
          cd pages
          git config --global user.name 'deploy'
          git config --global user.email 'deploy@users.noreply.github.com'
          git add .
          git commit -m "Updated"
          git push --force
```

## Contributing

Contributions are welcome! Follow these steps to contribute to **Framer Engine**:

1. **Fork the Repository**

    Click the "Fork" button on the repository's GitHub page to create your own copy.

2. **Clone Your Fork**

    ```bash
    git clone https://github.com/your-username/framer-engine.git
    cd framer-engine
    ```

3. **Create a Feature Branch**

    ```bash
    git checkout -b feature/your-feature-name
    ```

4. **Make Your Changes**

    Implement your feature or fix bugs as needed. Ensure adherence to functional programming principles and best practices.

5. **Run Tests**

    ```bash
    yarn test
    ```

6. **Commit Your Changes**

    ```bash
    git commit -m "Add feature: your feature description"
    ```

7. **Push to Your Fork**

    ```bash
    git push origin feature/your-feature-name
    ```

8. **Create a Pull Request**

    Navigate to the original repository and create a pull request from your fork.

## License

This project is licensed under the [MIT License](LICENSE).

## References

- [Unframer](https://github.com/remorses/unframer)
- [Framer ESM Utils](https://github.com/iKettles/framer-esm-utils)
- [Framer](https://www.framer.com/)
- [esbuild](https://esbuild.github.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Storybook](https://storybook.js.org/)

---

## Additional Recommendations

### Enhancing Functional Programming Practices

- **Higher-Order Components (HOCs)**: Consider using HOCs to abstract and reuse common logic across components.

    ```typescript:packages/components/src/hoc/withLogging.tsx
    import React from "react";

    export const withLogging = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
      return (props: P) => {
        console.log(`Rendering ${WrappedComponent.name}`);
        return <WrappedComponent {...props} />;
      };
    };
    ```

- **Immutable Data Structures**: Ensure that all data manipulations are immutable. Utilize JavaScript's spread operators or libraries like `Immutable.js` when necessary.

### Improving Security

- **Input Validation**: Validate and sanitize all incoming props and data to prevent injection attacks.

    ```typescript:packages/components/src/components/SafeComponent.tsx
    import React from "react";

    type Props = {
      userInput: string;
    };

    export const SafeComponent: React.FC<Props> = ({ userInput }) => {
      const sanitizedInput = userInput.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return <div dangerouslySetInnerHTML={{ __html: sanitizedInput }} />;
    };
    ```

- **Dependency Auditing**: Regularly run `yarn audit` to identify and fix known vulnerabilities in dependencies.

    ```bash
    yarn audit
    ```

### Optimizing Build Performance

- **Caching with esbuild**: Leverage esbuild’s caching features to speed up incremental builds.

- **Parallelization**: Where possible, parallelize build steps to reduce total build time.

### Enhancing Code Quality

- **Strict ESLint Rules**: Implement stricter ESLint rules to enforce better coding standards.

    ```json:.eslintrc.json
    {
      "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended"],
      "parser": "@typescript-eslint/parser",
      "plugins": ["react", "@typescript-eslint"],
      "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "single"],
        "react/prop-types": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        "prefer-const": ["error"],
        "no-var": ["error"],
        "eqeqeq": ["error", "always"],
        "no-console": ["warn"],
        // Add more rules as needed
      }
    }
    ```

- **Code Reviews**: Implement a thorough code review process to catch potential issues early.

## Conclusion

**Framer Engine** successfully establishes a robust workflow for managing Framer components within a React ecosystem. By adhering to functional programming principles, maintaining modularity, and enforcing best practices, the project ensures scalability, maintainability, and security. Continuous integration and deployment pipelines further enhance the development experience, enabling seamless synchronization between code and design.

By following the guidelines and leveraging the provided scripts and configurations, developers can efficiently import, modify, and export Framer components, fostering a productive and harmonious development environment.

---

**Note**: Always ensure that your deployment secrets and sensitive information are securely managed, especially when configuring CI/CD pipelines.