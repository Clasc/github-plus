# GitHub Plus Chrome Extension

A simple Chrome browser extension that enhances GitHub Pull Request pages by injecting a "Hello World" button underneath the comment text field.

## Features

- 🎯 **Targeted Injection**: Only activates on GitHub PR pages
- 🔄 **Dynamic Loading Support**: Works with GitHub's AJAX navigation
- 🎨 **GitHub Design Integration**: Button matches GitHub's design system
- 🌙 **Dark Mode Support**: Automatically adapts to GitHub's dark theme
- ⚡ **Lightweight**: Minimal performance impact

## Installation

### Load as Unpacked Extension (Development)

1. **Clone or download** this repository to your local machine
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable Developer Mode** by toggling the switch in the top-right corner
4. **Click "Load unpacked"** button
5. **Select the `github-plus` folder** containing the extension files
6. The extension should now appear in your extensions list

### Verify Installation

1. Navigate to any GitHub Pull Request page (e.g., `https://github.com/owner/repo/pull/123`)
2. Look for the "Hello World" button underneath the comment text field
3. The extension popup should show "Active on GitHub PR page" when clicked

## File Structure

```
github-plus/
├── manifest.json       # Extension configuration
├── content.js          # Main script that injects the button
├── styles.css          # Styling for the injected button
├── popup.html          # Extension popup interface
├── icons/              # Extension icons (placeholder)
└── README.md           # This file
```

## How It Works

1. **Content Script**: The `content.js` file runs on GitHub PR pages and searches for the comment form
2. **Button Injection**: Creates a "Hello World" button and inserts it underneath the comment textarea
3. **Dynamic Monitoring**: Uses MutationObserver to handle GitHub's dynamic content loading
4. **Styling**: Applies GitHub-matching styles from `styles.css`

## Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Permissions**: Only requires `activeTab` permission
- **Target Pages**: `https://github.com/*/*/pull/*`
- **Compatibility**: Works with GitHub's current DOM structure

## Development

### Modifying the Extension

1. Make changes to the source files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the GitHub Plus extension card
4. Reload any GitHub PR pages to see changes

### Adding Icons

Place icon files in the `icons/` directory:
- `icon16.png` (16x16px)
- `icon32.png` (32x32px)
- `icon48.png` (48x48px)
- `icon128.png` (128x128px)

## Troubleshooting

### Button Not Appearing

1. Ensure you're on a GitHub Pull Request page
2. Check the browser console for any JavaScript errors
3. Try refreshing the page
4. Verify the extension is enabled in `chrome://extensions/`

### Button Appears in Wrong Location

The extension attempts to find the comment form using multiple selectors. If GitHub changes their DOM structure, the selectors in `content.js` may need to be updated.

## License

This project is open source and available under the MIT License.
