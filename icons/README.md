# Extension Icons

This directory should contain the following icon files for the Chrome extension:

## Required Icon Files

- `icon16.png` - 16x16 pixels (toolbar icon)
- `icon32.png` - 32x32 pixels (Windows)
- `icon48.png` - 48x48 pixels (extension management page)
- `icon128.png` - 128x128 pixels (Chrome Web Store)

## Creating Icons

You can create simple icons using any image editor or online tool:

1. **Simple Text Icon**: Create a square image with "G+" text
2. **GitHub Style**: Use GitHub's color scheme (#24292f for dark, #f6f8fa for light)
3. **Online Tools**: Use tools like Canva, GIMP, or Photoshop
4. **Icon Generators**: Search for "Chrome extension icon generator" online

## Temporary Solution

If you don't have icons ready, you can:

1. Comment out the "icons" section in `manifest.json`
2. Or create simple colored squares as placeholders
3. The extension will work without custom icons (Chrome will use defaults)

## Example Icon Content

For a simple placeholder, create a square image with:
- Background: #0969da (GitHub blue)
- Text: "G+" in white
- Font: Bold, centered
