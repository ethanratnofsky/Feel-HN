# Feel HN
A simple Chromium-based browser extension that analyzes the sentiment of Hacker News comments.

## Installation
1. Run `npm install` to install the project's dependencies.
2. Run `npm run build` to build the extension.
3. Open a Chromium-based browser (Chrome, Brave, etc.).
4. Navigate to the browser's respective extension page (chrome://extensions/, brave://extensions/, etc.).
5. Enable developer mode.
6. Pack the extension by clicking "Pack extension" and selecting the extension's `dist` directory.
7. Load the extension by clicking "Load unpacked" and selecting the extension's `dist` directory.
8. The extension should now be installed and ready to use on Hacker News (news.ycombinator.com).

## Roadmap
- [ ] Add a sentiment analysis model to the extension.
- [ ] Improve the extension's UI.
- [ ] Consider comment tree structure when analyzing sentiment.
