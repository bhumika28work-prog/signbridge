const fs = require('fs');
const path = require('path');

const replacements = [
    // Replace cyan/teal/blue with amber/orange/brown
    { from: /cyan-([0-9]+)/g, to: 'amber-$1' },
    { from: /teal-([0-9]+)/g, to: 'orange-$1' },
    { from: /blue-([0-9]+)/g, to: 'amber-$1' },
    { from: /emerald-([0-9]+)/g, to: 'yellow-$1' },

    // Replace slate with stone/neutral for warmer tones
    { from: /slate-950/g, to: 'stone-950' },
    { from: /slate-900/g, to: 'stone-900' },
    { from: /slate-800/g, to: 'stone-800' },
    { from: /slate-700/g, to: 'stone-700' },
    { from: /slate-600/g, to: 'stone-600' },
    { from: /slate-500/g, to: 'stone-500' },
    { from: /slate-400/g, to: 'stone-400' },
    { from: /slate-300/g, to: 'stone-300' },
    { from: /slate-200/g, to: 'stone-200' },
    { from: /slate-100/g, to: 'stone-100' },
    { from: /slate-50/g, to: 'stone-50' },
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
        console.log(`✓ Updated: ${path.basename(filePath)}`);
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

console.log('🎨 Converting to warm brown/beige theme...\n');
processDirectory('./client/src/app');
processDirectory('./client/src/components');
console.log('\n✅ Theme converted to warm brown/beige colors!');
