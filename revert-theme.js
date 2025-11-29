const fs = require('fs');
const path = require('path');

const replacements = [
    // Revert amber/orange/brown to cyan/teal/blue
    { from: /amber-([0-9]+)/g, to: 'cyan-$1' },
    { from: /orange-([0-9]+)/g, to: 'teal-$1' },
    { from: /yellow-([0-9]+)/g, to: 'emerald-$1' },

    // Revert stone/neutral to slate
    { from: /stone-950/g, to: 'slate-950' },
    { from: /stone-900/g, to: 'slate-900' },
    { from: /stone-800/g, to: 'slate-800' },
    { from: /stone-700/g, to: 'slate-700' },
    { from: /stone-600/g, to: 'slate-600' },
    { from: /stone-500/g, to: 'slate-500' },
    { from: /stone-400/g, to: 'slate-400' },
    { from: /stone-300/g, to: 'slate-300' },
    { from: /stone-200/g, to: 'slate-200' },
    { from: /stone-100/g, to: 'slate-100' },
    { from: /stone-50/g, to: 'slate-50' },

    { from: /neutral-900/g, to: 'slate-900' },
    { from: /neutral-800/g, to: 'slate-800' },
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
        console.log(`✓ Reverted: ${path.basename(filePath)}`);
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

console.log('🔄 Reverting to vibrant cyan/teal theme...\n');
processDirectory('./client/src/app');
processDirectory('./client/src/components');
console.log('\n✅ Theme reverted to vibrant cyan/teal colors!');
