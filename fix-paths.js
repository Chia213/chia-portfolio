const fs = require('fs');
const path = require('path');

// Read the index.html file
const indexPath = path.join(__dirname, 'dist', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// Replace public/ paths with assets/ paths
content = content.replace(/public\//g, 'assets/');

// Write the updated content back
fs.writeFileSync(indexPath, content);

console.log('✅ Fixed image paths in dist/index.html');
