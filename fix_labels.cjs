const fs = require('fs');

function replaceFile(path, replacements) {
    let content = fs.readFileSync(path, 'utf8');
    for (const [from, to] of replacements) {
        content = content.split(from).join(to);
    }
    fs.writeFileSync(path, content);
}

replaceFile('/Users/marquis/erranders/vendor/layouts/vendor.vue', [
    ['Pre-Order Hub', 'Advance Orders']
]);

replaceFile('/Users/marquis/erranders/vendor/pages/dashboard/index.vue', [
    ['Inventory Health', 'Stock Status'],
    ['Pre-Order Hub', 'Advance Orders']
]);

console.log('Fixed text labels');
