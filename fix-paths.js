const fs = require('fs');
const path = require('path');

// Read the index.html file
const indexPath = path.join(__dirname, 'dist', 'index.html');

if (!fs.existsSync(indexPath)) {
  console.log('❌ dist/index.html not found');
  process.exit(1);
}

let content = fs.readFileSync(indexPath, 'utf8');

// Replace public/ paths with root paths (for Vercel deployment)
content = content.replace(/public\//g, '');

// Write the updated content back
fs.writeFileSync(indexPath, content);

console.log('✅ Fixed image paths in dist/index.html');
console.log('📁 Files in dist directory:', fs.readdirSync(path.join(__dirname, 'dist')));
