const fs = require('fs');
const path = require('path');

const replacements = [
    // Text colors - dark to light
    { from: /text-slate-900/g, to: 'text-white' },
    { from: /text-slate-800/g, to: 'text-slate-100' },
    { from: /text-slate-700/g, to: 'text-slate-300' },
    { from: /text-slate-600/g, to: 'text-cyan-400' },
    { from: /text-slate-500/g, to: 'text-slate-400' },

    // Background colors - light to dark
    { from: /bg-white(?!\/)/g, to: 'bg-slate-800' },
    { from: /bg-slate-50/g, to: 'bg-slate-900' },
    { from: /bg-slate-100/g, to: 'bg-slate-800' },

    // Border colors
    { from: /border-slate-200/g, to: 'border-cyan-500\/30' },
    { from: /border-slate-300/g, to: 'border-cyan-400\/40' },

    // Hover states
    { from: /hover:bg-slate-50/g, to: 'hover:bg-slate-800' },
    { from: /hover:bg-slate-100/g, to: 'hover:bg-slate-700' },
];

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    replacements.forEach(({ from, to }) => {
        if (content.match(from)) {
            content = content.replace(from, to);
            modified = true;
        }
    });

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function processDirectory(dir) {
    const items = fs.readdirSync(dir);

    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
            processFile(fullPath);
        }
    });
}

// Process app and components directories
processDirectory('./client/src/app');
processDirectory('./client/src/components');

console.log('✅ Dark theme text fixes applied!');
