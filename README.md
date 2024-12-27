![Build Status](https://github.com/diegoyosiura/treeview-yba-oyra/actions/workflows/ci.yml/badge.svg)

# Yba-Oyrá

Yba-Oyrá is a versatile library designed for both Node.js and browser environments. This project provides a modular and scalable way to work with tree-like data structures and offers robust support for integration, testing, and deployment.

---

## Table of Contents

- [Features](#features)
- [Setup for Development](#setup-for-development)
- [Building the Project](#building-the-project)
- [Running Tests](#running-tests)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Support for CommonJS, ES Modules, and Vanilla JavaScript.
- Modular build system powered by TypeScript, Rollup, and Terser.
- Comprehensive testing setup using Jest.
- Easy integration with both Node.js and browser environments.

---

## Setup for Development

### Prerequisites

Ensure you have the following installed:

- **Node.js** (>= 16.x)
- **npm** (>= 8.x)

### Steps

1. Clone the repository:
   ```bash
   git clone git@github.com:diegoyosiura/treeview-yba-oyra.git
   cd treeview-yba-oyra
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Verify the setup:
   ```bash
   npm test
   ```

---

## Building the Project

### Commands

The project provides multiple build scripts:

- Build CommonJS:
  ```bash
  npm run build:commonjs
  ```

- Build ES Modules:
  ```bash
  npm run build:esm
  ```

- Build Vanilla JavaScript (for browsers):
  ```bash
  npm run build:vanilla
  ```

- Build all versions:
  ```bash
  npm run build
  ```

The built files will be available in the `dist/` directory.

---

## Running Tests

This project uses **Jest** for testing. Run the following command to execute the test suite:

```bash
npm test
```

---

## Installation

You can install the library via npm:

```bash
npm install yba-oyra
```

---

## Usage

### Node.js Example

```javascript
const { YbaOyra } = require('yba-oyra');

const tree = new YbaOyra({
    // Configuration options
});

console.log(tree.render());
```

### Browser Example

Include the built Vanilla JavaScript file in your HTML:

```html
<script src="dist/index.min.js"></script>
<script>
  const tree = new YbaOyra({
      // Configuration options
  });

  console.log(tree.render());
</script>
```

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.