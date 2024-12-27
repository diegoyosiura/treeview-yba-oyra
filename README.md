# Yba-Oyra

Yba-Oyra is a versatile library designed for seamless integration in both Node.js and browser environments. It provides intuitive tools to manage hierarchical data structures, enabling flexible configurations with support for optional actions and child elements.

## Project Structure

```plaintext
```

## Key Features
- Manage hierarchical data structures.
- Flexible configuration with optional child nodes and actions.
- Supports both Node.js and browser environments.

## Installation

```bash
npm install yba-oyra
```

## Usage

### Node.js
```javascript
const { YbaOyra } = require('yba-oyra');
const tree = new YbaOyra();
tree.addBranch('Finance', { budget: 5000 });
console.log(tree.listBranches());
```

### Browser
```html
<script src="dist/index.min.js"></script>
<script>
  const tree = new YbaOyra();
  tree.addBranch('Finance', { budget: 5000 });
  console.log(tree.listBranches());
</script>
```

## License

This project is licensed under the MIT License.