const fs = require('fs');
let content = fs.readFileSync('/Users/marquis/.gemini/antigravity-ide/brain/4d85b2ea-79a3-4209-a03f-1a8c1b03e72d/task.md', 'utf8');
content = content.replace('- [ ] Apply `.inv-*` styling to `index.vue`', '- [x] Apply `.inv-*` styling to `index.vue`');
content = content.replace('- [ ] Apply `.inv-*` styling to `orders.vue`', '- [x] Apply `.inv-*` styling to `orders.vue`');
fs.writeFileSync('/Users/marquis/.gemini/antigravity-ide/brain/4d85b2ea-79a3-4209-a03f-1a8c1b03e72d/task.md', content);
