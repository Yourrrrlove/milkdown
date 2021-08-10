export default"# Getting Started\n\n## Overview\n\nMilkdown is a lightweight but powerful WYSIWYG markdown editor. It's made up by two parts:\n\n-   A tiny core which provide markdown parser, serializer and kinds of plugin loader.\n-   Lots of plugins provide syntax, commands and components.\n\nWith this pattern you can enable or disable any custom syntax you like, such as table, latex and slash commands. You can even create your own plugin to support your awesome idea.\n\n> :baby_bottle: Fun fact: The Milkdown documentation is rendered by milkdown.\n\n---\n\n## Features\n\n-   [x] 📝 **WYSIWYG Markdown** - Write markdown in an elegant way\n-   [x] 🎨 **Themable** - Theme can be shared and used with npm packages\n-   [x] 🎮 **Hackable** - Support your awesome idea by plugin\n-   [x] 🦾 **Reliable** - Built on top of [prosemirror](https://prosemirror.net/) and [remark](https://github.com/remarkjs/remark)\n-   [x] ⚡️ **Slash & Tooltip** - Write fast for everyone, driven by plugin\n-   [x] 🧮 **Math** - LaTeX math equations support, driven by plugin\n-   [x] 📊 **Table** - Table support with fluent ui, driven by plugin\n-   [x] 🍻 **Collaborate** - Shared editing support with [yjs](https://docs.yjs.dev/), driven by plugin\n-   [x] 💾 **Clipboard** - Support copy and paste markdown, driven by plugin\n-   [x] :+1: **Emoji** - Support emoji shortcut and picker, driven by plugin\n\n## Tech Stack\n\nMilkdown is built on top of these tools:\n\n-   [Prosemirror](https://prosemirror.net/) and it's community - A toolkit for building rich-text editors on the web\n-   [Remark](https://github.com/remarkjs/remark) and it's community - Markdown parser done right\n-   [Postcss](https://postcss.org/) - Powerful css tool to build theme\n-   [TypeScript](https://www.typescriptlang.org/) - Developed by typescript\n-   [Prism](https://prismjs.com/) - Code snippets support\n-   [Katex](https://katex.org/) - LaTex math rendering\n\n---\n\n## First editor\n\nWe have some pieces for you to create a very minimal editor:\n\n> **We use [material icon](https://fonts.google.com/icons) and [Roboto Font](https://fonts.google.com/specimen/Roboto) in our theme**.\n> Make sure to include them for having the best experience.\n\n```typescript\nimport { Editor } from '@milkdown/core';\nimport { commonmark } from '@milkdown/preset-commonmark';\n\n// import theme and plugin style\nimport '@milkdown/theme-nord/lib/theme.css';\nimport '@milkdown/preset-commonmark/lib/style.css';\n\nnew Editor().use(commonmark).create();\n```\n\n## Taste the plugin\n\nNow let's add an **undo & redo** support for our editor:\n\n```typescript\nimport { Editor } from '@milkdown/core';\nimport { commonmark } from '@milkdown/preset-commonmark';\nimport { history } from '@milkdown/plugin-history';\n\n// import theme and plugin style\nimport '@milkdown/theme-nord/lib/theme.css';\nimport '@milkdown/preset-commonmark/lib/style.css';\n\nnew Editor().use(commonmark).use(history).create();\n```\n\n> `Mod` is `Cmd` for mac and `Ctrl` for other platforms.\n\nNow we can undo a editor by using `Mod-z` and redo it by using `Mod-y` or `Shift-Mod-Z`.\n";
