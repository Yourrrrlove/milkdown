export default"# Using Plugins\n\n## Tasting a Plugin\n\nIn fact, all features in milkdown are supported by plugin.\nThe `commonmark` we use is a plugin. Now we can try more plugins:\n\n```typescript\nimport { Editor } from '@milkdown/core';\n\nimport '@milkdown/theme-nord/lib/theme.css';\n\nimport { commonmark } from '@milkdown/preset-commonmark';\nimport '@milkdown/preset-commonmark/lib/style.css';\n\nimport { tooltip } from '@milkdown/plugin-tooltip';\nimport '@milkdown/plugin-tooltip/lib/style.css';\n\nnew Editor().use(commonmark).use(tooltip).create();\n```\n\n---\n\n## Finding Plugins\n\n### Official Plugins\n\nMilkdown provides the following official plugins:\n\n-   [@milkdown/preset-commonmark](https://www.npmjs.com/package/@milkdown/preset-commonmark)\n\n    Add [commonmark](https://commonmark.org/) syntax support.\n\n-   [@milkdown/preset-gfm](https://www.npmjs.com/package/@milkdown/preset-gfm)\n\n    Add [gfm](https://github.github.com/gfm/) syntax support.\n\n-   [@milkdown/plugin-history](https://www.npmjs.com/package/@milkdown/plugin-history)\n\n    Add undo & redo support.\n\n-   [@milkdown/plugin-clipboard](https://www.npmjs.com/package/@milkdown/plugin-clipboard)\n\n    Add markdown copy & paste support.\n\n-   [@milkdown/plugin-cursor](https://www.npmjs.com/package/@milkdown/plugin-cursor)\n\n    Add drop & gap cursor.\n\n-   [@milkdown/plugin-listener](https://www.npmjs.com/package/@milkdown/plugin-listener)\n\n    Add listener support.\n\n-   [@milkdown/plugin-collaborative](https://www.npmjs.com/package/@milkdown/plugin-collaborative)\n\n    Add collaborative editing support.\n\n-   [@milkdown/plugin-table](https://www.npmjs.com/package/@milkdown/plugin-table)\n\n    Add table syntax support.\n\n-   [@milkdown/plugin-prism](https://www.npmjs.com/package/@milkdown/plugin-prism)\n\n    Add [prism](https://prismjs.com/) support for code block highlight.\n\n-   [@milkdown/plugin-math](https://www.npmjs.com/package/@milkdown/plugin-math)\n\n    Add [LaTeX](https://en.wikipedia.org/wiki/LaTeX) support for math.\n\n-   [@milkdown/plugin-tooltip](https://www.npmjs.com/package/@milkdown/plugin-tooltip)\n\n    Add selected tooltip for text.\n\n-   [@milkdown/plugin-slash](https://www.npmjs.com/package/@milkdown/plugin-slash)\n\n    Add slash commands support.\n\n-   [@milkdown/plugin-emoji](https://www.npmjs.com/package/@milkdown/plugin-emoji)\n\n    Add emoji support.\n\n### Community plugins\n\nCheck out [awesome-milkdown](https://github.com/Saul-Mirone/awesome-milkdown) to find community plugins - you can also submit a PR to list your plugins there.\n";
