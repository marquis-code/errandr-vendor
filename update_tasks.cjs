const fs = require('fs');
let content = fs.readFileSync('/Users/marquis/.gemini/antigravity-ide/brain/4d85b2ea-79a3-4209-a03f-1a8c1b03e72d/task.md', 'utf8');
content = content.replace('- [ ] Create `assets/css/dashboard-ui.css`', '- [x] Create `assets/css/dashboard-ui.css`');
content = content.replace('- [ ] Import `dashboard-ui.css` globally', '- [x] Import `dashboard-ui.css` globally');
content = content.replace('- [ ] Remove duplicate styles from `inventory.vue`', '- [x] Remove duplicate styles from `inventory.vue`');
fs.writeFileSync('/Users/marquis/.gemini/antigravity-ide/brain/4d85b2ea-79a3-4209-a03f-1a8c1b03e72d/task.md', content);
