const fs = require('fs');
const path = require('path');

const replacements = [
    // Fix white backgrounds with white text issue
    { from: /bg-white(?!\/)/g, to: 'bg-slate-800' },
    { from: /bg-gray-50/g, to: 'bg-slate-900' },
    { from: /bg-gray-100/g, to: 'bg-slate-800' },
    { from: /bg-slate-50/g, to: 'bg-slate-900' },
    { from: /bg-slate-100/g, to: 'bg-slate-800' },
    { from: /bg-slate-200/g, to: 'bg-slate-700' },

    // Fix text colors for visibility
    { from: /text-white/g, to: 'text-slate-100' },
    { from: /text-gray-900/g, to: 'text-white' },
    { from: /text-gray-800/g, to: 'text-slate-100' },
    { from: /text-gray-700/g, to: 'text-slate-300' },
    { from: /text-gray-600/g, to: 'text-slate-400' },

    // Fix borders
    { from: /border-white/g, to: 'border-cyan-500\/30' },
    { from: /border-gray-200/g, to: 'border-slate-700' },
    { from: /border-gray-300/g, to: 'border-slate-600' },

    // Fix hover states
    { from: /hover:bg-white/g, to: 'hover:bg-slate-700' },
    { from: /hover:bg-gray-50/g, to: 'hover:bg-slate-800' },
    { from: /hover:bg-gray-100/g, to: 'hover:bg-slate-700' },

    // Fix specific problematic patterns
    { from: /bg-blue-50/g, to: 'bg-slate-800' },
    { from: /bg-green-50/g, to: 'bg-slate-800' },
    { from: /bg-red-50/g, to: 'bg-slate-800' },
    { from: /bg-yellow-50/g, to: 'bg-slate-800' },
    { from: /bg-orange-50/g, to: 'bg-slate-800' },
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
        console.log(`✓ Fixed: ${path.basename(filePath)}`);
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

console.log('🔧 Fixing theme visibility issues...\n');
processDirectory('./client/src/app');
processDirectory('./client/src/components');
console.log('\n✅ Theme fixes applied! All white boxes now have dark backgrounds.');
